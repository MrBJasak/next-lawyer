import { ReactNode } from 'react';
import { Divider } from '../Divider/Divider';
import './CardWrapper.scss';

interface CardWrapperProps {
  title: string;
  image?: {
    src: string;
    alt: string;
  };
  children: ReactNode;
}

export const CardWrapper = ({ title, image, children }: CardWrapperProps) => (
  <div className='card_wrapper'>
    <div className='card'>
      <div className='card_content'>
        <Divider>
          <h1>{title}</h1>
        </Divider>
        <div className='content'>{children}</div>
      </div>
      {image && <img src={image.src} alt={image.alt} className='card_image' />}
    </div>
  </div>
);
