import { animated, useSpring } from '@react-spring/web';
import './styles.scss';

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ children, className = '' }) => {
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 300, friction: 20 },
    delay: 200,
  });
  return (
    <animated.h2 className={`animated-title ${className}`} style={titleAnimation}>
      {children}
    </animated.h2>
  );
};
