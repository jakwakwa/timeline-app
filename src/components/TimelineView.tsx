'use client';

import { useEffect, useState } from 'react';
import { Episode } from '@/store/timelineStore';
import EpisodeCard from './EpisodeCard';
import styles from './TimelineView.module.css';

interface TimelineViewProps {
  selectedCategory: string | null;
  onEpisodePlay: (episode: Episode) => void;
  onToggleCategoryFilter: () => void;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  debouncedSearchTerm: string;
  onClearCategoryFilter: () => void;
}

const TimelineView: React.FC<TimelineViewProps> = ({
  selectedCategory,
  onEpisodePlay,
  onToggleCategoryFilter,
  searchTerm,
  setSearchTerm,
  debouncedSearchTerm,
  onClearCategoryFilter,
}) => {
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      setError(null);
      try {
        setPage(1);
        const categoryQuery = selectedCategory ? `&category=${selectedCategory}` : '';
        const searchQuery = debouncedSearchTerm ? `&search=${debouncedSearchTerm}` : '';
        const res = await fetch(`/api/episodes?page=1&pageSize=20${categoryQuery}${searchQuery}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setFilteredEpisodes(data.episodes);
        setTotalEpisodes(data.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch episodes');
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, [selectedCategory, debouncedSearchTerm]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const categoryQuery = selectedCategory ? `&category=${selectedCategory}` : '';
      const searchQuery = debouncedSearchTerm ? `&search=${debouncedSearchTerm}` : '';
      const res = await fetch(`/api/episodes?page=${nextPage}&pageSize=20${categoryQuery}${searchQuery}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setFilteredEpisodes((prev) => [...prev, ...data.episodes]);
      setPage(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more episodes');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error loading episodes</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dr. Arthur Frost - Timeline</h1>
        <p className={styles.subtitle}>
          Teachings, sermons, and spiritual guidance
        </p>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search episodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button 
            onClick={onToggleCategoryFilter}
            className={styles.filterButton}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" fill="#eee"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.stats}>
        <span className={styles.statItem}>
          {totalEpisodes} episode{totalEpisodes !== 1 ? 's' : ''}
        </span>
        {selectedCategory && selectedCategory !== 'All' && (
          <span className={styles.statItem}>
            in {selectedCategory}
            <button onClick={onClearCategoryFilter} className={styles.clearCategoryButton}>
              &times;
            </button>
          </span>
        )}
        {debouncedSearchTerm && (
          <span className={styles.statItem}>
            matching &quot;{debouncedSearchTerm}&quot;
          </span>
        )}
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading episodes...</p>
        </div>
      ) : (
        <div className={styles.episodesList}>
          {filteredEpisodes.length === 0 && !loading ? (
            <div className={styles.noResults}>
              <h3>No episodes found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            filteredEpisodes.map((episode) => (
              <EpisodeCard
                key={episode.Id}
                episode={episode}
                onPlay={() => onEpisodePlay(episode)}
              />
            ))
          )}
          {filteredEpisodes.length < totalEpisodes && (
            <button onClick={loadMore} disabled={loading} className={styles.loadMoreButton}>
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TimelineView;
