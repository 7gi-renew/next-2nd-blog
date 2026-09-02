import { client } from '@/libs/client';
import { Props } from './Cards';

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
          <li key={cat.id}>
            <div>
              <p>{cat.title}</p>
              <p>{cat.count}</p>
            </div>

          </li>
        )
      })}
    </ul>

  )
}
