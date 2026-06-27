import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "$env/dynamic/private";

// Reuse the same Redis client instance for both limiters
const redisClient = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

// 1. Your current short-term limiter (5 requests per 60 seconds)
export const minuteLimiter = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  prefix: "@upstash/minute",
});

// 2. The new 24-hour ban limiter (5 requests per 1 day)
export const dailyLimiter = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.slidingWindow(5, "1 d"),
  prefix: "@upstash/daily",
});