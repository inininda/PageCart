import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">PageCart</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted online bookstore. Discover, explore, and purchase your next favorite read.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/books" className="text-muted-foreground hover:text-primary transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/books?bestseller=true" className="text-muted-foreground hover:text-primary transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/books?newRelease=true" className="text-muted-foreground hover:text-primary transition-colors">
                  New Releases
                </Link>
              </li>
              <li>
                <Link to="/books?category=Fiction" className="text-muted-foreground hover:text-primary transition-colors">
                  Fiction
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/books?category=Science Fiction" className="text-muted-foreground hover:text-primary transition-colors">
                  Science Fiction
                </Link>
              </li>
              <li>
                <Link to="/books?category=Mystery & Thriller" className="text-muted-foreground hover:text-primary transition-colors">
                  Mystery & Thriller
                </Link>
              </li>
              <li>
                <Link to="/books?category=Romance" className="text-muted-foreground hover:text-primary transition-colors">
                  Romance
                </Link>
              </li>
              <li>
                <Link to="/books?category=Self-Help" className="text-muted-foreground hover:text-primary transition-colors">
                  Self-Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@pagecart.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Book Street, Reading City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 PageCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
