'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { forumApi } from '@/lib/api/forum';
import { ThreadFilters } from '@/types/forum';
import toast from 'react-hot-toast';

export function useThreads(filters?: ThreadFilters, page: number = 1) {
  return useQuery({
    queryKey: ['threads', filters, page],
    queryFn: () => forumApi.getThreads(filters, page),
  });
}

export function useThread(id: number) {
  return useQuery({
    queryKey: ['thread', id],
    queryFn: () => forumApi.getThread(id),
    enabled: !!id,
  });
}

export function useCreateThread() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: forumApi.createThread,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threads'] });
      toast.success('Thread created successfully!');
    },
    onError: () => {
      toast.error('Failed to create thread');
    },
  });
}

export function useCreateReply() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ threadId, content }: { threadId: number; content: string }) =>
      forumApi.createReply(threadId, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['thread', variables.threadId] });
      toast.success('Reply posted successfully!');
    },
    onError: () => {
      toast.error('Failed to post reply');
    },
  });
}
