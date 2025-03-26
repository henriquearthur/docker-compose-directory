
import { getAnimationStyle } from '@/lib/animations';
import { cn } from '@/lib/utils';
import React from 'react';
import Navbar from './Navbar';

interface LayoutWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        className={cn(
          "flex-1 py-10 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full",
          className
        )}
        style={getAnimationStyle('fadeIn')}
      >
        {children}
      </main>
      <footer className="py-6 px-4 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Docker Compose Directory © {new Date().getFullYear()}
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LayoutWrapper;
