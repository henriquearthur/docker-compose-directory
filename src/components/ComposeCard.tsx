
import React from 'react';
import { Link } from 'react-router-dom';
import { ComposeFile } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Star, Download } from 'lucide-react';

interface ComposeCardProps {
  composeFile: ComposeFile;
  index: number;
}

const ComposeCard: React.FC<ComposeCardProps> = ({ composeFile, index }) => {
  return (
    <Link 
      to={`/compose/${composeFile.id}`}
      className="group"
    >
      <div 
        className="h-full relative overflow-hidden glass-card rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-border"
        style={{
          animationDelay: `${index * 0.1}s`,
          animationFillMode: 'both',
          animationName: 'slide-up',
          animationDuration: '0.3s',
        }}
      >
        <div className="p-5">
          <h3 className="text-lg font-medium tracking-tight mb-2 transition-colors group-hover:text-primary">
            {composeFile.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {composeFile.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {composeFile.tags.map(tag => (
              <span 
                key={tag} 
                className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 mr-1 text-amber-500" />
              <span>{composeFile.stars}</span>
            </div>
            <div className="flex items-center">
              <Download className="h-3.5 w-3.5 mr-1" />
              <span>{composeFile.downloads}</span>
            </div>
            <div>
              <span className="text-xs">
                Updated {new Date(composeFile.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ComposeCard;
