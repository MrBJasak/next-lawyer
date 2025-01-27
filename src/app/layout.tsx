'use client';
import '../../src/styles/styles.scss';
import { Layout } from '../components/Layout';
const DEFAULT_LOCALE = 'PL';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={DEFAULT_LOCALE}>
      <head>
        <link rel='icon' type='image/svg+xml' href='/logo.jpg' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Kancelaria Agnieszka Jasak</title>
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
