import { client } from '../../../libs/client'
import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Badge from '@/components/Badge';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Image from 'next/image';
import parse from 'html-react-parser';
import DOMPurify from "isomorphic-dompurify";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Params {
  id: string,
  title: string,
  createdAt: string,
  category: {
    id: string,
    title: string
  }
}

interface Cat {
  id: string,
  title: string
}

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  async function getBlogDetail() {
    try {
      const data = await client.get({
        endpoint: 'blogs',
        contentId: id,
      });
      return data;
    } catch {
      notFound();
    }

  }

  const contents = await getBlogDetail();

  console.log(contents);
  const ParserSanitizedBody = (text: string) => {
    const sanitizedElem = DOMPurify.sanitize(text)

    return parse(sanitizedElem);
  }

  return (
    <>
      <div className='mx-auto w-full max-w-3xl'>
        <div className='mb-8'>
          {contents.category.length != 0 ?
            <ul className='flex gap-2'>
              {contents.category.map((cat: Cat) => {
                return (
                  <Badge key={cat.id} cat={cat}></Badge>
                )
              })}
            </ul>
            : ""}
          <p className='mt-4 mb-2 text-2xl font-bold tracking-tight md:text-3xl'>タイトル：{contents.title}</p>
          <p className='text-xs tracking-wide text-gray-500'>{dayjs.utc(contents.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}</p>
        </div>
        {contents.thumbnail ?
          <Image src={contents.thumbnail.url} width={contents.thumbnail.width} height={contents.thumbnail.height} className='' alt=""></Image>
          : ""}
        <div className='wysiwyg mb-10'>
          {ParserSanitizedBody(contents.body)}
        </div>
        <BackButton href={`/`} >トップに戻る</BackButton>
      </div>
    </>
  )
} 