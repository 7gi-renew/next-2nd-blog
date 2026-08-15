import Link from 'next/link';
import { client } from '../libs/client'
import Image from 'next/image'

interface Cat {
  id: string;
  title: string
}

interface Props {
  id: string;
  title: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  }
  category: Cat[];
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
    <>
      {dataContents.map((item) => {
        return (
          <div key={item.id}>
            <Link href={`/posts/${item.id}/`}>
              {item.thumbnail ?
                <Image src={item.thumbnail.url} width={item.thumbnail.width} height={item.thumbnail.width} alt=""></Image>
                : <Image src="/images/noimage.jpg" width="960" height="540" alt=""></Image>}
              <p>{item.title}</p>
            </Link>
            {item.category.map((cat: Cat) => {
              return (
                <Link href={`/categories/${cat.id}`} key={cat.id}>
                  <p>{cat.title}</p>
                </Link>
              )
            })}
          </div>
        )
      })}
    </>
  );
}