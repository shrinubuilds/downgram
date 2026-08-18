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
    const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');

    const res = await fetch(mediaUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Referer': 'https://www.instagram.com/',
        'Accept': '*/*',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      // Fallback: direct redirect to media URL so browser downloads directly
      return NextResponse.redirect(mediaUrl, 302);
    }

    let contentType = res.headers.get('content-type');
    if (!contentType || contentType === 'application/octet-stream') {
      if (isAudio) {
        contentType = 'audio/mpeg';
      } else if (mediaUrl.includes('.jpg') || filename.endsWith('.jpg') || mediaUrl.includes('.jpeg')) {
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

    const headers: Record<string, string> = {
      'Content-Disposition': isInline ? 'inline' : `attachment; filename="${safeFilename}"`,
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    };

    if (contentLength) {
      headers['Content-Length'] = contentLength;
    }

    return new NextResponse(res.body as any, {
      status: 200,
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
