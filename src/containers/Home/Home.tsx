import Image from 'next/image';
import image from '../../assets/agnieszka_marynarka.png';
import { Button } from '../../components/Button/Buttons';

import './styles.scss';

import { animated, useSpring } from '@react-spring/web';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HomeProps } from '../../app/page';

const ANIMATION_CONFIG = {
  DEFAULT: {
    tension: 280,
    friction: 60,
  },
  DELAYS: {
    HEADER: 200,
    TITLE: 400,
    SUBTITLE: 600,
    DESCRIPTION: 800,
  },
  TRANSFORMS: {
    FADE_IN: {
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    HEADER: {
      from: { opacity: 0, transform: 'translateY(-50px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    SIDE_ELEMENTS: {
      from: { opacity: 0, transform: 'translateX(-50px)' },
      to: { opacity: 1, transform: 'translateX(0)' },
    },
  },
} as const;

export const Home = ({ data }: HomeProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
    if (location.hash === '#contact-form') {
      const element = document.getElementById('contact-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const fadeIn = useSpring({
    ...ANIMATION_CONFIG.TRANSFORMS.FADE_IN,
    config: ANIMATION_CONFIG.DEFAULT,
    immediate: !isVisible,
  });

  const headerAnimation = useSpring({
    ...ANIMATION_CONFIG.TRANSFORMS.HEADER,
    delay: ANIMATION_CONFIG.DELAYS.HEADER,
    config: ANIMATION_CONFIG.DEFAULT,
    immediate: !isVisible,
  });

  const titleAnimation = useSpring({
    ...ANIMATION_CONFIG.TRANSFORMS.SIDE_ELEMENTS,
    delay: ANIMATION_CONFIG.DELAYS.TITLE,
    config: ANIMATION_CONFIG.DEFAULT,
    immediate: !isVisible,
  });

  const subtitleAnimation = useSpring({
    ...ANIMATION_CONFIG.TRANSFORMS.SIDE_ELEMENTS,
    delay: ANIMATION_CONFIG.DELAYS.SUBTITLE,
    config: ANIMATION_CONFIG.DEFAULT,
    immediate: !isVisible,
  });

  const descriptionAnimation = useSpring({
    ...ANIMATION_CONFIG.TRANSFORMS.SIDE_ELEMENTS,
    delay: ANIMATION_CONFIG.DELAYS.DESCRIPTION,
    config: ANIMATION_CONFIG.DEFAULT,
    immediate: !isVisible,
  });

  return (
    <>
      <animated.div className='home_header' style={headerAnimation}>
        <div className='header_content'>
          <div className='header_titles'>
            <animated.h2 className='header_main_title' style={titleAnimation}>
              {data.header.mainTitle}
            </animated.h2>
            <animated.h3 className='header_sub_title' style={subtitleAnimation}>
              {data.header.subTitle}
            </animated.h3>
          </div>
          <animated.p className='header_description' style={descriptionAnimation}>
            {data.header.description}
          </animated.p>
          <Button className='header_button' onClick={() => router.push('/contact#contact-form')}>
            {data.header.button}
          </Button>
        </div>
      </animated.div>
      <div className='container'>
        <div className='card_wrapper'>
          <animated.div className='card' style={fadeIn}>
            <div className='card_content'>
              <div className='about_me_content'>
                {data.aboutMe.paragraphs.map((paragraph, index) => (
                  <p key={index} className='about_me_paragraph'>
                    {paragraph}
                  </p>
                ))}

                <p className='about_me_paragraph'>{data.aboutMe.services.intro}</p>
                <ul className='services_list'>
                  {data.aboutMe.services.list.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>

                <p className='about_me_paragraph'>{data.aboutMe.lawAreas.intro}</p>
                <ul className='law_areas_list'>
                  {data.aboutMe.lawAreas.list.map((area, index) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>

                <p className='about_me_paragraph'>{data.aboutMe.closing}</p>

                <p className='about_me_paragraph signature'>
                  {data.aboutMe.signature.text}
                  <br />
                  {data.aboutMe.signature.name}
                </p>
              </div>
            </div>
            <Image src={image} alt='agnieszka' className='card_image' priority />
          </animated.div>
        </div>
      </div>
    </>
  );
};
