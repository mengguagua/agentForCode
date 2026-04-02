import { HomePageData } from './types';

const API_BASE_URL = '/api';

export async function fetchHomePageData(): Promise<HomePageData> {
  const response = await fetch(`${API_BASE_URL}/home`);
  if (!response.ok) {
    throw new Error('Failed to fetch home page data');
  }
  return response.json();
}
