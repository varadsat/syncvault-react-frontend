export interface Snippet {
  id: string;
  content: string;
  tags: string[];
  deviceId?: string;
  type: 'text' | 'code' | 'link';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSnippetRequest {
  content: string;
  tags: string;
  deviceId?: string;
  type?: 'text' | 'code' | 'link';
}

export interface SnippetFilters {
  tag?: string;
  type?: 'text' | 'code' | 'link';
  deviceId?: string;
  search?: string;
} 