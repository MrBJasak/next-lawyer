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
        const { data: fileList, error: listError } = await supabase.storage
          .from(BUCKET_NAME)
          .list('', { sortBy: { column: 'created_at', order: 'desc' } }); // możesz też użyć wbudowanego sortowania

        if (listError) {
          console.error('Error listing files:', listError);
          return;
        }

        if (!fileList || fileList.length === 0) return;

        const urls = await Promise.all(
          fileList.map(async (file) => {
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
