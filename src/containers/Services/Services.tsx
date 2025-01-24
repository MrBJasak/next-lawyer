'use client';

import { animated, useTrail } from '@react-spring/web';
import { useEffect, useState } from 'react';
import { AnimatedTitle } from '../../components/AnimatedTitle/AnimatedTitle';
import './styles.scss';

interface LegalService {
  id: number;
  title: string;
  mainDescription: string;
  details: string[];
  icon: React.ReactNode;
}

interface ServicesProps {
  services: LegalService[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  const trails = useTrail(services.length, {
    from: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    to: {
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : 50,
      scale: isVisible ? 1 : 0.9,
    },
    config: {
      mass: 1,
      tension: 280,
      friction: 20,
    },
    immediate: !isVisible,
  });

  return (
    <div className='services-wrapper' style={{ opacity: 1 }}>
      <div className='services'>
        <AnimatedTitle className='services__main-title'>Oferta</AnimatedTitle>
        <h3 className='services__subtitle'>Jakimi sprawami się zajmuję?</h3>
        <div className='services__grid'>
          {trails.map((props, index) => (
            <div key={services[index].id} className='services__card'>
              <animated.div
                style={{
                  opacity: props.opacity,
                  transform: props.y.to((y) => `translate3d(0,${y}px,0) scale(${props.scale})`),
                }}
              >
                <div className='services__icon-wrapper'>
                  <div className='services__icon'>{services[index].icon}</div>
                </div>
                <div className='services__content'>
                  <h3 className='services__title'>{services[index].title}</h3>
                  <p className='services__description'>{services[index].mainDescription}</p>
                  <ul className='services__details'>
                    {services[index].details.map((detail, i) => (
                      <li key={i} className='services__detail-item'>
                        <span className='services__bullet'>•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </animated.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
