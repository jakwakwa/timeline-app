'use client';

import { useEffect, useState } from 'react';
import { useMusicStore } from '@/store/musicStore';
import EpisodeCard from './EpisodeCard';
import { Episode } from '@/types/music';
import styles from './TimelineView.module.css';

interface TimelineViewProps {
  onEpisodePlay: (episode: Episode) => void;
}

export default function TimelineView({ onEpisodePlay }: TimelineViewProps) {
  const { timeline, isLoading, error, fetchTimeline } = useMusicStore();
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchTimeline();
  }, [fetchTimeline]);

  useEffect(() => {
    if (!timeline) return;

    let filtered = timeline.filter(episode => {
      const matchesCategory = selectedCategory === 'All' || episode.Category === selectedCategory;
      const matchesSearch = episode.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           episode.Description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.CreateDate).getTime() - new Date(a.CreateDate).getTime());
    
    setFilteredEpisodes(filtered);
  }, [timeline, selectedCategory, searchTerm]);

  // Get unique categories for filter
  const categories = timeline 
    ? ['All', ...Array.from(new Set(timeline.map(episode => episode.Category)))]
    : ['All'];

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Error loading episodes</h2>
        <p>{error}</p>
        <button onClick={fetchTimeline} className={styles.retryButton}>
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
        </div>

        <div className={styles.categoryFilter}>
          <label htmlFor="category-select" className={styles.filterLabel}>
            Category:
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.categorySelect}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.stats}>
        <span className={styles.statItem}>
          {filteredEpisodes.length} episode{filteredEpisodes.length !== 1 ? 's' : ''}
        </span>
        {selectedCategory !== 'All' && (
          <span className={styles.statItem}>
            in {selectedCategory}
          </span>
        )}
        {searchTerm && (
          <span className={styles.statItem}>
            matching "{searchTerm}"
          </span>
        )}
      </div>

      {isLoading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading episodes...</p>
        </div>
      ) : (
        <div className={styles.episodesList}>
          {filteredEpisodes.length === 0 ? (
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
        </div>
      )}
    </div>
  );
}
