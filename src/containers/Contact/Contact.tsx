'use client';

import { animated, useSpring, useTrail } from '@react-spring/web';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatedTitle } from '../../components/AnimatedTitle/AnimatedTitle';
import { Button } from '../../components/Button/Buttons';
import './styles.scss';

export const Contact = () => {
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = useSpring({
    from: {
      opacity: 0,
      y: 30,
    },
    to: {
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : 30,
    },
    config: { tension: 280, friction: 20 },
  });

  const infoItems: { label: string; value: string; isLink?: boolean }[] = [
    { label: 'Telefon:', value: '665-643-337' },
    { label: 'E-Mail:', value: 'adwokat.agnieszka.jasak@gmail.com', isLink: true },
    { label: 'Rachunek Bankowy:', value: '77 1160 2202 0000 0006 3117 0464' },
    { label: 'NIP:', value: '772 243 79 97' },
    { label: 'REGON:', value: '52 362560 9' },
  ];

  const trails = useTrail(infoItems.length, {
    from: {
      opacity: 0,
      x: -20,
    },
    to: {
      opacity: isVisible ? 1 : 0,
      x: isVisible ? 0 : -20,
    },
    config: { mass: 1, tension: 280, friction: 20 },
  });

  const formSpring = useSpring({
    from: {
      opacity: 0,
      scale: 0.9,
    },
    to: {
      opacity: isVisible ? 1 : 0,
      scale: isVisible ? 1 : 0.9,
    },
    config: { tension: 280, friction: 20 },
  });

  const topicOptions = [
    { value: 'konsultacja', label: 'Konsultacja prawna' },
    { value: 'reprezentacja', label: 'Reprezentacja w sądzie' },
    { value: 'dokumenty', label: 'Przygotowanie dokumentów' },
    { value: 'inne', label: 'Inne' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          topic: formData.get('topic'),
          message: formData.get('message'),
        }),
      });

      if (response.ok) {
        form.reset();
        setIsPrivacyAccepted(false);
        toast.success('Wiadomość została wysłana pomyślnie!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error('Wystąpił błąd podczas wysyłania wiadomości.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('Wystąpił błąd podczas wysyłania wiadomości.', {
        position: 'top-right',
        autoClose: 3000,
      });
      console.log(error, 'error');
    }
  };

  return (
    <>
      <ToastContainer />
      <animated.div
        className='contact'
        style={{
          opacity: fadeIn.opacity,
          transform: fadeIn.y.to((y) => `translateY(${y}px)`),
        }}
      >
        <AnimatedTitle>Kontakt</AnimatedTitle>
        <div className='contact__content'>
          <div className='contact__info-container'>
            <div className='contact__info'>
              {trails.map((props, index) => (
                <animated.div
                  key={index}
                  style={{
                    opacity: props.opacity,
                    transform: props.x.to((x) => `translateX(${x}px)`),
                  }}
                  className='contact__info-item'
                >
                  <span className='contact__info-label'>{infoItems[index].label}</span>
                  {infoItems[index].isLink ? (
                    <a
                      href={`mailto:${infoItems[index].value}`}
                      className='contact__info-value contact__info-value--link'
                      title='Wyślij email do adwokata'
                    >
                      {infoItems[index].value}
                    </a>
                  ) : (
                    <span className='contact__info-value'>{infoItems[index].value}</span>
                  )}
                </animated.div>
              ))}
            </div>

            <animated.div
              className='contact__map'
              style={{
                opacity: fadeIn.opacity,
                transform: fadeIn.y.to((y) => `translateY(${y}px)`),
              }}
            >
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.526634136133!2d19.422144!3d51.061827799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4fa2a3ca1477d6e3%3A0xd166f7842b9e0ca!2sAdwokat%20Agnieszka%20Jasak%20Kancelaria%20Adwokacka!5e0!3m2!1spl!2spl!4v1738455796289!5m2!1spl!2spl'
                width='600'
                height='450'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            </animated.div>
          </div>

          <animated.div
            className='contact__form-section'
            id='contact-form'
            style={{
              opacity: formSpring.opacity,
              transform: formSpring.scale.to((s) => `scale(${s})`),
            }}
          >
            <h1 className='contact__main-title'>Skontaktuj się z kancelarią</h1>
            <p className='contact__subtitle'>Chętnie pomożemy bezpiecznie załatwić Twoją sprawę - zostaw kontakt.</p>

            <form onSubmit={handleSubmit} className='contact__form'>
              <div className='contact__form-row'>
                <div className='contact__field'>
                  <input type='text' id='name' name='name' placeholder='Imię' required />
                </div>
                <div className='contact__field'>
                  <input type='tel' id='phone' name='phone' placeholder='Telefon*' required />
                </div>
              </div>
              <div className='contact__form-row'>
                <div className='contact__field'>
                  <select id='topic' name='topic' required>
                    <option value=''>-- Wybierz temat --</option>
                    {topicOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='contact__field'>
                  <input type='email' id='email' name='email' placeholder='E-mail' required />
                </div>
              </div>
              <div className='contact__field'>
                <textarea id='message' name='message' placeholder='Wiadomość' rows={6} required />
              </div>
              <div className='contact__consent'>
                <input
                  type='checkbox'
                  id='privacy'
                  required
                  checked={isPrivacyAccepted}
                  onChange={(e) => setIsPrivacyAccepted(e.target.checked)}
                />
                <label htmlFor='privacy'>
                  Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w formularzu zgodnie z Polityką
                  Prywatności
                </label>
              </div>
              <Button type='submit' className='contact__button' disabled={!isPrivacyAccepted}>
                WYŚLIJ
              </Button>
            </form>
          </animated.div>
        </div>
      </animated.div>
    </>
  );
};
