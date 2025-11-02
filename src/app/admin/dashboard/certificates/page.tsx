'use client';

import { useCallback, useEffect, useState } from 'react';
import { FaPlusCircle, FaSort } from 'react-icons/fa';
import { Button } from '../../../../components/Button/Buttons';
import CertificatesTable from '../../../../components/CertifiactesTable/CertifiactesTable';
import { CertificatesOrderManager } from '../../../../components/CertificatesOrderManager/CertificatesOrderManager';
import { ImageUpload } from '../../../../components/ImageUpload/ImageUpload';
import { createClient } from '../../../../utils/supabase/client';
import { Certificate, CERTIFICATES_BUCKET_NAME } from '../../../../utils/supabase/types';
import './styles.scss';

export default function CertificatesPage() {
  const [showModal, setShowModal] = useState(false);
  const [showOrderManager, setShowOrderManager] = useState(false);
  const [files, setFiles] = useState<Certificate[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const supabase = createClient();

  const fetchFiles = useCallback(async () => {
    try {
      const { data: storageFiles, error: storageError } = await supabase.storage
        .from(CERTIFICATES_BUCKET_NAME)
        .list('');

      if (storageError) {
        console.error('Błąd przy pobieraniu plików ze storage:', storageError.message);
        return;
      }

      if (!storageFiles) {
        return;
      }

      let dbRecords: Array<{ id: string; file_name: string; display_order: number }> | null = null;
      try {
        const { data, error: dbError } = await supabase
          .from('certificates')
          .select('*')
          .order('display_order', { ascending: true });

        if (dbError) {
          console.warn(
            'Tabela certificates nie istnieje lub błąd dostępu (użycie domyślnego sortowania):',
            dbError.message,
          );
        } else {
          dbRecords = data;
        }
      } catch {
        console.warn('Nie można połączyć się z tabelą certificates (użycie domyślnego sortowania)');
      }

      const filesWithUrls = storageFiles.map((file) => {
        const dbRecord = dbRecords?.find((r) => r.file_name === file.name);
        const publicUrl = supabase.storage.from(CERTIFICATES_BUCKET_NAME).getPublicUrl(file.name).data.publicUrl;

        const displayOrder = dbRecord?.display_order ?? 9999;
        const dbId = dbRecord?.id;

        return {
          ...file,
          publicUrl,
          display_order: typeof displayOrder === 'number' ? displayOrder : 9999,
          db_id: dbId,
          metadata: {
            size: file.metadata?.size || 0,
            mimetype: file.metadata?.mimetype || 'application/octet-stream',
            contentLength: file.metadata?.contentLength || 0,
          },
        };
      });

      const sorted = filesWithUrls.sort((a, b) => {
        const orderA = typeof a.display_order === 'number' ? a.display_order : 9999;
        const orderB = typeof b.display_order === 'number' ? b.display_order : 9999;

        if (orderA !== orderB) {
          return orderA - orderB;
        }

        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return dateA - dateB;
      });

      setFiles(sorted);
    } catch (error) {
      console.error('Nieoczekiwany błąd przy pobieraniu certyfikatów:', error);
    }
  }, [supabase]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const uploadFeaturedImage = async () => {
    if (!featuredImage) return;

    const uploadedImageName = `${Date.now()}-${featuredImage.name}`;

    const { error: uploadError } = await supabase.storage
      .from(CERTIFICATES_BUCKET_NAME)
      .upload(uploadedImageName, featuredImage, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error(`Image upload failed: ${uploadError.message}`);
      return;
    }

    try {
      const { data: maxOrderData, error: maxOrderError } = await supabase
        .from('certificates')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1)
        .single();

      if (maxOrderError && maxOrderError.code !== 'PGRST116') {
        console.warn('Błąd przy pobieraniu maksymalnego display_order:', maxOrderError.message);
      }

      const newOrder = (maxOrderData?.display_order ?? -1) + 1;

      const { error: dbError } = await supabase.from('certificates').insert({
        file_name: uploadedImageName,
        display_order: newOrder,
      });

      if (dbError) {
        console.error('Błąd przy tworzeniu rekordu w bazie:', dbError.message);
      }
    } catch (error) {
      console.error('Nieoczekiwany błąd przy tworzeniu rekordu w bazie:', error);
    }

    await fetchFiles();
    setShowModal(false);
    setFeaturedImage(null);
  };

  const handleImageRemove = () => {
    setFeaturedImage(null);
  };

  const handleImageUpload = (file: File) => {
    setFeaturedImage(file);
  };

  const handleSaveOrder = async (orderedCertificates: Certificate[]) => {
    try {
      const updates: Array<Promise<void>> = [];

      for (let i = 0; i < orderedCertificates.length; i++) {
        const cert = orderedCertificates[i];
        const newOrder = i;

        if (cert.db_id) {
          const updatePromise = (async () => {
            const { error } = await supabase
              .from('certificates')
              .update({ display_order: newOrder })
              .eq('id', cert.db_id!);

            if (error) {
              console.error(`Błąd przy aktualizacji certyfikatu ${cert.name}:`, error);
            }
          })();

          updates.push(updatePromise);
        } else {
          const insertPromise = (async () => {
            const { error, data } = await supabase
              .from('certificates')
              .insert({
                file_name: cert.name,
                display_order: newOrder,
              })
              .select()
              .single();

            if (error) {
              console.error(`Błąd przy tworzeniu rekordu dla ${cert.name}:`, error);
            } else if (data) {
              cert.db_id = data.id;
            }
          })();

          updates.push(insertPromise);
        }
      }

      await Promise.all(updates);

      await fetchFiles();

      setShowOrderManager(false);
    } catch (error) {
      console.error('Błąd przy zapisywaniu kolejności:', error);
      alert('Wystąpił błąd przy zapisywaniu kolejności. Spróbuj ponownie.');
    }
  };

  const handleCancelOrder = () => {
    setShowOrderManager(false);
  };

  return (
    <div>
      <div className='dashboard__header-actions'>
        <h1 className='dashboard__title'>Certyfikaty</h1>
        <div className='dashboard__header-buttons'>
          <Button className='button' onClick={() => setShowOrderManager(true)}>
            <FaSort />
            Zmień kolejność
          </Button>
          <Button className='button' onClick={() => setShowModal(true)}>
            <FaPlusCircle />
            Dodaj nowy certifikat
          </Button>
        </div>
      </div>

      {showOrderManager ? (
        <CertificatesOrderManager certificates={files} onSave={handleSaveOrder} onCancel={handleCancelOrder} />
      ) : (
        <CertificatesTable data={files} onRefresh={fetchFiles} />
      )}

      {showModal && (
        <div className='modal'>
          <div className='modal__content'>
            <div className='modal__content-header'>
              <h3 className='modal__content-title'>Dodaj certyfikat</h3>
              <Button onClick={() => setShowModal(false)}>✕</Button>
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
