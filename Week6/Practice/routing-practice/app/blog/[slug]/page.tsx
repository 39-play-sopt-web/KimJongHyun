// app/blog/[slug]/page.tsx
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Next.js 15+ 에서 params는 Promise
  return <h1>📖 글 상세: {slug}</h1>;
}