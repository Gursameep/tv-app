import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { useMovies } from '../context/MovieContext';
import { Heart, ArrowLeft, Calendar, Clock, Star } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useMovies();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const data = await getMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">TV Show not found</h2>
        <button onClick={() => navigate('/')} className="text-primary hover:underline">
          Go back home
        </button>
      </div>
    );
  }

  const favorite = isFavorite(movie.id);

  // TVMaze doesn't typically provide high-res backdrops or trailers in the free public tier
  // so we will simplify the backdrop UI
  const backdropUrl = movie.image?.original || null;
  const posterUrl = movie.image?.original || movie.image?.medium || 'https://via.placeholder.com/500x750?text=No+Poster';
  const releaseYear = movie.premiered ? new Date(movie.premiered).getFullYear() : 'N/A';
  const title = movie.name || 'Unknown Title';
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(title + ' official trailer')}`;
  
  // Remove HTML tags from TVMaze summary
  const summary = movie.summary ? movie.summary.replace(/<[^>]*>?/gm, '') : 'No overview available.';

  return (
    <div className="pb-12 animate-fade-in relative -mt-8 pt-8">
      {/* Background Hero Image */}
      {backdropUrl && (
        <div className="absolute inset-0 top-0 left-0 right-0 h-[60vh] -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/60 to-transparent z-10"></div>
          <img 
            src={backdropUrl} 
            alt="Backdrop" 
            className="w-full h-full object-cover opacity-10 blur-sm"
          />
        </div>
      )}

      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </button>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Poster */}
        <div className="flex-shrink-0 w-full max-w-[300px] mx-auto md:mx-0">
          <img 
            src={posterUrl} 
            alt={title} 
            className="w-full rounded-2xl shadow-2xl shadow-black/50"
          />
        </div>

        {/* Details */}
        <div className="flex-grow pt-4">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {title}
            </h1>
            <span className="text-2xl text-gray-400 font-light">({releaseYear})</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 mb-8">
            {movie.rating?.average && (
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium text-white">{movie.rating.average}</span>
              </div>
            )}
            {movie.averageRuntime && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{movie.averageRuntime} min</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{movie.premiered || 'Unknown'}</span>
            </div>
            {movie.network?.name && (
              <span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-semibold">
                {movie.network.name}
              </span>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            {movie.genres?.map((genre, idx) => (
              <span key={idx} className="px-4 py-1.5 bg-surface border border-gray-700 rounded-full text-sm">
                {genre}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a 
              href={youtubeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 font-semibold rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Trailer
            </a>
            
            <button 
              onClick={() => toggleFavorite(movie)}
              className={`flex items-center gap-2 px-6 py-3 border font-semibold rounded-lg transition-colors ${
                favorite 
                  ? 'border-primary text-primary hover:bg-primary/10' 
                  : 'border-gray-600 text-white hover:bg-surface'
              }`}
            >
              <Heart className={`w-5 h-5 ${favorite ? 'fill-primary' : ''}`} />
              {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
