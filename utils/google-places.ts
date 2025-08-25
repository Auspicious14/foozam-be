import axios from 'axios';
import dotenv from 'dotenv';
import redis from './redis';

dotenv.config();

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const CACHE_EXPIRATION = 86400; // 24 hours in seconds

export interface ILocation {
    name: string;
    address: string;
    rating: number;
    url: string;
}

export const getNearbyRestaurants = async (dish: string, lat: number, lon: number): Promise<ILocation[]> => {
    if (!GOOGLE_PLACES_API_KEY) {
        console.warn('Google Places API key is not configured. Skipping location search.');
        return [];
    }

    if (!redis) {
        console.warn('Redis client not available, skipping cache.');
        return fetchFromGooglePlaces(dish, lat, lon);
    }

    const cacheKey = `restaurants:${dish}:${lat}:${lon}`;

    try {
        const cachedResult = await redis.get(cacheKey);
        if (cachedResult) {
            console.log('Returning cached results');
            return JSON.parse(cachedResult);
        }
    } catch (error) {
        console.error('Redis error:', error);
    }

    const locations = await fetchFromGooglePlaces(dish, lat, lon);

    try {
        await redis.set(cacheKey, JSON.stringify(locations), 'EX', CACHE_EXPIRATION);
    } catch (error) {
        console.error('Redis error:', error);
    }

    return locations;
};

const fetchFromGooglePlaces = async (dish: string, lat: number, lon: number): Promise<ILocation[]> => {
    try {
        console.log('Fetching from Google Places API');
        const response = await axios.get(PLACES_API_URL, {
            params: {
                location: `${lat},${lon}`,
                radius: 5000, // 5km radius
                keyword: `${dish} restaurant`,
                type: 'restaurant',
                key: GOOGLE_PLACES_API_KEY,
            },
        });

        const { results } = response.data;

        const locations: ILocation[] = results.map((place: any) => ({
            name: place.name,
            address: place.vicinity,
            rating: place.rating,
            url: `https://www.google.com/maps/search/?api=1&query=${place.name}&query_place_id=${place.place_id}`,
        }));

        return locations;
    } catch (error) {
        console.error('Error fetching from Google Places API:', error);
        return [];
    }
};
