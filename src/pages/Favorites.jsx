import { useMovies } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { HeartCrack } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { favorites } = useMovies();

  return (
    <div className="pb-12">
      <div className="mb-10 mt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Your Favorites
        </h1>
        <p className="text-gray-400">
          TV shows you've liked, all in one place.
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-surface rounded-2xl border border-gray-800">
          <HeartCrack className="w-20 h-20 mx-auto text-gray-700 mb-6" />
          <h2 className="text-2xl font-semibold text-gray-300 mb-3">No favorites yet</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            It looks like you haven't added any TV shows to your favorites. 
            Start exploring and click the heart icon to save them here!
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors shadow-lg shadow-primary/20"
          >
            Discover TV Shows
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
