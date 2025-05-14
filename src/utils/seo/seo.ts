export const jsonLd = {
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
