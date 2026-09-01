import Link from 'next/link';

export default function Header() {
  return (
    <header className='sticky top-0 z-40 flex items-center gap-6 border-b-2 border-neutral-300 bg-white px-4 py-4 md:px-8'>
      <Link href="/" className='mr-auto text-lg font-bold tracking-tight'>My Blog</Link>
    </header>
  )
}

