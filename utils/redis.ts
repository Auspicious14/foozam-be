import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const REDIS_URL = process.env.REDIS_URL;

let redis: Redis | undefined;

if (REDIS_URL) {
  redis = new Redis(REDIS_URL);
  console.log('Connected to Redis');

  redis.on('error', (err) => {
    console.error('Redis error:', err);
  });

} else {
  console.warn('REDIS_URL not found, Redis caching will be disabled.');
}

export default redis;
