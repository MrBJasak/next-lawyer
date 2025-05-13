'use client';

import { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Button } from '../../../../components/Button/Buttons';
import CertificatesTable from '../../../../components/CertifiactesTable/CertifiactesTable';
import { ImageUpload } from '../../../../components/ImageUpload/ImageUpload';
import { createClient } from '../../../../utils/supabase/client';
import { Certificate, CERTIFICATES_BUCKET_NAME } from '../../../../utils/supabase/types';
import './styles.scss';

export default function CertificatesPage() {
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState<Certificate[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const supabase = createClient();

  const fetchFiles = async () => {
    const { data, error } = await supabase.storage.from(CERTIFICATES_BUCKET_NAME).list('');

    if (!error && data) {
      const filesWithUrls = data.map((file) => ({
        ...file,
        publicUrl: supabase.storage.from(CERTIFICATES_BUCKET_NAME).getPublicUrl(file.name).data.publicUrl,
        metadata: {
          size: file.metadata?.size || 0,
          mimetype: file.metadata?.mimetype || 'application/octet-stream',
          contentLength: file.metadata?.contentLength || 0,
        },
      }));
      setFiles(filesWithUrls);
    } else {
      console.error('Błąd przy pobieraniu certyfikatów:', error?.message);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const uploadFeaturedImage = async () => {
    if (!featuredImage) return;

    const uploadedImageName = `${Date.now()}-${featuredImage.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(CERTIFICATES_BUCKET_NAME)
      .upload(uploadedImageName, featuredImage, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error(`Image upload failed: ${uploadError.message}`);
      return;
    }

    await fetchFiles(); // Refresh the table after successful upload
    setShowModal(false);
    setFeaturedImage(null);
  };

  const handleImageRemove = () => {
    setFeaturedImage(null);
  };

  const handleImageUpload = (file: File) => {
    setFeaturedImage(file);
  };

  return (
    <div>
      <div className='dashboard__header-actions'>
        <h1 className='dashboard__title'>Certyfikaty</h1>
        <Button className='button button--primary' onClick={() => setShowModal(true)}>
          <FaPlusCircle />
          Dodaj nowy certifikat
        </Button>
      </div>

      <div className='card'>
        <div className='card__header'>
          <h2 className='card__title'>Certyfikaty</h2>
          <div className='card__description'>Zarządzaj certifikatami</div>
        </div>
        <div className='card__content'>
          <CertificatesTable data={files} onRefresh={fetchFiles} />
        </div>
      </div>

      {showModal && (
        <div className='modal'>
          <div className='modal__content'>
            <div className='modal__content-header'>
              <h3 className='modal__content-title'>Dodaj certyfikat</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className='modal__content-body'>
              <label>Obraz certyfikatu</label>
              <ImageUpload onImageUpload={handleImageUpload} onImageRemove={handleImageRemove} />
              <div className='modal__actions'>
                <Button className='button button--primary' onClick={uploadFeaturedImage} disabled={!featuredImage}>
                  Zapisz
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
