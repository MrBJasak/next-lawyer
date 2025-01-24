'use client';

import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';
import './Fee.scss';

export const Fee = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  const fadeIn = useSpring({
    from: {
      opacity: 0,
      y: 20,
    },
    to: {
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : 20,
    },
    config: {
      tension: 280,
      friction: 20,
    },
    immediate: !isVisible,
  });

  return (
    <div className='fee-wrapper' style={{ opacity: 1 }}>
      <animated.div
        className='fee'
        style={{
          opacity: fadeIn.opacity,
          transform: fadeIn.y.to((y) => `translateY(${y}px)`),
        }}
      >
        <div className='fee__container'>
          <section>
            <h2 className='fee__title'>Honorarium</h2>

            <p className='fee__paragraph'>
              Honorarium w każdej sprawie ustalane jest przeze mnie indywidualnie w zależności od skomplikowania sprawy
              i nakładu pracy.
            </p>

            <p className='fee__paragraph'>Cena porady prawnej zależna jest od charakteru sprawy.</p>

            <p className='fee__paragraph'>
              Przy ustalaniu mojego wynagrodzenia kieruję się stawkami określonymi w Rozporządzeniu Ministra
              Sprawiedliwości z dnia 22 października 2015 r. w sprawie opłat za czynności adwokackie.
            </p>

            <p className='fee__paragraph'>W zależności od woli klienta stosowane przeze mnie metody rozliczenia to:</p>

            <ul className='fee__list'>
              <li>ryczałt</li>
              <li>rozliczenie godzinowe</li>
              <li>premia za sukces w pozytywnym zakończeniu sprawy</li>
            </ul>
          </section>
        </div>
      </animated.div>
    </div>
  );
};
