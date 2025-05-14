import { NextResponse } from 'next/server';
import { createClient } from '../../../utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: blog, error } = await supabase.from('blog').select('*');

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    if (!blog) {
      return NextResponse.json({ message: 'Nie znaleziono żadnych postów' }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
