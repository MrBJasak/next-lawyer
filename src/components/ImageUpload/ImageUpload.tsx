'use client';

import React from 'react';

import { useRef, useState } from 'react';
import { FaImage, FaTimesCircle, FaUpload } from 'react-icons/fa';
import './styles.scss';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  onImageRemove: () => void;
  initialImage?: string;
}

export function ImageUpload({ onImageUpload, onImageRemove, initialImage }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should not exceed 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    // Pass file to parent component
    onImageUpload(file);
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageRemove();
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='image-upload'>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileInput}
        accept='image/*'
        className='image-upload__input'
      />

      {!preview ? (
        <div
          className={`image-upload__dropzone ${isDragging ? 'image-upload__dropzone--active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <div className='image-upload__placeholder'>
            <FaImage className='image-upload__icon' />
            <div className='image-upload__text'>
              <p>Drag & drop an image here</p>
              <p>or click to browse</p>
            </div>
            <div className='image-upload__button'>
              <FaUpload />
              <span>Upload Image</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='image-upload__preview'>
          <img
            src={preview || '/placeholder.svg'}
            alt='Preview'
            className='image-upload__image'
            onLoad={(e) => {
              // Adjust image display based on aspect ratio
              const img = e.target as HTMLImageElement;
              if (img.naturalWidth > img.naturalHeight * 1.5) {
                img.style.objectFit = 'contain';
              } else {
                img.style.objectFit = 'cover';
              }
            }}
          />
          <button type='button' className='image-upload__remove' onClick={removeImage}>
            <FaTimesCircle />
            <span>Remove</span>
          </button>
        </div>
      )}
    </div>
  );
}
