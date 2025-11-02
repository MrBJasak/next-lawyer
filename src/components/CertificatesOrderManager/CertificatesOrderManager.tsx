'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { FaGripVertical, FaTimes } from 'react-icons/fa';
import { Certificate } from '../../utils/supabase/types';
import './styles.scss';

interface CertificatesOrderManagerProps {
  certificates: Certificate[];
  onSave: (orderedCertificates: Certificate[]) => void;
  onCancel: () => void;
}

export const CertificatesOrderManager: React.FC<CertificatesOrderManagerProps> = ({
  certificates,
  onSave,
  onCancel,
}) => {
  const [orderedCerts, setOrderedCerts] = useState<Certificate[]>(certificates);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newOrder = [...orderedCerts];
    const [draggedItem] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(dropIndex, 0, draggedItem);

    setOrderedCerts(newOrder);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleSave = () => {
    // Aktualizuj display_order w obiektach
    const orderedWithNewOrder = orderedCerts.map((cert, index) => ({
      ...cert,
      display_order: index,
    }));
    onSave(orderedWithNewOrder);
  };

  const hasChanges = JSON.stringify(orderedCerts) !== JSON.stringify(certificates);

  return (
    <div className='order-manager'>
      <div className='order-manager__header'>
        <h2 className='order-manager__title'>Zarządzaj kolejnością certyfikatów</h2>
        <p className='order-manager__description'>
          Kliknij i przeciągnij certyfikaty, aby zmienić ich kolejność. Kliknij &quot;Akceptuj&quot; aby zapisać zmiany.
        </p>
      </div>

      <div className='order-manager__list'>
        {orderedCerts.map((cert, index) => (
          <div
            key={cert.id}
            className={`order-manager__item ${draggedIndex === index ? 'dragging' : ''} ${
              dragOverIndex === index ? 'drag-over' : ''
            }`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className='order-manager__drag-handle'>
              <FaGripVertical />
            </div>
            <div className='order-manager__number'>{index + 1}</div>
            <div className='order-manager__preview'>
              <Image
                src={cert.publicUrl}
                alt={cert.name}
                width={80}
                height={80}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className='order-manager__info'>
              <div className='order-manager__name'>{cert.name}</div>
              <div className='order-manager__meta'>
                {new Date(cert.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='order-manager__footer'>
        <button className='button button--secondary' onClick={onCancel}>
          Anuluj
        </button>
        <button
          className='button button--primary'
          onClick={handleSave}
          disabled={!hasChanges}
          title={!hasChanges ? 'Brak zmian do zapisania' : ''}
        >
          Akceptuj
        </button>
      </div>
    </div>
  );
};

