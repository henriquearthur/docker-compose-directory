
import { CSSProperties } from 'react';

type AnimationVariant = 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleIn' | 'bounceIn';

type AnimationOptions = {
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  staggerDirection?: 'forward' | 'reverse';
};

export const getAnimationStyle = (
  variant: AnimationVariant,
  options: AnimationOptions = {}
): CSSProperties => {
  const { 
    delay = 0, 
    duration = 0.3 
  } = options;
  
  const baseStyle: CSSProperties = {
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    animationFillMode: 'both',
  };
  
  switch (variant) {
    case 'fadeIn':
      return {
        ...baseStyle,
        animationName: 'fade-in',
      };
    case 'slideUp':
      return {
        ...baseStyle,
        animationName: 'slide-up',
      };
    case 'slideDown':
      return {
        ...baseStyle,
        animationName: 'slide-down',
      };
    case 'scaleIn':
      return {
        ...baseStyle,
        animationName: 'scale-in',
      };
    case 'bounceIn':
      return {
        ...baseStyle,
        animationName: 'bounce-in',
      };
    default:
      return {};
  }
};

export const createStaggeredAnimation = (
  variant: AnimationVariant,
  count: number,
  options: AnimationOptions = {}
): CSSProperties[] => {
  const { 
    delay = 0, 
    duration = 0.3,
    staggerChildren = 0.1,
    staggerDirection = 'forward'
  } = options;
  
  return Array.from({ length: count }).map((_, index) => {
    const staggerIndex = staggerDirection === 'forward' ? index : count - 1 - index;
    const staggerDelay = delay + (staggerIndex * staggerChildren);
    
    return getAnimationStyle(variant, { delay: staggerDelay, duration });
  });
};
