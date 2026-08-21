import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mediaUrl = searchParams.get('url');
    const filename = searchParams.get('filename') || 'DownGram_media.mp4';
    const isAudio = searchParams.get('audio') === 'true' || filename.endsWith('.mp3');
    const isInline = searchParams.get('inline') === 'true';

    if (!mediaUrl) {
      return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
    }

    // Sanitize filename for header
    let safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    if (isAudio) {
      safeFilename = safeFilename.replace(/(\.mp3)+$/gi, '').replace(/\.mp4$/gi, '').replace(/\.m4a$/gi, '') + '.mp3';
    }

    const range = req.headers.get('range');
    const fetchHeaders: Record<string, string> = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      'Referer': 'https://www.instagram.com/',
      'Accept': '*/*',
    };
    if (range) {
      fetchHeaders['Range'] = range;
    }

    const res = await fetch(mediaUrl, {
      headers: fetchHeaders,
      cache: 'no-store',
    });

    if (!res.ok) {
      // Fallback: direct redirect to media URL so browser streams/downloads directly
      return NextResponse.redirect(mediaUrl, 302);
    }

    let contentType = res.headers.get('content-type') || '';
    if (isAudio) {
      contentType = 'audio/mpeg';
    } else if (!contentType || contentType === 'application/octet-stream') {
      if (mediaUrl.includes('.jpg') || filename.endsWith('.jpg') || mediaUrl.includes('.jpeg')) {
        contentType = 'image/jpeg';
      } else if (mediaUrl.includes('.webp') || filename.endsWith('.webp')) {
        contentType = 'image/webp';
      } else if (mediaUrl.includes('.png') || filename.endsWith('.png')) {
        contentType = 'image/png';
      } else {
        contentType = 'video/mp4';
      }
    }

    const contentLength = res.headers.get('content-length');
    const contentRange = res.headers.get('content-range');

    const headers: Record<string, string> = {
      'Content-Disposition': isInline ? 'inline' : `attachment; filename="${safeFilename}"`,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    };

    if (contentLength) {
      headers['Content-Length'] = contentLength;
    }
    if (contentRange) {
      headers['Content-Range'] = contentRange;
    }

    return new NextResponse(res.body as any, {
      status: res.status === 206 ? 206 : 200,
      headers,
    });
  } catch (error: any) {
    console.error('Error in /api/proxy-download, attempting direct redirect:', error);
    try {
      const { searchParams } = new URL(req.url);
      const mediaUrl = searchParams.get('url');
      if (mediaUrl) {
        return NextResponse.redirect(mediaUrl, 302);
      }
    } catch {}
    return NextResponse.json(
      { error: error.message || 'Failed to stream media file.' },
      { status: 500 }
    );
  }
}
