import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import BookLoader from './components/ui/bookLoader';

const queryClient = new QueryClient();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 600); // Wait for crossfade to complete
    }, 2000);
  }, []);

  return (
    <>
      {/* Loader */}
      {isLoading && (
        <div 
          className={`fixed inset-0 flex items-center justify-center h-screen bg-background z-50 transition-opacity duration-600 ease-in-out ${
            showContent ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <BookLoader />
        </div>
      )}

      {/* Main App */}
      <div 
        className={`transition-opacity duration-600 ease-in-out ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/books/:id" element={<BookDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </main>
          <Footer />
            </div>
          </Router>
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
