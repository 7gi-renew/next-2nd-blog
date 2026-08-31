import Cards from "@/components/Cards";
import { client } from "@/libs/client";
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
          <Cards key={item.id} item={item} />
        )
      })}
    </>
  )
}
