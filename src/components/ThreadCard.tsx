
import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { MessageCircle, Eye, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCategoryColorClass } from '@/utils/categoryUtils';

interface ThreadCardProps {
  thread: {
    id: number;
    title: string;
    author: {
      name: string;
      avatar: string;
    };
    date: string;
    replies: number;
    views: number;
    category: {
      id: number;
      name: string;
      color: string;
      emoji: string;
    };
    tags: Array<{
      id: number;
      name: string;
      color: string;
    }>;
    excerpt: string;
    lastActivity: string;
    participants: Array<{
      name: string;
      avatar: string;
    }>;
    upvotes: number;
    downvotes: number;
  };
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
  const [upvotes, setUpvotes] = useState(thread.upvotes || 0);
  const [downvotes, setDownvotes] = useState(thread.downvotes || 0);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleUpvote = () => {
    if (userVote === 'up') {
      setUpvotes(prev => prev - 1);
      setUserVote(null);
    } else {
      setUpvotes(prev => prev + 1);
      if (userVote === 'down') {
        setDownvotes(prev => prev - 1);
      }
      setUserVote('up');
    }
  };

  const handleDownvote = () => {
    if (userVote === 'down') {
      setDownvotes(prev => prev - 1);
      setUserVote(null);
    } else {
      setDownvotes(prev => prev + 1);
      if (userVote === 'up') {
        setUpvotes(prev => prev - 1);
      }
      setUserVote('down');
    }
  };

  return (
    <div className="thread-card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-grow">
          <h3 className="text-lg font-medium text-gray-900 mb-1">{thread.title}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-0.5 flex items-center gap-1 text-xs rounded-full ${getCategoryColorClass(thread.category.color)}`}>
              <span>{thread.category.emoji}</span>
              {thread.category.name}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3">{thread.excerpt}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <div className="flex items-center mr-4">
              <Avatar className="h-6 w-6 mr-2">
                <img src={thread.author.avatar} alt={thread.author.name} />
              </Avatar>
              <span>Par <a href="#" className="text-[#edb067] hover:underline">{thread.author.name}</a> <span className="text-gray-500 opacity-70">• {thread.date.toLowerCase()}</span></span>
            </div>
            
            <div className="flex items-center space-x-3 ml-2">
              <button 
                onClick={handleUpvote}
                className={`flex items-center gap-1 ${userVote === 'up' ? 'text-[#edb067]' : 'text-gray-500 hover:text-[#edb067]'} transition-colors`}
                aria-label="J'aime"
              >
                <ThumbsUp size={16} />
                <span>{upvotes}</span>
              </button>
              
              <button 
                onClick={handleDownvote}
                className={`flex items-center gap-1 ${userVote === 'down' ? 'text-red-500' : 'text-gray-500 hover:text-red-500'} transition-colors`}
                aria-label="Je n'aime pas"
              >
                <ThumbsDown size={16} />
                <span>{downvotes}</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex items-center">
            <div className="flex -space-x-2">
              {thread.participants.slice(0, 3).map((participant, index) => (
                <Avatar key={index} className="h-8 w-8 border-2 border-white">
                  <img src={participant.avatar} alt={participant.name} />
                </Avatar>
              ))}
              {thread.participants.length > 3 && (
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-xs text-gray-600 border-2 border-white">
                  +{thread.participants.length - 3}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            <MessageCircle size={16} className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-600">{thread.replies}</span>
          </div>
          
          <div className="flex items-center">
            <Eye size={16} className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-600">{thread.views}</span>
          </div>
          
          <div className="hidden md:flex items-center">
            <Clock size={16} className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-600 opacity-70">{thread.lastActivity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
