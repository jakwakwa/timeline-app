'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import styles from '@/app/page.module.css';
import TimelineView from '@/components/TimelineView';
import CategoryFilter from '@/components/CategoryFilter';
import AudioPlayer from '@/components/AudioPlayer';
import { Episode, TimelineState } from '@/store/timelineStore';
import { useAudioPlayerStore } from '@/store/audioPlayerStore';
import { useTimelineStoreHydrated } from '@/hooks/useStore';

export default function HomeClient() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const { currentEpisode, isVisible, playEpisode, closePlayer } = useAudioPlayerStore();
  
  const selector = useCallback((state: TimelineState) => ({
    categories: state.categories,
    fetchCategories: state.fetchCategories,
    categoriesLoaded: state.categoriesLoaded,
    episodes: state.episodes,
    loading: state.loading,
    fetchTimeline: state.fetchTimeline,
  }), []);
  
  const storeData = useTimelineStoreHydrated(selector);
  
  const { categories = [], fetchCategories, categoriesLoaded = false, episodes = [], loading = false, fetchTimeline } = storeData || {};

  useEffect(() => {
    if (!categoriesLoaded && fetchCategories) {
      fetchCategories();
    }
  }, [fetchCategories, categoriesLoaded]);

  useEffect(() => {
    if (!loading && episodes.length === 0 && fetchTimeline) {
      fetchTimeline();
    }
  }, [loading, episodes.length, fetchTimeline]);

  const handleEpisodePlay = (episode: Episode) => {
    playEpisode(episode);
  };

  const handleToggleCategoryFilter = () => {
    setShowCategoryFilter(!showCategoryFilter);
    
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  const handleClearCategoryFilter = () => {
    setSelectedCategory(null);
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
         
      </header>
      {showCategoryFilter && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          isFullScreen={true}
          onClose={() => setShowCategoryFilter(false)}
        />
      )}
      <Suspense fallback={<div>Loading timeline...</div>}>
        <TimelineView 
          selectedCategory={selectedCategory} 
          onEpisodePlay={handleEpisodePlay}
          onToggleCategoryFilter={handleToggleCategoryFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          debouncedSearchTerm={debouncedSearchTerm}
          onClearCategoryFilter={handleClearCategoryFilter}
        />
      </Suspense>
      
      {isVisible && currentEpisode && (
        <AudioPlayer
          episode={currentEpisode}
          onClose={closePlayer}
        />
      )}
    </main>
  );
} 