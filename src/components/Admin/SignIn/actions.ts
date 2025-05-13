'use server';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SignInCredentials } from './types';

export async function login({ email, password }: SignInCredentials) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, message: error.message };
  }

  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, message: 'Nie udało się pobrać danych użytkownika.' };
  }
  redirect('/admin/dashboard');
}
