import { type Handle } from '@sveltejs/kit';
import { minuteLimiter, dailyLimiter } from '$lib/server/ratelimit';

export const handle: Handle = async ({ event, resolve }) => {
  const isApi = event.url.pathname.startsWith('/api');

  if (isApi) {
    const ip = event.getClientAddress() || '127.0.0.1';
    
    try {
      const dailyCheck = await dailyLimiter.limit(ip);
      if (!dailyCheck.success) {
        return new Response('Access denied. This IP is blocked for 24 hours due to excessive form submissions.', {
          status: 403, // 403 Forbidden is ideal for a hard ban
          headers: { 
            'X-RateLimit-Reset': dailyCheck.reset.toString() 
          }
        });
      }

      const minuteCheck = await minuteLimiter.limit(ip);
      if (!minuteCheck.success) {
        return new Response('Too many requests. Please wait a minute before trying again.', {
          status: 429,
          headers: {
            'X-RateLimit-Limit': minuteCheck.limit.toString(),
            'X-RateLimit-Remaining': minuteCheck.remaining.toString(),
            'X-RateLimit-Reset': minuteCheck.reset.toString(),
          }
        });
      }

    } catch (err) {
      console.error('Rate limiter error:', err);
    }
  }

  return resolve(event);
};