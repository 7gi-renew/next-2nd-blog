import Link from 'next/link';
import { client } from '../../libs/client'

export default async function page({ params }) {
  const { id } = await params;

  async function getBlogDetail() {
    const data = await client.get({
      endpoint: 'blogs',
      contentId: id,
    });

    return data;
  }

  const contents = await getBlogDetail()

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
              {contents.category.map((cat) => {
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