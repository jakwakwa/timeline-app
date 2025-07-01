import { create } from 'zustand';
import { Episode } from './timelineStore';

interface AudioPlayerState {
  currentEpisode: Episode | null;
  isVisible: boolean;
  playEpisode: (episode: Episode) => void;
  closePlayer: () => void;
}

export const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
  currentEpisode: null,
  isVisible: false,
  playEpisode: (episode) => set({ currentEpisode: episode, isVisible: true }),
  closePlayer: () => set({ isVisible: false, currentEpisode: null }),
}));
