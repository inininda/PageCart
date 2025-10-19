import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Book } from '../data/books';
import { formatPrice } from '../lib/utils';
import { useCartStore } from '../store/cartStore';

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(book);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      <Link to={`/books/${book.id}`}>
        <div className="relative">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {book.bestseller && (
              <Badge variant="destructive" className="text-xs">
                Bestseller
              </Badge>
            )}
            {book.newRelease && (
              <Badge variant="secondary" className="text-xs">
                New
              </Badge>
            )}
            {book.originalPrice && (
              <Badge variant="outline" className="text-xs bg-background">
                Sale
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium ml-1">{book.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({book.reviewCount})
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg">{formatPrice(book.price)}</span>
            {book.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(book.originalPrice)}
              </span>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
