const BASE_URL = 'https://api.tvmaze.com';

// TVMaze doesn't require an API key!

export const getPopularMovies = async () => {
  try {
    // TVMaze doesn't have a "popular" endpoint, so we'll fetch a list of standard shows.
    const response = await fetch(`${BASE_URL}/shows`);
    if (!response.ok) throw new Error('Failed to fetch popular shows');
    const data = await response.json();
    // Return the first 50 shows to act as our "popular" list
    return data.slice(0, 50);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchMovies = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search shows');
    const data = await response.json();
    // The search endpoint returns an array of objects like { score: ..., show: { ... } }
    // We map it to just return the show objects so it matches the format of getPopularMovies
    return data.map(item => item.show);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  try {
    // We can embed cast or episodes if we want, but basic details is enough for now
    const response = await fetch(`${BASE_URL}/shows/${id}`);
    if (!response.ok) throw new Error('Failed to fetch show details');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
