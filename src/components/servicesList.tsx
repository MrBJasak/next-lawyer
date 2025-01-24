import {
  FaBalanceScale,
  FaBriefcase,
  FaBuilding,
  FaChartLine,
  FaFileAlt,
  FaGavel,
  FaUsers,
  FaUserTie,
} from 'react-icons/fa';

export const services = [
  {
    id: 1,
    title: 'Prawo Cywilne',
    mainDescription: 'Kompleksowa obsługa w zakresie prawa cywilnego',
    details: [
      'Porady prawne dotyczące umów cywilnoprawnych',
      'Reprezentacja w sprawach dotyczących roszczeń cywilnych',
      'Prowadzenie spraw związanych z ochroną praw konsumenta',
      'Sprawy dotyczące odpowiedzialności odszkodowawczej',
    ],
    icon: <FaBalanceScale />,
  },
  {
    id: 2,
    title: 'Prawo Rodzinne',
    mainDescription: 'Wsparcie w sprawach rodzinnych i opiekuńczych',
    details: [
      'Sprawy rozwodowe i separacyjne',
      'Sprawy o alimenty i kontakty z dziećmi',
      'Podział majątku wspólnego',
      'Sprawy o ustalenie lub zaprzeczenie ojcostwa',
    ],
    icon: <FaUsers />,
  },
  {
    id: 3,
    title: 'Prawo Spadkowe',
    mainDescription: 'Profesjonalne doradztwo w sprawach spadkowych',
    details: [
      'Doradztwo przy sporządzaniu testamentów',
      'Sprawy o dział spadku i zachowek',
      'Sprawy związane z nabyciem i odrzuceniem spadku',
    ],
    icon: <FaFileAlt />,
  },
  {
    id: 4,
    title: 'Prawo Pracy',
    mainDescription: 'Kompleksowa obsługa prawna w zakresie prawa pracy',
    details: [
      'Sprawy o rozwiązanie stosunku pracy',
      'Sprawy o mobbing i dyskryminację',
      'Sporządzanie i opiniowanie umów o pracę',
      'Doradztwo w zakresie BHP',
    ],
    icon: <FaUserTie />,
  },
  {
    id: 5,
    title: 'Prawo Gospodarcze',
    mainDescription: 'Obsługa prawna przedsiębiorstw',
    details: [
      'Zakładanie i rejestrowanie spółek',
      'Sporządzanie i analiza umów handlowych',
      'Windykacja należności',
      'Sprawy upadłościowe i restrukturyzacyjne',
    ],
    icon: <FaBriefcase />,
  },
  {
    id: 6,
    title: 'Prawo Administracyjne',
    mainDescription: 'Reprezentacja przed organami administracji',
    details: [
      'Sprawy dotyczące decyzji administracyjnych',
      'Uzyskiwanie pozwoleń i licencji',
      'Postępowania egzekucyjne w administracji',
    ],
    icon: <FaBuilding />,
  },
  {
    id: 7,
    title: 'Prawo Upadłościowe',
    mainDescription: 'Wsparcie w sprawach upadłościowych',
    details: [
      'Postępowania upadłościowe dla przedsiębiorców',
      'Upadłość konsumencka',
      'Restrukturyzacja przedsiębiorstw',
    ],
    icon: <FaChartLine />,
  },
  {
    id: 8,
    title: 'Prawo Karne',
    mainDescription: 'Profesjonalna obrona w sprawach karnych',
    details: [
      'Obrona w sprawach karnych i karnych skarbowych',
      'Reprezentacja pokrzywdzonych',
      'Wnioski o warunkowe umorzenie postępowania',
    ],
    icon: <FaGavel />,
  },
];
