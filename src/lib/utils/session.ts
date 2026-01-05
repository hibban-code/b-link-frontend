/**
 * Get or create session ID for tracking
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = localStorage.getItem('session_id');

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('session_id', sessionId);
  }

  return sessionId;
}

/**
 * Add session ID to request headers
 */
export function addSessionHeader(headers: Record<string, string> = {}): Record<string, string> {
  return {
    ...headers,
    'X-Session-ID': getSessionId(),
  };
}
