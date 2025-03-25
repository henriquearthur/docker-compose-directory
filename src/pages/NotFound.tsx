
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import LayoutWrapper from "@/components/LayoutWrapper";
import { getAnimationStyle } from "@/lib/animations";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <LayoutWrapper>
      <div 
        className="flex flex-col items-center justify-center py-20 text-center"
        style={getAnimationStyle('fadeIn')}
      >
        <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full bg-muted/50">
          <span className="text-4xl font-semibold">404</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </LayoutWrapper>
  );
};

export default NotFound;
