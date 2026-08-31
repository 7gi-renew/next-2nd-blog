import Link from 'next/link';

export interface Category {
  id: string;
  title: string;
}

export default function Badge({ cat }: { cat: Category }) {
  return (
    <>
      <Link href={`/categories/${cat.id}`} key={cat.id} className='self-start rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-amber-900 transition-colors hover:bg-accent hover:text-white'>
        {cat.title}
      </Link >
    </>
  )
}