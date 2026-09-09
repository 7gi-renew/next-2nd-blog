import Link from 'next/link';

export default function BackButton({ href, children }: { href: string, children: React.ReactNode; }) {
  return (
    <>
      <Link href={href} className='block w-fit mx-auto bg-gray-900 hover:bg-gray-600 text-white font-bold py-3 px-12 rounded'>
        {children}
      </Link >
    </>
  )
}