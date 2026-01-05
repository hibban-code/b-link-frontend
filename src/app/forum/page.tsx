'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { useThreads } from '@/lib/hooks/useForum';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatRelativeTime } from '@/lib/utils/formatters';
import { useAuth } from '@/lib/hooks/useAuth';

export default function ForumPage() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useThreads({ search });
  const { isAuthenticated } = useAuth();

  return (
    <Container>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Forum Diskusi</h1>
          <p className="text-gray-600">
            Bergabung dalam diskusi dengan komunitas
          </p>
        </div>
        {isAuthenticated && (
          <Link href="/forum/new">
            <Button>Create Thread</Button>
          </Link>
        )}
      </div>

      {isLoading && <LoadingSpinner size="lg" />}

      {data && (
        <div className="space-y-4">
          {data.data.map((thread) => (
            <Link key={thread.id} href={`/forum/${thread.id}`}>
              <Card hover>
                <h3 className="text-xl font-semibold mb-2">{thread.title}</h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{thread.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>👤 {thread.user?.name}</span>
                  <span>💬 {thread.replies_count} replies</span>
                  <span>{formatRelativeTime(thread.created_at)}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
