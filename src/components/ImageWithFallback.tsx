import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackLabel?: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  fallbackLabel,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (fallbackSrc && src !== fallbackSrc) {
      // try fallback src
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  if (hasError || !src) {
    return (
      <div 
        className={`w-full h-full min-h-[160px] bg-gradient-to-br from-[#FAF7F2] to-[#E8DED3] flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
      >
        <div className="w-8 h-8 rounded-full bg-[#3A2924]/10 flex items-center justify-center text-[#3A2924] mb-2">
          <Sparkles className="w-4 h-4 stroke-[1.5]" />
        </div>
        <span className="font-serif text-xs text-[#3A2924] font-medium tracking-wider uppercase">
          {fallbackLabel || alt || 'VALOIR Beauté'}
        </span>
        <span className="text-[10px] text-[#202020]/40 mt-0.5 tracking-widest uppercase">
          Artisanal Formula
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || 'Valoir Luxury Cosmetics'}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={handleError}
      onLoad={() => setIsLoaded(true)}
      className={`object-cover object-center transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-90'
      } ${className}`}
      {...props}
    />
  );
};
