import { Services } from '../../containers/Services/Services';

import { FaBalanceScale, FaBuilding, FaGavel, FaHandsHelping } from 'react-icons/fa';
import { FaRegCopyright } from 'react-icons/fa6';
import { GiFamilyTree, GiHandcuffs } from 'react-icons/gi';
import { GrDocumentLocked, GrUserWorker } from 'react-icons/gr';
import { MdOutlineBusinessCenter, MdOutlineFamilyRestroom } from 'react-icons/md';
import { SiLibreofficeimpress } from 'react-icons/si';

const services = [
  {
    id: 1,
    title: 'Porady prawne',
    mainDescription: 'Kompleksowa obsługa prawna',
    details: ['Porady prawne', 'Sporządzanie i opiniowanie umów'],
    icon: <FaBalanceScale />,
  },
  {
    id: 2,
    title: 'Prawo Cywilne',
    mainDescription: 'Kompleksowa obsługa w zakresie prawa cywilnego',
    details: [
      'Reprezentowanie w sprawach sądowych',
      'Udział w mediacjach i negocjacjach',
      'Pozwy/wnioski/odwołania/zażalenia i inne pisma procesowe',
      'Postępowania o zapłatę',
      'Odszkodowania z powodu błędów medycznych',
      'Odszkodowania z tytułu wypadków komunikacyjnych',
      'Odszkodowania z zakresu bezumownego korzystania z nieruchomości',
      'Ochrona prawa własności i posiadania',
      'Ustalenie stanu prawnego nieruchomości/zasiedzenie/służebności/zniesienie współwłasności',
      'Ochrona dóbr osobistych',
    ],
    icon: <FaGavel />,
  },
  {
    id: 3,
    title: 'Prawo Rodzinne',
    mainDescription: 'Wsparcie w sprawach rodzinnych i opiekuńczych',
    details: [
      'Rozwód/separacja',
      'Podział majątku',
      'Alimenty',
      'Ustanowienie rozdzielności majątkowej',
      'Regulacja kontaktów z dzieckiem',
      'Ustalenie lub zaprzeczenie ojcostwa',
      'Pozbawienie/ograniczenie władzy rodzicielskiej',
      'Ustanowienie rodziny zastępczej',
    ],
    icon: <MdOutlineFamilyRestroom />,
  },
  {
    id: 4,
    title: 'Prawo Spadkowe',
    mainDescription: 'Profesjonalne doradztwo w sprawach spadkowych',
    details: [
      'Stwierdzenie nabycia spadku',
      'Przyjęcie spadku',
      'Odrzucenie spadku',
      'Przyjęcie lub odrzucenie spadku przez małoletniego',
      'Dział spadku',
      'Dochodzenie zachowku',
      'Stwierdzenie nieważności testamentu',
    ],
    icon: <GiFamilyTree />,
  },
  {
    id: 5,
    title: 'Prawo Pracy i Ubezpieczeń Społecznych',
    mainDescription: 'Kompleksowa obsługa prawna w zakresie prawa pracy',
    details: [
      'Sprawy o rozwiązanie stosunku pracy',
      'Sprawy o mobbing i dyskryminację',
      'Sporządzanie i opiniowanie umów o pracę',
      'Naruszenie obowiązków pracodawcy',
      'Naruszenie praw pracownika',
      'Zmiana świadectwa pracy',
      'Doradztwo w zakresie BHP',
    ],
    icon: <GrUserWorker />,
  },
  {
    id: 6,
    title: 'Prawo Spółek',
    mainDescription: 'Obsługa prawna przedsiębiorstw',
    details: [
      'Zakładanie i rejestrowanie spółek',
      'Sporządzanie umów lub statutów (aktów założycielskich) spółek, fundacji, stowarzyszeń',
      'Połączenia lub podział spółek',
      'Składanie wniosków do sądu rejestrowego o wpis w Krajowym Rejestrze Sądowym',
      'Przekształcenie spółek i jednoosobowych',
      'Obsługa korporacyjna',
      'Przygotowywanie uchwał organów spółek prawa handlowego',
    ],
    icon: <MdOutlineBusinessCenter />,
  },
  {
    id: 7,
    title: 'Prawo Administracyjne',
    mainDescription: 'Reprezentacja przed organami administracji',
    details: [
      'Reprezentacja w postępowaniu administracyjnym',
      'Reprezentacja w postępowaniu sądowoadministracyjnym',
      'Przygotowanie opinii prawnych z zakresu prawa administracyjnego',
      'Kwestionowanie decyzji administracyjnych',
      'Składanie odwołań od decyzji administracyjnych',
      'Sporządzanie i składanie skarg na decyzje administracyjne',
      'Sporządzenie i wniesienie skargi kasacyjnej do Naczelnego Sadu Administracyjnego w Warszawie',
    ],
    icon: <FaBuilding />,
  },
  {
    id: 8,
    title: 'Prawo Upadłościowe i Restrukturyzacyjne',
    mainDescription: 'Wsparcie w sprawach upadłościowych',
    details: [
      'Postępowania upadłościowe dla przedsiębiorców',
      'Restrukturyzacja przedsiębiorstw',
      'Upadłość konsumencka',
    ],
    icon: <SiLibreofficeimpress />,
  },
  {
    id: 9,
    title: 'Ochrona Danych Osobowych',
    mainDescription: 'Kompleksowa obsługa w zakresie RODO',
    details: [
      'Audyt zgodności z RODO',
      'Opracowywanie polityk i procedur',
      'Szkolenia z zakresu RODO',
      'Reprezentacja przed organami nadzoru',
      'Opracowywanie klauzul informacyjnych',
      'Postępowanie w związku z incydentami bezpieczeństwa',
    ],
    icon: <GrDocumentLocked />,
  },
  {
    id: 10,
    title: 'Własność Intelektualna',
    mainDescription: 'Ochrona praw własności intelektualnej',
    details: [
      'Ochrona prawa autorskiego',
      'Ochrona wzorów wspólnotowych, znaków towarowych, wzorów przemysłowych, wzorów użytkowych, patentów',
      'Ochrona firmy i pozostałych niematerialnych dóbr przedsiębiorstwa',
      'Ochrona wizerunku',
      'Sporządzanie i opiniowanie umów w zakresie prawa autorskiego, praw pokrewnych i prawa własności przemysłowej',
      'Postępowania sądowe i arbitrażowe w zakresie naruszenia praw własności intelektualnej',
    ],
    icon: <FaRegCopyright />,
  },
  {
    id: 11,
    title: 'Rozwiązywanie Sporów',
    mainDescription: 'Mediacje i rozwiązywanie konfliktów',
    details: ['Mediacje pomiędzy osobami fizycznymi, osobami prawnymi'],
    icon: <FaHandsHelping />,
  },
  {
    id: 12,
    title: 'Prawo Karne',
    mainDescription: 'Profesjonalna obrona w sprawach karnych',
    details: [
      'Obrona oskarżonych i obwinionych na etapie postępowania przygotowawczego i sądowego',
      'Reprezentacja pokrzywdzonych i oskarżycieli posiłkowych',
      'Udział w przesłuchaniu, posiedzeniu aresztowym',
      'Przerwa w odbywaniu kary',
      'Dozór elektroniczny',
      'Zawieszenie wykonania kary',
      'Wyrok łączny',
    ],
    icon: <GiHandcuffs />,
  },
];

export default function Page() {
  return <Services services={services} />;
}
