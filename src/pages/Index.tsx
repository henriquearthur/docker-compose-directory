import CategoryCard from '@/components/CategoryCard';
import ComposeCard from '@/components/ComposeCard';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getAnimationStyle } from '@/lib/animations';
import { categories, composeFiles, initializeData } from '@/lib/data';
import { useEffect, useState } from 'react';

const Index = () => {
  const [featured, setFeatured] = useState(composeFiles.slice(0, 6));

  useEffect(() => {
    initializeData().then(() => {
      setFeatured(composeFiles.slice(0, 6));
    });
  }, []);

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
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#categories"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Browse Categories
            </a>
            <a
              href="#featured"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Browse Compose Files
            </a>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="scroll-mt-20">
        <div className="mb-10">
          <div className="inline-block rounded bg-primary/10 px-3 py-1 text-sm text-primary mb-2">
            Categories
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Browse by category</h2>
          <p className="text-muted-foreground">
            Explore Docker Compose files organized by technology type and use case
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Templates Section */}
      <section id="featured" className="scroll-mt-20">
        <div className="mb-10">
          <div className="inline-block rounded bg-primary/10 px-3 py-1 text-sm text-primary mb-2">
            Files
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Useful compose files</h2>
          <p className="text-muted-foreground">
            Ready-to-use Docker Compose configurations for various applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((composeFile, index) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold">{composeFiles.length}</p>
              <p className="text-muted-foreground mt-2">Total Compose Files</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">{categories.length}</p>
              <p className="text-muted-foreground mt-2">Categories</p>
            </div>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  );
};

export default Index;
