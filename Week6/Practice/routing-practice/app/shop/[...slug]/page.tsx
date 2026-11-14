// app/shop/[...slug]/page.tsx
export default async function ShopPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <h1>🛍️ 쇼핑</h1>
      <p>경로 배열: {JSON.stringify(slug)}</p>
    </div>
  );
}