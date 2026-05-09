import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovies();

  const favorite = isFavorite(movie.id);

  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // Prevent navigating to details when clicking the heart
    toggleFavorite(movie);
  };

  // TVMaze uses 'premiered' instead of 'release_date', and 'name' instead of 'title'
  const releaseYear = movie.premiered ? new Date(movie.premiered).getFullYear() : 'N/A';
  
  // TVMaze uses 'image.medium' or 'image.original' for posters
  const imageUrl = movie.image?.medium || movie.image?.original || 'https://via.placeholder.com/210x295?text=No+Poster';
  const title = movie.name || 'Unknown Title';

  return (
    <div 
      className="group relative bg-surface rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300"
      onClick={() => navigate(`/tvshow/${movie.id}`)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Heart Icon */}
        <button 
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/80 transition-colors z-10"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${favorite ? 'fill-primary text-primary' : 'text-white'}`} 
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-white truncate" title={title}>
          {title}
        </h3>
        <p className="text-gray-400 text-sm mt-1">{releaseYear}</p>
      </div>
    </div>
  );
};

export default MovieCard;
