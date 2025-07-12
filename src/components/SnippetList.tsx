import React, { useState, useEffect } from 'react';
import SnippetItem from './SnippetItem';
import type { Snippet, SnippetFilters } from '../types/snippet';
import { snippetApi } from '../services/api';

interface SnippetListProps {
  filters?: SnippetFilters;
  onSnippetCreated?: (snippet: Snippet) => void;
  onSnippetDeleted?: (snippetId: string) => void;
}

const SnippetList: React.FC<SnippetListProps> = ({ 
  filters, 
  onSnippetCreated, 
  onSnippetDeleted 
}) => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await snippetApi.getSnippets(filters);
      setSnippets(data);
    } catch (err) {
      setError('Failed to fetch snippets');
      console.error('Error fetching snippets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, [filters]);

  const handleDelete = async (snippetId: string) => {
    try {
      setDeletingIds(prev => new Set(prev).add(snippetId));
      await snippetApi.deleteSnippet(snippetId);
      
      setSnippets(prev => prev.filter(s => s.id !== snippetId));
      onSnippetDeleted?.(snippetId);
    } catch (err) {
      console.error('Error deleting snippet:', err);
      setError('Failed to delete snippet');
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(snippetId);
        return newSet;
      });
    }
  };



  const filteredSnippets = snippets.filter(snippet => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      snippet.content.toLowerCase().includes(searchLower) ||
      (Array.isArray(snippet.tags) && snippet.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
      (snippet.deviceId && snippet.deviceId.toLowerCase().includes(searchLower))
      || snippet.type.toString().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Loading snippets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-800">{error}</div>
        <button
          onClick={fetchSnippets}
          className="mt-2 px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search snippets by content, tags, or device ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        {filteredSnippets.length} snippet{filteredSnippets.length !== 1 ? 's' : ''} found
      </div>

      {/* Snippets List */}
      {filteredSnippets.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? 'No snippets match your search.' : 'No snippets found.'}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSnippets.map((snippet) => (
            <SnippetItem
              key={snippet.id}
              snippet={snippet}
              onDelete={handleDelete}
              isDeleting={deletingIds.has(snippet.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SnippetList; 