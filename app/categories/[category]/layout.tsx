import "../../globals.css";
import { notFound } from "next/navigation";
import { client } from "@/libs/client";
import BackButton from "@/components/BackButton";

interface Category {
  category: string,
}

export default async function CategoryLayout({ params, children }: {
  children: React.ReactNode;
  params: Promise<Category>;
}) {
  const { category } = await params;

  async function getCategoryName() {
    try {
      const data = await client.get({
        endpoint: 'category',
        queries: {
          filters: `id[contains]${category}`,
        },
      });
      return data.contents;
    } catch {
      notFound();
    }
  }

  const categories = await getCategoryName();

  return (
    <>
      <h2 className="mb-2 text-xl font-bold tracking-tight md:text-2xl">{categories[0].title}の記事一覧</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {children}
      </div>
      <div className="mt-12">
        <BackButton href={`/`} >トップに戻る</BackButton>
      </div>
    </>
  );
}
