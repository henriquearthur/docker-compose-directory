import { ComposeFile } from '@/lib/data';
import React from 'react';
import { Link } from 'react-router-dom';

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

          <p className="text-sm text-muted-foreground line-clamp-2">
            {composeFile.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ComposeCard;
