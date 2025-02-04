import { animated, useTrail } from '@react-spring/web';
import certificate1 from '../../assets/certificates/certyfikat1.jpeg';
import certificate2 from '../../assets/certificates/certyfikat2.jpg';
import certificate3 from '../../assets/certificates/certyfikat3.jpg';
import certificate4 from '../../assets/certificates/certyfikat4.jpg';
import certificate5 from '../../assets/certificates/certyfikat5.jpg';
import { AnimatedTitle } from '../../components/AnimatedTitle/AnimatedTitle';
import './styles.scss';

export const Certificates = () => {
  const images = [certificate2, certificate3, certificate4, certificate1, certificate5];

  const trail = useTrail(images.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 200,
    config: { tension: 300, friction: 20 },
  });

  return (
    <div>
      <AnimatedTitle>Certyfikaty</AnimatedTitle>
      <div className='certificates-grid'>
        {trail.map((props, index) => (
          <animated.img key={index} style={props} src={images[index].src} alt={`Certyfikat ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};
