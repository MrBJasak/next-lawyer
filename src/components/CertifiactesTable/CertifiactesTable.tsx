'use client';
import Image from 'next/image';
import React from 'react';
import { FaTrashAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { createClient } from '../../utils/supabase/client';
import { Certificate, CERTIFICATES_BUCKET_NAME } from '../../utils/supabase/types';
import './styles.scss';

interface CertificatesTableProps {
  data: Certificate[];
  onRefresh: () => void;
}

const CertificatesTable = ({ data, onRefresh }: CertificatesTableProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [selectedCertificateName, setSelectedCertificateName] = React.useState<string | null>(null);
  const supabase = createClient();

  const confirmDelete = async () => {
    if (selectedCertificateName) {
      // Usuń plik ze storage
      await supabase.storage.from(CERTIFICATES_BUCKET_NAME).remove([selectedCertificateName]);

      // Spróbuj usunąć rekord z bazy danych (może nie istnieć)
      try {
        await supabase.from('certificates').delete().eq('file_name', selectedCertificateName);
      } catch (error) {
        // Ignoruj błędy - tabela może nie istnieć jeszcze
        console.warn('Nie można usunąć rekordu z bazy (tabela może nie istnieć)');
      }

      onRefresh();
      setDeleteDialogOpen(false);
      setSelectedCertificateName(null);
    }
  };

  const handleMoveUp = async (cert: Certificate) => {
    if (!cert.db_id || !cert.display_order || cert.display_order === 0) return;

    const currentOrder = cert.display_order;
    const previousCert = data.find((c) => c.display_order === currentOrder - 1);
    if (!previousCert?.db_id) return;

    try {
      // Zamień display_order między dwoma certyfikatami
      await supabase
        .from('certificates')
        .update({ display_order: currentOrder - 1 })
        .eq('id', cert.db_id);

      await supabase
        .from('certificates')
        .update({ display_order: currentOrder })
        .eq('id', previousCert.db_id);

      onRefresh();
    } catch (error) {
      console.error('Błąd przy zmianie kolejności:', error);
    }
  };

  const handleMoveDown = async (cert: Certificate) => {
    if (!cert.db_id || cert.display_order === undefined) return;

    const currentOrder = cert.display_order;
    const nextCert = data.find((c) => c.display_order === currentOrder + 1);
    if (!nextCert?.db_id) return;

    try {
      // Zamień display_order między dwoma certyfikatami
      await supabase
        .from('certificates')
        .update({ display_order: currentOrder + 1 })
        .eq('id', cert.db_id);

      await supabase
        .from('certificates')
        .update({ display_order: currentOrder })
        .eq('id', nextCert.db_id);

      onRefresh();
    } catch (error) {
      console.error('Błąd przy zmianie kolejności:', error);
    }
  };

  const handleDelete = (name: string) => {
    setSelectedCertificateName(name);
    setDeleteDialogOpen(true);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const truncateFilename = (filename: string, maxLength = 20) => {
    if (!filename) return '';
    if (filename.length <= maxLength) return filename;

    // Get file extension
    const lastDotIndex = filename.lastIndexOf('.');
    const ext = lastDotIndex !== -1 ? filename.slice(lastDotIndex) : '';

    // Truncate name and add extension
    return filename.slice(0, maxLength - ext.length - 3) + '...' + ext;
  };

  return (
    <>
      <div className='table-container'>
        <table className='table'>
          <thead>
            <tr>
              <th>Kolejność</th>
              <th>Name</th>
              <th>Size</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Last Modified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cert, index) => (
              <tr key={cert.id}>
                <td data-label='Kolejność'>
                  <div className='order-controls'>
                    <button
                      className='action-button order-button'
                      onClick={() => handleMoveUp(cert)}
                      disabled={index === 0 || !cert.db_id}
                      title='Przesuń w górę'
                    >
                      <FaArrowUp />
                    </button>
                    <span className='order-number'>{cert.display_order ?? 'N/A'}</span>
                    <button
                      className='action-button order-button'
                      onClick={() => handleMoveDown(cert)}
                      disabled={index === data.length - 1 || !cert.db_id}
                      title='Przesuń w dół'
                    >
                      <FaArrowDown />
                    </button>
                  </div>
                </td>
                <td className='font-medium' data-label='Name'>
                  <div className='file-name-hover'>
                    <a href={cert.publicUrl} target='_blank' rel='noopener noreferrer' title={cert.name}>
                      {truncateFilename(cert.name, 25)}
                    </a>
                    <div className='hover-preview'>
                      <Image
                        src={cert.publicUrl}
                        alt={cert.name}
                        width={150}
                        height={150}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                </td>
                <td data-label='Size'>{formatFileSize(cert.metadata.size)}</td>
                <td data-label='Type'>{cert.metadata.mimetype}</td>
                <td data-label='Created At'>{new Date(cert.created_at).toLocaleDateString()}</td>
                <td data-label='Last Modified'>{new Date(cert.updated_at).toLocaleDateString()}</td>
                <td data-label='Actions'>
                  <div className='action-button delete-button'>
                    <FaTrashAlt onClick={() => handleDelete(cert.name)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteDialogOpen && (
        <div className='modal'>
          <div className='modal__content'>
            <div className='modal__content-header'>
              <h3 className='modal__content-title'>Czy na pewno chcesz usunąć ten certyfikat?</h3>
            </div>
            <div className='modal__content-footer'>
              <button className='button button--secondary' onClick={() => setDeleteDialogOpen(false)}>
                Anuluj
              </button>
              <button className='button button--primary' onClick={confirmDelete}>
                Usuń
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CertificatesTable;
