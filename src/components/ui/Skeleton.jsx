import React from 'react';

export const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`shimmer rounded-lg bg-gray-200 dark:bg-zinc-800 ${className}`}
      {...props}
    />
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 dark:border-zinc-800 dark:bg-brand-card-dark">
      {/* Image Skeleton */}
      <Skeleton className="aspect-square w-full rounded-xl" />
      
      {/* Content Skeletons */}
      <div className="mt-5 space-y-3">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-3 w-2/3" />
        
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-8 w-1/4 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
