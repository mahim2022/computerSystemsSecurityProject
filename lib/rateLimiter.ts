import { RateLimiterMemory } from 'rate-limiter-flexible'

const rateLimiter = new RateLimiterMemory({
  points: 5, // ⏱ Allow 5 requests
  duration: 60, // 🔒 Per 60 seconds per IP
})

export default rateLimiter
