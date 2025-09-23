import React, { useState, useEffect } from "react";
import "./image.css";

export const Image = ({ title, largeImage, smallImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setIsAnimating(true);
    setIsImageLoaded(false);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsModalOpen(false);
      document.body.style.overflow = 'unset'; // Restore scrolling
    }, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="portfolio-item">
        <div className="hover-bg">
          <div 
            className="image-container" 
            onClick={openModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openModal()}
          >
            <div className="hover-text">
              <h4>{title}</h4>
              <i className="fa fa-search-plus"></i>
            </div>
            <img 
              src={smallImage} 
              className="portfolio-image" 
              width={400} 
              height={300}  
              alt={title} 
            />
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div 
          className={`modal-backdrop ${isAnimating ? 'fade-in' : 'fade-out'}`}
          onClick={handleBackdropClick}
        >
          <div className={`modal-content ${isAnimating ? 'slide-in' : 'slide-out'}`}>
            <div className="modal-header">
              <h3 className="modal-title">{title}</h3>
            </div>
            <div className="modal-body">
              {!isImageLoaded && (
                <div className="loading-spinner">
                  <i className="fa fa-spinner fa-spin"></i>
                  <p>Loading image...</p>
                </div>
              )}
              <img 
                src={largeImage} 
                alt={title} 
                className={`modal-image ${isImageLoaded ? 'loaded' : ''}`}
                onLoad={handleImageLoad}
                style={{ display: isImageLoaded ? 'block' : 'none' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
