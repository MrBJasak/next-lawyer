// src/pages/ServiceDetails/ServiceDetails.tsx
import { animated, useSpring, useTrail } from '@react-spring/web';
import { useParams } from 'react-router-dom';
import { AnimatedTitle } from '../../components/AnimatedTitle/AnimatedTitle';
import './styles.scss';

interface ServiceDetailsProps {
  services: {
    id: number;
    title: string;
    mainDescription: string;
    details: string[];
    icon: React.ReactNode;
  }[];
}

export const ServiceDetails: React.FC<ServiceDetailsProps> = ({ services }) => {
  const { id } = useParams<{ id: string }>();
  const service = services.find((s) => s.id === Number(id));

  const mainAnimation = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    config: { mass: 1, tension: 280, friction: 20 },
  });

  const iconAnimation = useSpring({
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1 },
    config: { mass: 1, tension: 280, friction: 20 },
    delay: 200,
  });

  const detailsTrail = useTrail(service?.details.length || 0, {
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    config: { mass: 1, tension: 280, friction: 20 },
    delay: 400,
  });

  if (!service) {
    return <div>Nie znaleziono usługi</div>;
  }

  return (
    <div className='service-details'>
      <AnimatedTitle className='service-details__title'>{service.title}</AnimatedTitle>

      <div className='service-details__container'>
        <animated.div style={iconAnimation} className='service-details__icon-wrapper'>
          <div className='service-details__icon'>{service.icon}</div>
        </animated.div>

        <animated.div style={mainAnimation} className='service-details__main-info'>
          <h2>Opis usługi</h2>
          <p className='service-details__description'>{service.mainDescription}</p>

          <h3>Zakres usługi obejmuje:</h3>
          <ul className='service-details__list'>
            {detailsTrail.map((props, index) => (
              <animated.li key={index} style={props} className='service-details__list-item'>
                {service.details[index]}
              </animated.li>
            ))}
          </ul>
        </animated.div>
      </div>
    </div>
  );
};
