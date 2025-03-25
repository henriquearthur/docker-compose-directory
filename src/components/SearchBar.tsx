
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchComposeFiles, ComposeFile } from '@/lib/data';
import { cn } from '@/lib/utils';
import { getAnimationStyle } from '@/lib/animations';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ComposeFile[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.trim().length > 0) {
      const searchResults = searchComposeFiles(searchQuery);
      setResults(searchResults);
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prevIndex => 
        prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
    
    // Arrow up
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prevIndex => 
        prevIndex > 0 ? prevIndex - 1 : -1
      );
    }
    
    // Enter
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0) {
        navigate(`/compose/${results[selectedIndex].id}`);
        clearSearch();
      } else if (results.length > 0) {
        navigate(`/compose/${results[0].id}`);
        clearSearch();
      }
    }
    
    // Escape
    else if (e.key === 'Escape') {
      clearSearch();
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(e.target as Node) &&
        resultsRef.current && 
        !resultsRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search compose files..."
          className="w-full bg-background rounded-full border border-input pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.trim().length > 0) {
              setIsOpen(true);
            }
          }}
        />
        {query && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-full transition-colors"
            onClick={clearSearch}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div 
          ref={resultsRef}
          className="absolute w-full mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50 max-h-[300px] overflow-y-auto"
          style={getAnimationStyle('slideDown', { duration: 0.2 })}
        >
          <div className="p-1">
            {results.map((result, index) => (
              <div
                key={result.id}
                className={cn(
                  "px-3 py-2 hover:bg-accent rounded cursor-pointer transition-colors",
                  selectedIndex === index && "bg-accent"
                )}
                onClick={() => {
                  navigate(`/compose/${result.id}`);
                  clearSearch();
                }}
              >
                <div className="font-medium">{result.name}</div>
                <div className="text-xs text-muted-foreground">{result.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div 
          className="absolute w-full mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50"
          style={getAnimationStyle('slideDown', { duration: 0.2 })}
        >
          <div className="p-4 text-center text-muted-foreground">
            No results found for "{query}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
