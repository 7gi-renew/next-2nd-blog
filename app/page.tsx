import { client } from '../libs/client'
import Cards, { Props } from '../components/Cards'

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
    <>
      <h1 className='mb-2 text-2xl font-bold tracking-tight md:text-3xl'>My Blog</h1>
      <p className='text-sm mt-4 block'>日常の出来事や普段の生活の中で思ったことなどを書いていきます。</p>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {dataContents.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}