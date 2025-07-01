import { NextResponse } from 'next/server';
import { Episode } from '@/store/timelineStore';

// Cache for the fetched episodes to avoid repeated API calls
let cachedEpisodes: Episode[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchAllEpisodes(): Promise<Episode[]> {
  const now = Date.now();
  
  // Return cached data if it's still fresh
  if (cachedEpisodes && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedEpisodes;
  }
  
  try {
    const response = await fetch('https://arthurfrost.qflo.co.za/php/getTimeline.php');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Cache the episodes with corrected URLs
    const episodesWithFullUrls = (data.Timeline || []).map((episode: Episode) => ({
      ...episode,
      Image: `https://arthurfrost.qflo.co.za/${episode.Image}`,
      Icon: `https://arthurfrost.qflo.co.za/${episode.Icon}`,
      Audio: `https://arthurfrost.qflo.co.za/${episode.Audio}`,
    }));
    
    cachedEpisodes = episodesWithFullUrls;
    cacheTimestamp = now;
    
    return cachedEpisodes || [];
  } catch (error) {
    console.error('Failed to fetch episodes:', error);
    // Return cached episodes if available, otherwise empty array
    return cachedEpisodes || [];
  }
}

function getEpisodes(episodes: Episode[], page: number, pageSize: number, category?: string, search?: string): { episodes: Episode[]; total: number } {
  let filteredEpisodes = episodes;
  
  if (category && category !== 'All') {
    filteredEpisodes = filteredEpisodes.filter(episode => episode.Category === category);
  }

  if (search) {
    const lowerCaseSearch = search.toLowerCase();
    filteredEpisodes = filteredEpisodes.filter(episode => 
      episode.Title.toLowerCase().includes(lowerCaseSearch) ||
      episode.Description.toLowerCase().includes(lowerCaseSearch) ||
      episode.Category.toLowerCase().includes(lowerCaseSearch)
    );
  }

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  
  return {
    episodes: filteredEpisodes.slice(start, end),
    total: filteredEpisodes.length,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;

  const allEpisodes = await fetchAllEpisodes();
  const { episodes, total } = getEpisodes(allEpisodes, page, pageSize, category, search);

  return NextResponse.json({ episodes, total });
}
