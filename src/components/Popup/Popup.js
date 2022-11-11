import React from 'react';

export default function Popup({ isOpen, onClose, children, type }) {
  function closeOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }
    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', closeByEscape);

    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  return (
    <div
      onClick={closeOnOverlay}
      className={`popup ${isOpen ? 'popup_open' : ''}`}
    >
      <div className='popup__content'>
        <button onClick={onClose} className='popup__close' />
        {children[type]}
      </div>
    </div>
  );
}
