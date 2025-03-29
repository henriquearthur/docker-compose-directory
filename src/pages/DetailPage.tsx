import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ComposeFile, getComposeFileById } from '@/lib/data';
import { ArrowLeft, Copy, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [composeFile, setComposeFile] = useState<ComposeFile | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadComposeFile = async () => {
      if (!id) {
        navigate('/not-found');
        return;
      }

      setLoading(true);

      try {
        const file = await getComposeFileById(id);

        // Only redirect to not-found if we've loaded the data and still can't find the file
        if (!file) {
          navigate('/not-found');
          return;
        }

        setComposeFile(file);
      } catch (error) {
        console.error('Error loading compose file:', error);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };

    loadComposeFile();
  }, [id, navigate]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(composeFile?.content || '');
      toast({
        description: "Docker Compose file copied to clipboard",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to copy to clipboard",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading compose file...</p>
      </div>
    );
  }

  if (!composeFile) {
    return null; // This shouldn't happen as we redirect in the useEffect
  }

  // Render your compose file details here
  return (
    <div className="container py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>

      <h1 className="text-3xl font-bold mb-6">{composeFile.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column with metadata */}
        <div className="md:col-span-1">
          <div className="rounded-lg border border-border p-6 bg-card">
            <p className="text-muted-foreground mb-4">{composeFile.description}</p>

            <div className="">
              <h3 className="font-medium mb-2">Category</h3>
              <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                {composeFile.category}
              </span>
            </div>
          </div>
        </div>

        {/* Right column with compose file content */}
        <div className="md:col-span-2">
          <div className="rounded-lg border border-border p-6 bg-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">docker-compose.yml</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>
            <pre className="p-4 bg-secondary rounded-md overflow-auto">
              <code>{composeFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
