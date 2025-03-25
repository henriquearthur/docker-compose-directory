
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LayoutWrapper from '@/components/LayoutWrapper';
import ComposeCard from '@/components/ComposeCard';
import { getCategoryById, getComposeFilesByCategory } from '@/lib/data';
import { getAnimationStyle, createStaggeredAnimation } from '@/lib/animations';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

type LucideIconName = keyof typeof LucideIcons;

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const composeFiles = categoryId ? getComposeFilesByCategory(categoryId) : [];
  
  useEffect(() => {
    if (!category) {
      navigate('/not-found');
    }
  }, [category, navigate]);

  if (!category) {
    return null;
  }

  // Get icon dynamically
  const IconComponent = LucideIcons[category.icon as LucideIconName] || LucideIcons.Box;
  
  const animationStyles = createStaggeredAnimation('slideUp', composeFiles.length, { staggerChildren: 0.1 });

  return (
    <LayoutWrapper>
      <div className="mb-12">
        <div 
          style={getAnimationStyle('slideDown')}
          className="flex items-center mb-8"
        >
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <LucideIcons.ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </button>
          
          <div className={cn(
            "w-12 h-12 rounded-md flex items-center justify-center mr-4",
            category.color
          )}>
            <IconComponent className="h-6 w-6" />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {composeFiles.map((composeFile, index) => (
            <div key={composeFile.id} style={animationStyles[index]}>
              <ComposeCard 
                composeFile={composeFile}
                index={0} // Animation is handled by staggered animations
              />
            </div>
          ))}
        </div>
        
        {composeFiles.length === 0 && (
          <div 
            className="text-center py-20 border border-dashed border-border rounded-lg"
            style={getAnimationStyle('fadeIn')}
          >
            <LucideIcons.FileQuestion className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-medium mb-2">No compose files found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              There are no compose files available in this category yet. Check back later or explore other categories.
            </p>
          </div>
        )}
      </div>
    </LayoutWrapper>
  );
};

export default CategoryPage;
