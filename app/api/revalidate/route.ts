import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

const TAGS_BY_ENDPOINT: Record<string, string> = {
  blogs: 'blogs',
  category: 'category',
};

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (!process.env.MICROCMS_WEBHOOK_SECRET || secret !== process.env.MICROCMS_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const api = typeof body?.api === 'string' ? body.api : undefined;
  const tag = api ? TAGS_BY_ENDPOINT[api] : undefined;

  const tagsToRevalidate = tag ? [tag] : Object.values(TAGS_BY_ENDPOINT);

  for (const t of tagsToRevalidate) {
    revalidateTag(t, { expire: 0 });
  }

  return NextResponse.json({ revalidated: true, tags: tagsToRevalidate, now: Date.now() });
}
