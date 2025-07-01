import Image from 'next/image';
import { Episode } from '@/store/timelineStore';
import styles from './EpisodeCard.module.css';
import { useState } from 'react';
import { getCategoryColor } from '@/utils/colors';
import { truncateTitle, formatDate } from '@/utils/formatters';


interface EpisodeCardProps {
  episode: Episode;
  onPlay: (episode: Episode) => void;
}

export default function EpisodeCard({ episode, onPlay }: EpisodeCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {episode.Image && !imageError ? (
          <Image
            src={episode.Image}
            alt={episode.Title}
            width={120}
            height={120}
            className={`${styles.thumbnail} ${imageLoading ? styles.loading : ''}`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              console.error('Failed to load image:', episode.Image);
              setImageError(true);
              setImageLoading(false);
            }}
            priority={false}
          />
        ) : (
          <div className={styles.placeholderImage}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            <span>No Image</span>
          </div>
        )}
        {imageLoading && (
          <div className={styles.imageLoader}>
            <div className={styles.spinner}></div>
          </div>
        )}
        <span className={styles.category} style={{ backgroundColor: getCategoryColor(episode.Category) }}>
            {episode.Category}
          </span>
        <button 
          className={styles.playButton}
          onClick={() => onPlay(episode)}
          aria-label={`Play ${episode.Title}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title} title={episode.Title}>{truncateTitle(episode.Title, 50)}</h3>
        </div>
        
        <div className={styles.metadata}>
          <span className={styles.date}>{formatDate(String(episode.Epoch))}</span>
        </div>
        
        {episode.Description && (
          <div className={styles.descriptionContainer}>
            <p className={`${styles.description} ${showFullDescription ? styles.expanded : ''}`}>
              {episode.Description}
            </p>
            {episode.Description.length > 150 && (
              <button 
                className={styles.showMoreButton}
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
