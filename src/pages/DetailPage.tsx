
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getComposeFileById, getCategoryById } from '@/lib/data';
import { getAnimationStyle } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

const DetailPage = () => {
  const { composeId } = useParams<{ composeId: string }>();
  const navigate = useNavigate();
  const codeRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  
  const composeFile = composeId ? getComposeFileById(composeId) : undefined;
  const category = composeFile ? getCategoryById(composeFile.category) : undefined;
  
  useEffect(() => {
    if (!composeFile) {
      navigate('/not-found');
    }
  }, [composeFile, navigate]);

  if (!composeFile || !category) {
    return null;
  }

  const copyToClipboard = () => {
    if (navigator.clipboard && composeFile) {
      navigator.clipboard.writeText(composeFile.content)
        .then(() => {
          setCopied(true);
          toast.success('Copied to clipboard!');
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          toast.error('Failed to copy!');
        });
    }
  };

  const downloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([composeFile.content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `docker-compose-${composeFile.id}.yml`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('File downloaded!');
  };

  // Get icon dynamically
  const CategoryIcon = LucideIcons[category.icon as keyof typeof LucideIcons] || LucideIcons.Box;

  return (
    <LayoutWrapper>
      <div 
        className="mb-8"
        style={getAnimationStyle('slideDown')}
      >
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <LucideIcons.ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </button>
          
          <h1 className="text-3xl font-bold">{composeFile.name}</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <Link 
            to={`/category/${category.id}`}
            className={cn(
              "inline-flex items-center text-sm rounded-full px-3 py-1",
              category.color
            )}
          >
            <CategoryIcon className="h-4 w-4 mr-1.5" />
            {category.name}
          </Link>
          
          <div className="flex flex-wrap gap-2">
            {composeFile.tags.map(tag => (
              <span 
                key={tag} 
                className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <p className="text-lg mb-6">{composeFile.description}</p>
        
        <div className="flex flex-wrap gap-3 mb-8">
          <Button onClick={copyToClipboard} className="gap-2">
            {copied ? (
              <LucideIcons.Check className="h-4 w-4" />
            ) : (
              <LucideIcons.Copy className="h-4 w-4" />
            )}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
          
          <Button variant="outline" onClick={downloadFile} className="gap-2">
            <LucideIcons.Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      
      <div 
        className="rounded-lg border border-border overflow-hidden bg-card"
        style={getAnimationStyle('fadeIn', { delay: 0.1 })}
      >
        <div className="flex items-center justify-between px-4 py-2 bg-muted">
          <span className="text-sm font-medium">docker-compose.yml</span>
          <button 
            onClick={copyToClipboard}
            className="p-1 rounded hover:bg-background/50 transition-colors"
          >
            {copied ? (
              <LucideIcons.Check className="h-4 w-4 text-green-500" />
            ) : (
              <LucideIcons.Copy className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        </div>
        <pre 
          ref={codeRef}
          className="p-4 overflow-auto text-sm font-mono"
        >
          <code>{composeFile.content}</code>
        </pre>
      </div>
      
      <div 
        className="mt-8 flex flex-col sm:flex-row items-center justify-between p-6 rounded-lg border border-border bg-card"
        style={getAnimationStyle('slideUp', { delay: 0.2 })}
      >
        <div className="flex items-center mb-4 sm:mb-0">
          <LucideIcons.Star className="h-5 w-5 text-amber-500 mr-2" />
          <span className="font-medium mr-6">{composeFile.stars} Stars</span>
          
          <LucideIcons.Download className="h-5 w-5 text-muted-foreground mr-2" />
          <span className="font-medium">{composeFile.downloads} Downloads</span>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <span>Created: {new Date(composeFile.createdAt).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>Updated: {new Date(composeFile.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default DetailPage;
