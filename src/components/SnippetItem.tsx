import React from 'react';
import type { Snippet } from '../types/snippet';

interface SnippetItemProps {
  snippet: Snippet;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const SnippetItem: React.FC<SnippetItemProps> = ({ snippet, onDelete, isDeleting = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getContentPreview = (content: string) => {
    return content.length > 200 ? `${content.substring(0, 200)}...` : content;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="text-sm text-gray-500 mb-1">
            {snippet.deviceId && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                Device: {snippet.deviceId}
              </span>
            )}
            <span className="text-gray-400">
              {formatDate(snippet.createdAt)}
            </span>
          </div>
          
          <div className="text-sm text-gray-600 mb-2">
            Type: <span className="font-medium">{snippet.type}</span>
          </div>
        </div>
        
        <button
          onClick={() => onDelete(snippet.id)}
          disabled={isDeleting}
          className="ml-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      <div className="mb-3">
        <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 p-3 rounded border">
          {getContentPreview(snippet.content)}
        </pre>
      </div>

      {snippet.tags && snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {snippet.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SnippetItem; 