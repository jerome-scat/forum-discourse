
import React, { useState, useEffect, useRef } from 'react';
import ThreadCard from './ThreadCard';
import SeoContent from './SeoContent';
import ThreadListLoader from './ThreadListLoader';
import { allThreads } from '@/data/threadsData';

const ThreadList = () => {
  const [threads, setThreads] = useState(allThreads.slice(0, 5));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMoreThreads = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setTimeout(() => {
      const currentSize = threads.length;
      const nextThreads = allThreads.slice(currentSize, currentSize + 3);
      
      if (nextThreads.length > 0) {
        setThreads(prevThreads => [...prevThreads, ...nextThreads]);
      }
      
      if (currentSize + nextThreads.length >= allThreads.length) {
        setHasMore(false);
      }
      
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreThreads();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loading, threads]);

  return (
    <div className="my-6">
      <div className="space-y-4">
        {threads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
      
      {hasMore && (
        <div 
          ref={loaderRef} 
          className="mt-8 text-center py-4"
        >
          {loading ? (
            <ThreadListLoader loading={loading} />
          ) : (
            <span className="text-gray-500">Faites défiler pour voir plus</span>
          )}
        </div>
      )}
      
      {!hasMore && (
        <div className="mt-8 text-center">
          <span className="text-gray-500">Toutes les discussions ont été chargées</span>
        </div>
      )}

      {/* Contenu SEO */}
      <SeoContent />
    </div>
  );
};

export default ThreadList;
