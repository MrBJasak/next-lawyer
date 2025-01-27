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
    name: 'Kancelaria Adwokacka Agnieszka Jasak',
    description:
      'Kancelaria Prawna Agnieszka Jasak - profesjonalne usługi prawne w zakresie prawa cywilnego, rodzinnego i gospodarczego. Skuteczna pomoc prawna i doradztwo.',
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
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='Kancelaria Prawna Agnieszka Jasak - profesjonalne usługi prawne w zakresie prawa cywilnego, rodzinnego i gospodarczego. Skuteczna pomoc prawna i doradztwo.'
        />
        <link rel='preload' href='/logo.jpg' as='image' type='image/jpg' />
        <link rel='icon' type='image/jpg' href='/logo.jpg' />
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <title>Kancelaria Agnieszka Jasak</title>
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
