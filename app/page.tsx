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
      {dataContents.map((item) => (
        <Cards key={item.id} item={item} />
      ))}
    </>
  );
}