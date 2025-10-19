import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { books } from '../data/books';
import { formatPrice } from '../lib/utils';
import { useCartStore } from '../store/cartStore';
import BookCard from '../components/BookCard';

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const book = books.find(b => b.id === id);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
          <p className="text-muted-foreground mb-4">The book you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/books">Browse All Books</Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedBooks = books
    .filter(b => b.id !== book.id && (b.category === book.category || b.author === book.author))
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(book, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to="/books" className="hover:text-primary">Books</Link>
        <span>/</span>
        <Link to={`/books?category=${encodeURIComponent(book.category)}`} className="hover:text-primary">
          {book.category}
        </Link>
        <span>/</span>
        <span className="text-foreground">{book.title}</span>
      </div>

      {/* Back Button */}
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link to="/books">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Books
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Book Image */}
        <div className="space-y-4">
          <div className="relative">
            <img
              src={book.image}
              alt={book.title}
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {book.bestseller && (
                <Badge variant="destructive">Bestseller</Badge>
              )}
              {book.newRelease && (
                <Badge variant="secondary">New Release</Badge>
              )}
              {book.originalPrice && (
                <Badge variant="outline" className="bg-background">Sale</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(book.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{book.rating}</span>
                <span className="text-muted-foreground">({book.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold">{formatPrice(book.price)}</span>
              {book.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(book.originalPrice)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div>
                <span className="text-muted-foreground">Category:</span>
                <p className="font-medium">{book.category}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Publisher:</span>
                <p className="font-medium">{book.publisher}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Pages:</span>
                <p className="font-medium">{book.pages}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Language:</span>
                <p className="font-medium">{book.language}</p>
              </div>
              <div>
                <span className="text-muted-foreground">ISBN:</span>
                <p className="font-medium">{book.isbn}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Published:</span>
                <p className="font-medium">{new Date(book.publishedDate).getFullYear()}</p>
              </div>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-muted"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-muted"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-muted-foreground">
                {book.stockCount} in stock
              </span>
            </div>

            <div className="flex space-x-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!book.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <Truck className="h-4 w-4 text-primary" />
              <span>Free shipping over $25</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span>Secure payment</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <RotateCcw className="h-4 w-4 text-primary" />
              <span>30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b">
          <div className="flex space-x-8">
            {['description', 'details', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">{book.description}</p>
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Title:</span>
                  <span className="font-medium">{book.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Author:</span>
                  <span className="font-medium">{book.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Publisher:</span>
                  <span className="font-medium">{book.publisher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Publication Date:</span>
                  <span className="font-medium">{new Date(book.publishedDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ISBN:</span>
                  <span className="font-medium">{book.isbn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pages:</span>
                  <span className="font-medium">{book.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language:</span>
                  <span className="font-medium">{book.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{book.category}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">Reviews feature coming soon!</p>
                <p className="text-sm text-muted-foreground mt-2">
                  This book has {book.reviewCount} reviews with an average rating of {book.rating} stars.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedBooks.map((relatedBook) => (
              <BookCard key={relatedBook.id} book={relatedBook} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailPage;
