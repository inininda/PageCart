import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { books, categories } from '../data/books';
import BookCard from '../components/BookCard';

const BooksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('title');

  // Get filter values from URL params
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const bestsellerFilter = searchParams.get('bestseller') === 'true';
  const newReleaseFilter = searchParams.get('newRelease') === 'true';
  const featuredFilter = searchParams.get('featured') === 'true';

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let filtered = books.filter((book) => {
      const matchesSearch = searchQuery === '' || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === '' || book.category === categoryFilter;
      const matchesBestseller = !bestsellerFilter || book.bestseller;
      const matchesNewRelease = !newReleaseFilter || book.newRelease;
      const matchesFeatured = !featuredFilter || book.featured;

      return matchesSearch && matchesCategory && matchesBestseller && matchesNewRelease && matchesFeatured;
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [searchQuery, categoryFilter, bestsellerFilter, newReleaseFilter, featuredFilter, sortBy]);

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const activeFiltersCount = [categoryFilter, bestsellerFilter, newReleaseFilter, featuredFilter, searchQuery].filter(Boolean).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <Input
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => updateSearchParams('search', e.target.value)}
                />
              </div>

              {/* Categories */}
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <div className="space-y-2">
                  <Button
                    variant={categoryFilter === '' ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => updateSearchParams('category', '')}
                  >
                    All Categories
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={categoryFilter === category ? 'default' : 'ghost'}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => updateSearchParams('category', category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Special Collections */}
              <div>
                <label className="text-sm font-medium mb-2 block">Collections</label>
                <div className="space-y-2">
                  <Button
                    variant={bestsellerFilter ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => updateSearchParams('bestseller', bestsellerFilter ? '' : 'true')}
                  >
                    Bestsellers
                  </Button>
                  <Button
                    variant={newReleaseFilter ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => updateSearchParams('newRelease', newReleaseFilter ? '' : 'true')}
                  >
                    New Releases
                  </Button>
                  <Button
                    variant={featuredFilter ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => updateSearchParams('featured', featuredFilter ? '' : 'true')}
                  >
                    Featured
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Books</h1>
              <p className="text-muted-foreground">
                {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="title">Sort by Title</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>

              {/* View Mode */}
              <div className="hidden sm:flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => updateSearchParams('search', '')}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {categoryFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {categoryFilter}
                  <button
                    onClick={() => updateSearchParams('category', '')}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {bestsellerFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Bestsellers
                  <button
                    onClick={() => updateSearchParams('bestseller', '')}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {newReleaseFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  New Releases
                  <button
                    onClick={() => updateSearchParams('newRelease', '')}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {featuredFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Featured
                  <button
                    onClick={() => updateSearchParams('featured', '')}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* Books Grid */}
          {filteredBooks.length > 0 ? (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No books found matching your criteria.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
