'use client';
import '../../src/styles/styles.scss';
import { Layout } from '../components/Layout';
const DEFAULT_LOCALE = 'PL';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'LocalBusiness'],
    name: 'Adwokat Agnieszka Jasak | Kancelaria Adwokacka Radomsko',
    description:
      'Kancelaria Adwokacka w Radomsku oferująca profesjonalną pomoc prawną. Specjalizacja: sprawy cywilne, rodzinne i gospodarcze. Doświadczony adwokat.',
    url: 'https://adwokatjasak.pl',
    telephone: '+48665643337',
    email: 'adwokat.agnieszka.jasak@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Ciepła 87',
      addressLocality: 'Radomsko',
      postalCode: '97-500',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '51.0668',
      longitude: '19.4449',
    },
    openingHours: 'Mo-Fr 09:00-17:00',
    priceRange: '$$',
    serviceArea: ['województwo łódzkie', 'województwo śląskie'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Usługi Prawne',
      itemListElement: [
        'Prawo Cywilne',
        'Prawo Rodzinne',
        'Prawo Spadkowe',
        'Prawo Pracy',
        'Prawo Gospodarcze',
        'Prawo Karne',
      ],
    },
  };

  return (
    <html lang={DEFAULT_LOCALE}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover' />
        <meta
          name='description'
          content='Kancelaria Adwokacka w Radomsku oferująca profesjonalną pomoc prawną. Specjalizacja: sprawy cywilne, rodzinne i gospodarcze. Doświadczony adwokat.'
        />
        <meta
          name='keywords'
          content='adwokat radomsko, kancelaria adwokacka, pomoc prawna, prawo cywilne, prawo rodzinne, prawo gospodarcze, prawnik radomsko'
        />
        <link rel='preload' href='/logo.jpg' as='image' type='image/jpg' />
        <link rel='icon' type='image/jpg' href='/logo.jpg' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <title>Adwokat Radomsko | Kancelaria Adwokacka Agnieszka Jasak</title>
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
