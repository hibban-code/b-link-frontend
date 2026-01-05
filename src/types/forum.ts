import { User } from './user';

export interface ForumThread {
  id: number;
  title: string;
  content: string;
  user_id: number;
  replies_count: number;
  created_at: string;
  updated_at: string;
  user?: User;
  replies?: ForumReply[];
}

export interface ForumReply {
  id: number;
  content: string;
  thread_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface ThreadFilters {
  search?: string;
  user_id?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}
