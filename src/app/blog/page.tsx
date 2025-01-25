'use client';

import { AnimatedTitle } from '../../components/AnimatedTitle/AnimatedTitle';
import './styles.scss';

export default function BlogPage() {
  return (
    <div className='blog-page'>
      <AnimatedTitle className='blog-page__main-title'>BLOG</AnimatedTitle>
      <div className='blog-page__no-entries'>
        <h2>Brak wpisów</h2>
        <p>Aktualnie nie ma żadnych wpisów na blogu. Zapraszamy wkrótce!</p>
      </div>
    </div>
  );
}
