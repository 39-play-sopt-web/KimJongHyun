// app/layout.tsx
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <nav style={{ display: 'flex', gap: 16, padding: 16, borderBottom: '1px solid #ddd' }}>
          <Link href="/">홈</Link>
          <Link href="/about">소개</Link>
          <Link href="/blog">블로그</Link>
          <Link href="/shop/clothes/top">쇼핑</Link>
          <Link href="/login">로그인</Link>
        </nav>
        <main style={{ padding: 16 }}>{children}</main>
      </body>
    </html>
  );
}