'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { visitsApi } from '@/lib/api/visits';
import toast from 'react-hot-toast';

export function useVisitHistory() {
  return useQuery({
    queryKey: ['visit-history'],
    queryFn: () => visitsApi.getHistory(),
  });
}

export function useVisitStamps() {
  return useQuery({
    queryKey: ['visit-stamps'],
    queryFn: () => visitsApi.getStamps(),
  });
}

export function useCheckIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ libraryId, notes }: { libraryId: number; notes?: string }) =>
      visitsApi.checkIn(libraryId, notes),
    onSuccess: (response) => {
      // Show success message
      toast.success(response.data.message || 'Check-in berhasil!');

      // Show new badges if earned
      if (response.data.new_badges && response.data.new_badges.length > 0) {
        response.data.new_badges.forEach((badge: any) => {
          toast.success(`🎉 Badge baru: ${badge.icon} ${badge.name}!`, {
            duration: 5000,
          });
        });
      }

      // Show points earned
      if (response.data.points_earned > 0) {
        toast.success(`+${response.data.points_earned} poin! 🌟`);
      }

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['visit-history'] });
      queryClient.invalidateQueries({ queryKey: ['visit-stamps'] });
      queryClient.invalidateQueries({ queryKey: ['badges'] });
      queryClient.invalidateQueries({ queryKey: ['my-badges'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Check-in gagal');
    },
  });
}
