import { User } from 'lucide-react';

const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  size = 'md', 
  online = false,
  className = '' 
}) => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
  };

  const indicatorSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
    '2xl': 'w-5 h-5',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div className={`${sizes[size]} rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center`}>
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className={`w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 ${src ? 'hidden' : 'flex'}`}>
          <User className={`${size === 'xs' ? 'w-3 h-3' : size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : size === 'lg' ? 'w-6 h-6' : size === 'xl' ? 'w-8 h-8' : 'w-10 h-10'}`} />
        </div>
      </div>
      {online && (
        <div className={`absolute bottom-0 right-0 ${indicatorSizes[size]} bg-green-500 border-2 border-white dark:border-gray-800 rounded-full`}></div>
      )}
    </div>
  );
};

export default Avatar;
