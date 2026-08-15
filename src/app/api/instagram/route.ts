import { NextRequest, NextResponse } from 'next/server';
import { scrapeInstagram } from '@/lib/instagramScraper';
import { sampleInstagramData } from '@/lib/sampleData';
import { MediaType } from '@/types/instagram';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, mediaType, useSample } = body as {
      url: string;
      mediaType?: MediaType;
      useSample?: boolean;
    };

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Instagram URL or username is required.' },
        { status: 400 }
      );
    }

    // Direct sample request or demo keyword
    if (useSample || url.startsWith('demo:') || url.startsWith('sample:')) {
      const typeKey = (url.replace(/^(demo:|sample:)/, '') || mediaType || 'reel') as string;
      const sample = sampleInstagramData[typeKey] || sampleInstagramData.reel;
      return NextResponse.json(sample);
    }

    // Scrape live Instagram media
    const result = await scrapeInstagram(url, mediaType);

    // If scraping failed but user wants to preview format gracefully, or if error
    if (!result.success) {
      return NextResponse.json(result, { status: 422 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/instagram route:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal Server Error while parsing Instagram URL.',
      },
      { status: 500 }
    );
  }
}
