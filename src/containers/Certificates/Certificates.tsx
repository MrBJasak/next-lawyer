import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatedTitle } from '../../components/AnimatedTitle/AnimatedTitle';
import { createClient } from '../../utils/supabase/client';
import './styles.scss';

const BUCKET_NAME = 'next-lawyer-certificates';

export const Certificates = () => {
  const supabase = createClient();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        // Pobierz pliki ze storage
        const { data: fileList, error: listError } = await supabase.storage.from(BUCKET_NAME).list('');

        if (listError) {
          console.error('Error listing files:', listError);
          return;
        }

        if (!fileList || fileList.length === 0) return;

        // Pobierz metadane z bazy danych (opcjonalne - może nie istnieć)
        let dbRecords: Array<{ id: string; file_name: string; display_order: number }> | null = null;
        try {
          const { data, error: dbError } = await supabase
            .from('certificates')
            .select('*')
            .order('display_order', { ascending: true });

          if (dbError) {
            // Tabela może nie istnieć jeszcze - to normalne przed migracją
            console.warn('Tabela certificates nie istnieje (użycie domyślnego sortowania)');
          } else {
            dbRecords = data;
          }
        } catch {
          // Ignoruj błędy związane z nieistniejącą tabelą
          console.warn('Nie można połączyć się z tabelą certificates (użycie domyślnego sortowania)');
        }

        // Połącz dane i przypisz display_order
        const filesWithOrder = fileList.map((file) => {
          const dbRecord = dbRecords?.find((r) => r.file_name === file.name);
          return {
            ...file,
            display_order: dbRecord?.display_order ?? 9999,
          };
        });

        // Sortuj po display_order (rosnąco), potem po created_at dla plików bez rekordu
        const sortedFileList = filesWithOrder.sort((a, b) => {
          if (a.display_order !== b.display_order) {
            return (a.display_order || 9999) - (b.display_order || 9999);
          }
          // Jeśli display_order jest takie samo, sortuj po dacie (najnowsze pierwsze)
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateB - dateA;
        });

        const urls = await Promise.all(
          sortedFileList.map(async (file) => {
            const { data: urlData, error } = await supabase.storage
              .from(BUCKET_NAME)
              .createSignedUrl(file.name, 60 * 60); // ważny 1h

            if (error) {
              console.error('Error creating signed URL:', error);
              return '';
            }

            return urlData?.signedUrl || '';
          }),
        );

        setImageUrls(urls.filter((url) => url !== ''));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchImages();
  }, [supabase]);

  return (
    <div>
      <AnimatedTitle>Certyfikaty</AnimatedTitle>
      <div className='certificates-grid'>
        {imageUrls.map((imageUrl, index) => (
          <Image key={index} src={imageUrl} alt={`Certyfikat ${index + 1}`} width={500} height={500} />
        ))}
      </div>
    </div>
  );
};
