import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { LoadingGrid } from '../components/LoadingSkeleton';
import { getPopularMovies, searchMovies } from '../services/api';
import { Film } from 'lucide-react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMovies = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = query ? await searchMovies(query) : await getPopularMovies();
      setMovies(data || []);
    } catch (err) {
      setError('Failed to load TV shows. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(searchQuery);
  }, [searchQuery, fetchMovies]);

  return (
    <div className="pb-12">
      <div className="text-center mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 mb-4 tracking-tight">
          Discover Your Next Favorite TV Show
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore the most popular TV shows right now, or search for classics you love.
        </p>
      </div>

      <SearchBar onSearch={setSearchQuery} />

      {error && (
        <div className="text-center text-red-500 p-4 bg-red-500/10 rounded-lg border border-red-500/20 max-w-2xl mx-auto">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingGrid count={12} />
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Film className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-300">No TV shows found</h2>
          <p className="text-gray-500 mt-2">Try adjusting your search query.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
