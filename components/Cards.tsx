import Link from 'next/link';
import Image from 'next/image';
import Badge from './Badge';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface Cat {
  id: string;
  title: string;
}

export interface Props {
  id: string;
  publishedAt: string;
  title: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  category: Cat[];
}


export default function Cards({ item }: { item: Props }) {
  return (
    <article className='group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ink/10'>
      <Link href={`/posts/${item.id}/`}>
        <div className='aspect-[16/9] w-full overflow-hidden bg-neutral-200'>
          {item.thumbnail ?
            <Image src={item.thumbnail.url} width={item.thumbnail.width} height={item.thumbnail.height} className='' alt=""></Image>
            : <Image src="/images/noimage.jpg" width="960" height="540" alt=""></Image>}
        </div>
      </Link>
      <time className='text-xs tracking-wide text-gray-500 px-[18px] pt-[18px]'>{dayjs.utc(item.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}</time>
      <div className='flex px-[18px] mt-2.5 gap-2'>
        {item.category.map((cat) => (
          <Badge key={cat.id} cat={cat} />
        ))}
      </div>
      <div className='flex px-[18px] mt-2.5 gap-2 pb-7'>
        <h2 className='line-clamp-2 text-lg font-semibold leading-snug'>{item.title}</h2>
      </div>
    </article>
  );
}
