import { api } from './client';
import { ForumThread, ForumReply, ThreadFilters } from '@/types/forum';

export const forumApi = {
  getThreads: async (filters?: ThreadFilters, page: number = 1) => {
    const params = new URLSearchParams({
      page: page.toString(),
      ...filters,
    });
    return api.get<ForumThread[]>(`/forum/threads?${params}`);
  },

  getThread: async (id: number) => {
    return api.get<ForumThread>(`/forum/threads/${id}`);
  },

  createThread: async (data: { title: string; content: string }) => {
    return api.post<ForumThread>('/forum/threads', data);
  },

  createReply: async (threadId: number, content: string) => {
    return api.post<ForumReply>(`/forum/threads/${threadId}/replies`, { content });
  },
};
