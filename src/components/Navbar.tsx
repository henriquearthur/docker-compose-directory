import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { categories } from '@/lib/data';
import { Github, Menu, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSearchVisible = location.pathname === '/';

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${scrolled
        ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 shrink-0"
            aria-label="docker-compose-directory"
          >
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <span className="sr-only">Logo</span>
              <svg
                className="h-5 w-5 text-primary-foreground"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <rect
                  x="7"
                  y="8"
                  width="3"
                  height="3"
                  rx="0.5"
                  fill="currentColor"
                />
                <rect
                  x="7"
                  y="13"
                  width="3"
                  height="3"
                  rx="0.5"
                  fill="currentColor"
                />
                <rect
                  x="12"
                  y="8"
                  width="3"
                  height="3"
                  rx="0.5"
                  fill="currentColor"
                />
                <rect
                  x="12"
                  y="13"
                  width="3"
                  height="3"
                  rx="0.5"
                  fill="currentColor"
                />
                <rect
                  x="17"
                  y="8"
                  width="3"
                  height="3"
                  rx="0.5"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-medium text-foreground hidden sm:inline-block">
              Docker Compose Directory
            </span>
          </Link>

          {/* Search Bar (Desktop) */}
          {isSearchVisible && (
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <SearchBar />
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center">
            {/* GitHub Link */}
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 hidden sm:flex"
              asChild
            >
              <a
                href="https://github.com/henriquearthur/docker-compose-directory"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>

            {/* Search Trigger (Mobile) */}
            {isSearchVisible && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link
                    to="/"
                    className="px-2 py-1.5 rounded-md hover:bg-accent flex items-center"
                  >
                    Home
                  </Link>

                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="px-2 py-1.5 rounded-md hover:bg-accent flex items-center"
                    >
                      {category.name}
                    </Link>
                  ))}

                  <div className="pt-4 mt-4 border-t border-border">
                    <a
                      href="https://github.com/henriquearthur/docker-compose-directory"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1.5 rounded-md hover:bg-accent flex items-center"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchVisible && (
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>
      )}
    </header>
  );
};

export default Navbar;
