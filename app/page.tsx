'use cache';

import { client } from '@/libs/client'

type Props = {
  id: string;
  title: string;
  thumbnail?: {
    url: string;
    height: number;
    width: number;
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
              <div key={item.id}>
                <div>{ }</div>
                <p>{item.title}</p>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  );
}
