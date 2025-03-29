import ComposeCard from '@/components/ComposeCard';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getAnimationStyle } from '@/lib/animations';
import { composeFiles, initializeData } from '@/lib/data';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const Index = () => {
  const [files, setFiles] = useState(composeFiles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await initializeData();
      setFiles(composeFiles);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <LayoutWrapper>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading compose files...</p>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 px-4 -mt-4 sm:-mt-10">
        <div
          style={getAnimationStyle('slideDown', { duration: 0.5 })}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Docker Compose Directory
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A curated collection of Docker Compose files for your development and production needs
          </p>
        </div>
      </section>

      {/* Compose Files Section */}
      <section className="scroll-mt-20">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Compose files</h2>
          <p className="text-muted-foreground">
            Ready-to-use Docker Compose configurations for various applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((composeFile, index) => (
            <ComposeCard
              key={composeFile.id}
              composeFile={composeFile}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10">
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="text-center">
            <p className="text-4xl font-bold">{files.length}</p>
            <p className="text-muted-foreground mt-2">Total Compose Files</p>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  );
};

export default Index;
