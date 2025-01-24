'use client';

import { Home } from '../containers/Home/Home';

const TEXTS = {
  header: {
    mainTitle: 'KANCELARIA ADWOKACKA',
    subTitle: 'AGNIESZKA JASAK',
    description: 'Zapewniam profesjonalną i rzetelną obsługę w zakresie wszystkich czynności prawnych.',
    button: 'UMÓW SIĘ',
  },
  aboutMe: {
    paragraphs: [
      'Szanowni Państwo, serdecznie witam na stronie mojej Kancelarii Adwokackiej. 7 października 2024 r. w ramach jednoosobowej działalności gospodarczej jako adwokat aktywnie wykonujący zawód, rozpoczęłam prowadzenie własnej Kancelarii Adwokackiej.',
      'Moim priorytetem jest indywidualne podejście do klienta oraz dbałość o jego interesy. Gwarantuję uważne wsłuchanie się w Państwa problemy, potrzeby i pytania. Angażując się w każdą sprawę indywidualnie, przewiduje jej ewentualny przebieg, proponując skuteczne rozwiązania.',
    ],
    services: {
      intro: 'W ramach swoich usług oferuję obsługę:',
      list: ['klientów indywidualnych', 'podmiotów gospodarczych', 'organizacji'],
    },
    lawAreas: {
      intro: 'Moja praktyka obejmuje sprawy z zakresu:',
      list: [
        'prawa cywilnego',
        'prawa rodzinnego',
        'prawa własności intelektualnej',
        'prawa pracy',
        'prawa gospodarczego',
        'prawa upadłościowego (w tym sprawy o ogłoszenie upadłości konsumenckiej)',
        'prawa administracyjnego',
        'prawa karnego',
      ],
    },
    closing:
      'Nieustannie staram się pogłębiać swoją wiedzę. Mam nadzieję, że obdarzą Państwo moją Kancelarię Adwokacką zaufaniem, powierzając swoją sprawę do prowadzenia.',
    signature: {
      text: 'Serdecznie zapraszam do współpracy,',
      name: 'Adwokat Agnieszka Jasak',
    },
  },
};

export interface HomeProps {
  data: {
    header: {
      mainTitle: string;
      subTitle: string;
      description: string;
      button: string;
    };
    aboutMe: {
      paragraphs: string[];
      services: {
        intro: string;
        list: string[];
      };
      lawAreas: {
        intro: string;
        list: string[];
      };
      closing: string;
      signature: {
        text: string;
        name: string;
      };
    };
  };
}

export default function page() {
  return <Home data={TEXTS} />;
}
