import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

import Image from 'next/image';
import Link from 'next/link';
import image from '../../../public/logo.jpg';
import './styles.scss';
export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer_container'>
        <div className='footer_grid'>
          <div className='footer_section'>
            <div className='footer_logo'>
              <Image src={image} alt='Logo' width={40} height={40} className='footer_logo_image' priority />
              <div className='footer_logo_text'>
                <div>Kancelaria Adwokacka</div>
                <div>Agnieszka Jasak</div>
              </div>
            </div>

            <p className='footer_description'>
              Profesjonalna obsługa prawna w zakresie prawa cywilnego, prawa pracy, prawa gospodarczego, prawa
              administracyjnego i prawa karnego.
            </p>

            <div className='footer_social'>
              <Link href='https://www.facebook.com/profile.php?id=61566701225521' className='footer_social_link'>
                <FaFacebook />
              </Link>
              <Link href='https://www.linkedin.com/in/agnieszka-jasak-7b5861170/' className='footer_social_link'>
                <FaLinkedin />
              </Link>
              <Link href='https://www.instagram.com/adwokat_agnieszka_jasak' className='footer_social_link'>
                <FaInstagram />
              </Link>
              <Link href='https://www.youtube.com/@agnieszkajasak' className='footer_social_link'>
                <FaYoutube />
              </Link>
            </div>
          </div>

          <div className='footer_section'>
            <h3 className='footer_heading'>Kontakt</h3>
            <div className='footer_contact'>
              <p>ul. Ciepła 87</p>
              <p>97-500 Radomsko</p>
            </div>
            <div className='footer_contact_info'>
              <p>
                <a href='tel:+665643337' className='footer_contact_link'>
                  +48 665-643-337
                </a>
              </p>
              <p>
                <a href='mailto:adwokat.agnieszka.jasak@gmail.com' className='footer_contact_link'>
                  adwokat.agnieszka.jasak@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Description Section */}
          <div className='footer_section'>
            <p className='footer_text'>
              Kancelaria świadczy kompleksową pomoc prawną zarówno na rzecz osób fizycznych, jak i osób prawnych. Obszar
              działania Kancelarii obejmuje teren całej Polski, skupiając się przede wszystkim na świadczeniu usług
              prawnych na terenie województwa łódzkiego i śląskiego.
            </p>
          </div>
        </div>

        <div className='footer_bottom'>
          <p>© 2024 Kancelaria Adwokacka Agnieszka Jasak</p>
          <Link href='/polityka-prywatnosci' className='footer_bottom_link'>
            Polityka Prywatności
          </Link>
        </div>
      </div>
    </footer>
  );
};
