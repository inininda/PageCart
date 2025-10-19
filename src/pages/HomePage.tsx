import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  featuredBooks,
  bestsellerBooks,
  newReleaseBooks,
  categories
} from '../data/books';
import { formatPrice } from '../lib/utils';
import { useCartStore } from '../store/cartStore';
import BookCard from '../components/BookCard';

const HomePage = () => {
  const { addItem } = useCartStore();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Welcome to <span className="text-primary">PageCart</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover your next favorite book from our curated collection of
              bestsellers, new releases, and timeless classics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/books">
                  Browse All Books
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/books?bestseller=true">View Bestsellers</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Books
            </h2>
            <p className="text-muted-foreground">
              Hand-picked selections from our editorial team
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/books?featured=true">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.slice(0, 4).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Find books in your favorite genres
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card
                key={category}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <Link to={`/books?category=${encodeURIComponent(category)}`}>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold">{category}</h3>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold tracking-tight">
                  Bestsellers
                </h2>
              </div>
              <p className="text-muted-foreground">
                The most popular books right now
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/books?bestseller=true">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellerBooks.slice(0, 4).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* New Releases */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight">
                New Releases
              </h2>
            </div>
            <p className="text-muted-foreground">
              Fresh arrivals you won't want to miss
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/books?newRelease=true">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newReleaseBooks.slice(0, 4).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold">Stay Updated</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new
            releases, exclusive deals, and reading recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-foreground"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
