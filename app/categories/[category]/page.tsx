import { client } from "@/libs/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Cat {
  id: string,
  title: string,
}

interface Params {
  id: string,
  title: string,
  thumbnail: {
    url: string;
    height: number;
    width: number;
  },
  publishedAt: string,
  category: Cat[];
}

export default async function Page({ params }: { params: Promise<Params>; }) {
  const { category } = await params;

  async function getBlogCategoryArchive(): Promise<Params[]> {
    try {
      const data = await client.get({
        endpoint: 'blogs',
        queries: {
          filters: `category[contains]${category}`,
        },
      });
      return data.contents;
    } catch {
      notFound();
    }
  }

  const categories = await getBlogCategoryArchive();


  return (
    <>
      {categories.map((item) => {
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
  )
}
