import Image from 'next/image';
import { Episode } from '@/store/timelineStore';
import styles from './EpisodeCard.module.css';

interface EpisodeCardProps {
  episode: Episode;
  onPlay: (episode: Episode) => void;
}

export default function EpisodeCard({ episode, onPlay }: EpisodeCardProps) {
  const formatDate = (epochTime: string) => {
    const date = new Date(parseInt(epochTime) * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDuration = (duration: string) => {
    const seconds = parseInt(duration);
    if (isNaN(seconds)) return '';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Daily Communion': '#4F46E5',
      'General Teaching': '#059669',
      'Church Service English': '#DC2626',
      'Church Service Afrikaans': '#EA580C',
      'School of Prayer': '#7C3AED',
      'Default': '#6B7280'
    };
    return colors[category] || colors['Default'];
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {episode.Image && (
          <Image
            src={episode.Image}
            alt={episode.Title}
            width={120}
            height={120}
            className={styles.thumbnail}
            unoptimized
          />
        )}
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
          <h3 className={styles.title}>{episode.Title}</h3>
          <span 
            className={styles.category}
            style={{ backgroundColor: getCategoryColor(episode.Category) }}
          >
            {episode.Category}
          </span>
        </div>
        
        <div className={styles.metadata}>
          <span className={styles.episode}>Episode {episode.Episode}</span>
          <span className={styles.date}>{formatDate(episode.EpochTimeOfRecording)}</span>
          {episode.Duration && (
            <span className={styles.duration}>{formatDuration(episode.Duration)}</span>
          )}
        </div>
        
        {episode.Status && (
          <div className={styles.status}>
            <span className={`${styles.statusBadge} ${episode.Status.toLowerCase() === 'published' ? styles.published : styles.draft}`}>
              {episode.Status}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
