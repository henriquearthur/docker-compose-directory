
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/lib/data';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  index: number;
}

type LucideIconName = keyof typeof LucideIcons;

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  // Get icon dynamically
  const IconComponent = LucideIcons[category.icon as LucideIconName] || LucideIcons.Box;

  return (
    <Link 
      to={`/category/${category.id}`}
      className="group"
    >
      <div 
        className="h-full relative overflow-hidden neo-card rounded-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-border"
        style={{
          animationDelay: `${index * 0.1}s`,
          animationFillMode: 'both',
          animationName: 'bounce-in',
          animationDuration: '0.5s',
        }}
      >
        <div className="p-6">
          <div className={cn(
            "w-12 h-12 mb-4 rounded-md flex items-center justify-center",
            category.color
          )}>
            <IconComponent className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-medium tracking-tight mb-2">{category.name}</h3>
          <p className="text-muted-foreground mb-4">{category.description}</p>
          <div className="flex justify-between items-center">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {category.count} files
            </span>
            <span className="text-sm text-primary font-medium group-hover:translate-x-1 transition-transform duration-300">
              Explore →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
