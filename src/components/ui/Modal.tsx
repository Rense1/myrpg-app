'use client';

import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="relative w-full max-w-md bg-gray-900 rounded-t-2xl p-6 pb-10 z-10 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="text-lg font-bold text-yellow-400 mb-4 text-center">{title}</h2>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
