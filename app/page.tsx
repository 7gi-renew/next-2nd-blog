import Link from 'next/link';
import { client } from '../libs/client'
import Image from 'next/image'

type Props = {
  id: string;
  title: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  }
  category: {
    id: string;
    title: string;
  }
}

async function getBlogPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: 'blogs',
    queries: {
      limit: 10,
    }
  });

  return data.contents;
}

export default async function Home() {

  const dataContents = await getBlogPosts();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          {dataContents.map((item) => {
            return (
              <Link href={`/${item.id}/`} key={item.id}>
                {item.thumbnail ?
                  <Image src={item.thumbnail.url} width={item.thumbnail.width} height={item.thumbnail.width} alt=""></Image>
                  : <Image src="/images/noimage.jpg" width="960" height="540" alt=""></Image>}
                <p>{item.title}</p>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  );
}
