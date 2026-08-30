import Link from 'next/link';
import Image from 'next/image';

export interface Cat {
  id: string;
  title: string;
}

export interface Props {
  id: string;
  title: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  category: Cat[];
}

export default function Cards({ item }: { item: Props }) {
  return (
    <div>
      <Link href={`/posts/${item.id}/`}>
        {item.thumbnail ?
          <Image src={item.thumbnail.url} width={item.thumbnail.width} height={item.thumbnail.height} alt=""></Image>
          : <Image src="/images/noimage.jpg" width="960" height="540" alt=""></Image>}
        <p>{item.title}</p>
      </Link>
      {item.category.map((cat) => (
        <Link href={`/categories/${cat.id}`} key={cat.id}>
          <p>{cat.title}</p>
        </Link>
      ))}
    </div>
  );
}
