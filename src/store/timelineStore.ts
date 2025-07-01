import { create } from 'zustand';

export interface Episode {
  Id: string;
  Title: string;
  Media: string;
  Description: string;
  Image: string;
  Icon: string;
  Audio: string;
  RemoteId: string;
  Status: string;
  isActive: boolean;
  inId: string;
  CreateDate: string;
  MediaName: string;
  Category: string;
  Epoch: number;
  AudioSize: string;
  Episode: string;
}

export interface AuthorInfo {
  backgroundImage: string;
  about: string;
  jsCode: string;
}

export interface TimelineState {
  episodes: Episode[];
  authorInfo: AuthorInfo | null;
  loading: boolean;
  error: string | null;
  fetchTimeline: () => Promise<void>;
  categories: string[];
  categoriesLoaded: boolean;
  fetchCategories: () => Promise<void>;
}

export const useTimelineStore = create<TimelineState>((set) => ({
  episodes: [],
  authorInfo: null,
  loading: false,
  error: null,
  categories: [],
  categoriesLoaded: false,
  fetchTimeline: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('https://arthurfrost.qflo.co.za/php/getTimeline.php');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      const episodesWithFullUrls = (data.Timeline || []).map((episode: Episode) => ({
        ...episode,
        Image: `https://arthurfrost.qflo.co.za/${episode.Image}`,
        Icon: `https://arthurfrost.qflo.co.za/${episode.Icon}`,
        Audio: `https://arthurfrost.qflo.co.za/${episode.Audio}`,
      }));

      set({
        episodes: episodesWithFullUrls,
        authorInfo: data.Body || null,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch timeline',
        loading: false,
      });
    }
  },
  fetchCategories: async () => {
    try {
      const response = await fetch('https://arthurfrost.qflo.co.za/php/getTimeline.php');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const uniqueCategories = Array.from(new Set((data.Timeline as Episode[]).map((episode: Episode) => episode.Category)));
      set({ categories: uniqueCategories, categoriesLoaded: true });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to fetch categories', categoriesLoaded: true });
    }
  },
}));

