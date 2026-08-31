import Link from 'next/link';

export interface Category {
  id: string;
  title: string;
}

export default function Badge({ cat }: { cat: Category }) {
  return (
    <>
      <Link href={`/categories/${cat.id}`} key={cat.id}>
        <p>{cat.title}</p>
      </Link>
    </>
  )
}