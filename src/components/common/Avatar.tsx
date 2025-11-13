import { LazyImage } from './LazyImage';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ 
  src = undefined, // No custom image by default
  alt = 'Srimanth Adep - Full Stack Developer',
  size = 'lg',
  className = "" 
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-primary/20 shadow-lg">
        <LazyImage
          src={src || undefined}
          alt={alt}
          className="w-full h-full object-cover"
          placeholder="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23e5e7eb'/%3E%3Ctext x='100' y='100' text-anchor='middle' dy='.3em' fill='%239ca3af' font-size='48' font-family='Arial'%3ESA%3C/text%3E%3C/svg%3E"
        />
      </div>
      {/* Status indicator */}
      <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-xl -z-10"></div>
    </div>
  );
} 