'use client';
import Image from 'next/image';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
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
      await supabase.storage.from(CERTIFICATES_BUCKET_NAME).remove([selectedCertificateName]);
      onRefresh();
      setDeleteDialogOpen(false);
      setSelectedCertificateName(null);
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
              <th>Name</th>
              <th>Size</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Last Modified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cert) => (
              <tr key={cert.id}>
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
