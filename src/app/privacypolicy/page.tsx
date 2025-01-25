'use client';

import { PrivacyPolicy } from '../../containers/PrivacyPolicy/PrivacyPolicy';
import { PrivacyPolicyData } from '../../containers/PrivacyPolicy/privacyPolicy.types';

const privacyPolicyText: PrivacyPolicyData = {
  title: 'Polityka prywatności',
  sections: [
    {
      title: 'I. Postanowienia ogólne',
      content: {
        type: 'ordered',
        items: [
          'Polityka prywatności określa, jak zbierane, przetwarzane i przechowywane są dane osobowe Użytkowników niezbędne do świadczenia usług drogą elektroniczną za pośrednictwem serwisu internetowego [adres strony] (dalej: Serwis).',
          'Serwis zbiera wyłącznie dane osobowe niezbędne do świadczenia i rozwoju usług w nim oferowanych.',
          'Dane osobowe zbierane za pośrednictwem Serwisu są przetwarzane zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych, dalej RODO) oraz ustawą o ochronie danych osobowych z dnia 10 maja 2018 r.',
        ],
      },
    },
    {
      title: 'II. Administrator danych',
      content: {
        type: 'paragraph',
        text: 'Administratorem danych osobowych zbieranych poprzez Serwis jest Agnieszka Jasak, prowadząca działalność gospodarczą pod firmą Adwokat Agnieszka Jasak Kancelaria Adwokacka, adres: ul. Ciepła 87, 97 – 500 Radomsko, NIP: 772-243-79-97, REGON: 52-362560-9, adres poczty elektronicznej: adwokat.agnieszka.jasak@gmail.com (dalej: Administrator).',
      },
    },
    {
      title: 'III. Cel zbierania danych osobowych',
      content: {
        type: 'ordered',
        items: [
          {
            text: 'Dane osobowe wykorzystywane są w celu:',
            subItems: [
              'rejestracji konta i weryfikacji tożsamości Użytkownika',
              'umożliwienia logowania do Serwisu',
              'realizacji umowy dotyczącej usług i e-usług',
              'komunikacji z Użytkownikiem (livechat, formularz kontaktowy itp.)',
              'wysyłki newslettera (po wyrażeniu zgody Użytkownika na jego otrzymywanie)',
              'prowadzenia systemu komentarzy',
              'świadczenia usług społecznościowych',
              'promocji oferty Administratora',
              'marketingu, remarketingu, afiliacji',
              'personalizacji Serwisu dla Użytkowników',
              'działań analitycznych i statystycznych',
              'windykacji należności',
              'ustalenia i dochodzenia roszczeń albo obrony przed nimi',
            ],
          },
          'Podanie danych jest dobrowolne, ale niezbędne do zawarcia umowy albo skorzystania z innych funkcjonalności Serwisu.',
        ],
      },
    },
    {
      title: 'IV. Rodzaj przetwarzanych danych osobowych',
      content: {
        type: 'paragraph',
        text: 'Administrator może przetwarzać dane osobowe Użytkownika: imię i nazwisko, data urodzenia, adres zamieszkania, adres e-mail, numer telefonu, NIP.',
      },
    },
    {
      title: 'V. Okres przetwarzania danych osobowych',
      content: {
        type: 'complex',
        intro: 'Dane osobowe Użytkowników będą przetwarzane przez okres:',
        items: [
          'gdy podstawą przetwarzania danych jest wykonanie umowy – do momentu przedawnienia roszczeń po jej wykonaniu',
          'gdy podstawą przetwarzania danych jest zgoda – do momentu jej odwołania, a po odwołaniu zgody do przedawnienia roszczeń',
        ],
        summary:
          'W obu przypadkach termin przedawnienia wynosi 6 lat, a dla roszczeń o świadczenia okresowe i roszczeń dotyczących prowadzenia działalności gospodarczej – 3 lata (jeśli przepis szczególny nie stanowi inaczej).',
      },
    },
    {
      title: 'VI. Udostępnianie danych osobowych',
      content: {
        type: 'ordered',
        items: [
          'Dane osobowe Użytkowników mogą być przekazywane: podmiotom powiązanym z Administratorem, jego podwykonawcom, podmiotom współpracującym z Administratorem np. firmom obsługującym e-płatności, firmom świadczącym usługi kurierskie/pocztowe, kancelariom prawnym.',
          'Dane osobowe Użytkowników nie będą/będą przekazywane poza teren Europejskiego Obszaru Gospodarczego (EOG).',
        ],
      },
    },
    {
      title: 'VII. Prawa Użytkowników',
      content: {
        type: 'ordered',
        items: [
          'Użytkownik Serwisu ma prawo do: dostępu do treści swoich danych osobowych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia, wniesienia sprzeciwu wobec przetwarzania, cofnięcia zgody w każdej chwili (co nie ma wpływu na zgodność z prawem przetwarzania dokonanego w oparciu o zgodę przed jej cofnięciem).',
          'Zgłoszenie o wystąpieniu przez Użytkownika z uprawnieniem wynikającym z wymienionych praw należy przesłać na adres adwokat.agnieszka.jasak@gmail.com.',
          'Administrator spełnia lub odmawia spełnienia żądania niezwłocznie – maksymalnie w ciągu miesiąca od jego otrzymania.',
          'Użytkownik ma prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych, jeśli uzna, że przetwarzanie narusza jego prawa i wolności (RODO).',
        ],
      },
    },
    {
      title: 'VIII. Pliki cookies',
      content: {
        type: 'ordered',
        items: [
          'Serwis zbiera informacje za pomocą plików cookies – sesyjnych, stałych i podmiotów zewnętrznych.',
          'Zbieranie plików cookies wspiera poprawne świadczenie usług w Serwisie i służy celom statystycznym.',
          'Użytkownik może określić zakres dostępu plików cookies do swojego urządzenia w ustawieniach przeglądarki.',
        ],
      },
    },
    {
      title: 'IX. Zautomatyzowane podejmowanie decyzji i profilowanie',
      content: {
        type: 'ordered',
        items: [
          'Dane Użytkowników nie mogą być przetwarzane w zautomatyzowany sposób tak, że na skutek tego mogłyby zapaść wobec nich jakiekolwiek decyzje.',
          'Dane Użytkowników mogą być profilowane celem dostosowania treści i personalizacji oferty po wyrażeniu przez nich zgody.',
        ],
      },
    },
    {
      title: 'X. Postanowienia końcowe',
      content: {
        type: 'ordered',
        items: [
          'Administrator ma prawo do wprowadzenia zmian w Polityce prywatności, przy czym prawa Użytkowników nie zostaną ograniczone.',
          'Informacja o wprowadzonych zmianach pojawi się w formie komunikatu dostępnego w Serwisie.',
          'W sprawach nieuregulowanych w niniejszej Polityce prywatności obowiązują przepisy RODO i przepisy prawa polskiego.',
        ],
      },
    },
  ],
};

export default function page() {
  return <PrivacyPolicy privacyPolicyData={privacyPolicyText} />;
}
