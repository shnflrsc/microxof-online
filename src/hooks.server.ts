import { type Handle } from '@sveltejs/kit';
import { ratelimit } from '$lib/server/ratelimit';

export const handle: Handle = async ({ event, resolve }) => {
  const isApiOrAction = event.url.pathname.startsWith('/api') || event.request.method === 'POST';

  if (isApiOrAction) {
    const ip = event.getClientAddress() || '127.0.0.1';
    
    try {
      const { success, limit, reset, remaining } = await ratelimit.limit(ip);

      if (!success) {
        return new Response('Too many requests. Please slow down.', {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          }
        });
      }
    } catch (err) {
      console.error('Rate limiter error:', err);
    }
  }

  return resolve(event);
};