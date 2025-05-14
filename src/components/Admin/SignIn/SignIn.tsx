'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createClient } from '../../../utils/supabase/client';
import { Waves } from '../Waves';
import { login } from './actions';
import './styles.scss';
import { SignInCredentials } from './types';

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInCredentials>();

  const onSubmit = async (data: SignInCredentials) => {
    await login(data);
  };

  return (
    <div className='signin-container'>
      <div className='background'>
        <Waves />
      </div>
      <div className='login'>
        <h2 className='login-title'>Panel Logowania</h2>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <div className='textbox'>
            <input
              {...register('email', {
                required: 'Email jest wymagany',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Nieprawidłowy format email',
                },
              })}
              type='email'
              className='input-field'
            />
            <label className='label'>Email</label>
          </div>
          <div className='textbox'>
            <input
              {...register('password', {
                required: 'Hasło jest wymagane',
                minLength: {
                  value: 8,
                  message: 'Hasło musi mieć co najmniej 8 znaków',
                },
              })}
              type='password'
              className='input-field'
            />
            <label className='label'>Hasło</label>
          </div>
          <button type='submit' className='btn'>
            <p>Zaloguj</p>
          </button>

          {errors.email?.message && <p className='error'>{errors.email.message}</p>}
          {errors.password?.message && <p className='error'>{errors.password.message}</p>}
        </form>
      </div>
    </div>
  );
}
export const LogoutButton = () => {
  const router = useRouter();
  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  }

  return <button onClick={handleLogout}>Wyloguj</button>;
};
