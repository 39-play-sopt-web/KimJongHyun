// app/blog/page.tsx
import Link from 'next/link';
import { posts } from './_lib/posts';

export default function BlogPage() {
  return (
    <div>
      <h1>📝 블로그 ( /blog )</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}