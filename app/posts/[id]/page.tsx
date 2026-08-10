import Link from 'next/link';
import { client } from '../../../libs/client'
import { notFound } from 'next/navigation';

type Params = {
  id: string,
  title: string,
  createdAt: string,
  category: {
    id: string,
    title: string
  }
}

type Cat = {
  id: string,
  title: string
}

export default async function Page({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  async function getBlogDetail() {
    try {
      const data = await client.get({
        endpoint: 'blogs',
        contentId: id,
      });
      return data;
    } catch {
      notFound();
    }

  }

  const contents = await getBlogDetail()

  // MEMO
  // 8/5に実装した内容の把握・復習を8/6にやること。どうして実装できたか不明瞭な部分が多いため。

  return (
    <>
      <div>
        <p>テスト：{contents.id}</p>
        <p>タイトル：{contents.title}</p>
        <p>公開日：{contents.createdAt}</p>
        <div>
          <p>カテゴリ</p>
          {contents.category.length != 0 ?
            <ul>
              {contents.category.map((cat: Cat) => {
                return (
                  <li key={cat.id}>
                    <p>{cat.title}</p>
                  </li>
                )
              })}
            </ul>
            : ""}
        </div>
        <div>
          <Link href="/">戻る</Link>
        </div>
      </div>
    </>
  )
} 