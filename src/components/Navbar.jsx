import { Link } from 'react-router-dom';
import { Film, Heart } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

const Navbar = () => {
  const { favorites } = useMovies();

  return (
    <nav className="bg-surface/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors">
          <Film className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight">TVHub</span>
        </Link>
        
        <Link 
          to="/favorites" 
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors relative group"
        >
          <Heart className="w-6 h-6 group-hover:fill-primary group-hover:text-primary transition-all" />
          <span className="hidden sm:inline font-medium">Favorites</span>
          {favorites.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {favorites.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
