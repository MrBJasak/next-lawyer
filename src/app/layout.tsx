'use client'
import '../../src/styles/styles.scss';
import { Layout } from "../components/Layout";
const DEFAULT_LOCALE = 'PL';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body><Layout>{children}</Layout></body>
    </html>
  );
}
