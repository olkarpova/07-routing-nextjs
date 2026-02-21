// components/Modal/Modal.tsx

'use client';

import { useRouter } from 'next/navigation';
import css from "./Modal.module.css"

type Props = {
  children: React.ReactNode;
};

const Modal = ({ children }: Props) => {
  const router = useRouter();
  
  const close = () => router.back();

  return (
    <div className={css.backdrop} onClick={close}>
      <div className={css.content} onClick={e=>e.stopPropagation()}>
        {children}
              <button className={css.close } onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default Modal;


// import { createPortal } from 'react-dom';
// import css from './Modal.module.css'
// import React, { useEffect } from 'react';

// interface ModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     children: React.ReactNode;
// }

// export default function Modal({ isOpen, onClose, children }: ModalProps) {

//     const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
//         if (e.target === e.currentTarget) {
//             onClose();
//         }
//     };

//     useEffect(() => {
//         const handleKeyDown = (e: KeyboardEvent) => {
//             if (e.key === 'Escape') {
//                 onClose();
//             }
//         };
//         if (isOpen) {
//             document.addEventListener('keydown', handleKeyDown);
//             document.body.style.overflow = 'hidden';  
//         }
        
//         return () => {
//             document.removeEventListener('keydown', handleKeyDown);
//             document.body.style.overflow = '';
//         };
//     }, [isOpen, onClose]);

//     if (!isOpen) return null;

//     const modalRoot = document.getElementById('modal-root');
//     if (!modalRoot) return null;

//   return createPortal (
//       <div
//           className={css.backdrop}
//           role="dialog"
//           aria-modal="true"
//           onClick={handleBackdropClick}
//         >
          
//         <div className={css.modal}>{children}</div>
//       </div>,
//       modalRoot
//     );
// }
