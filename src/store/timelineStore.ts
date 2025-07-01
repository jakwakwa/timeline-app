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

interface TimelineState {
  episodes: Episode[];
  authorInfo: AuthorInfo | null;
  loading: boolean;
  error: string | null;
  fetchTimeline: () => Promise<void>;
}

export const useTimelineStore = create<TimelineState>((set) => ({
  episodes: [],
  authorInfo: null,
  loading: false,
  error: null,
  fetchTimeline: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('https://arthurfrost.qflo.co.za/php/getTimeline.php');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      set({
        episodes: data.Timeline || [],
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
}));
