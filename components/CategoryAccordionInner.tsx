import { client } from '@/libs/client';
import { Props } from './Cards';
import Link from 'next/link';

async function getCategories(): Promise<Props[]> {
  const data = await client.get({
    endpoint: 'category',
    queries: {
      limit: 10,
    }
  });

  return data.contents;
}

export default async function CategoryAccordionInner() {

  const dataContents = await getCategories();

  const categoriesWithCount = await Promise.all(
    dataContents.map(async (category) => {
      const res = await client.get({
        endpoint: 'blogs',
        queries: {
          filters: `category[contains]${category.id}`,
        },
      });

      return { ...category, count: res.totalCount }
    })
  );

  const categoriesHasEntry = await categoriesWithCount.filter((cat) => cat.count != 0)

  return (
    <ul>
      {categoriesHasEntry.map((cat) => {
        return (
          <Link href={`/categories/${cat.id}`} key={cat.id} className='flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors w-full hover:bg-red-100 hover:text-red-800'>
            <p>{cat.title}</p>
            <p>{cat.count}</p>
          </Link>
        )
      })}
    </ul>
  )
}
