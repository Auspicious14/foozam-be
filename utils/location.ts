import axios from 'axios';
import dotenv from 'dotenv';
import redis from './redis';

dotenv.config();

const FOURSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY;
const FOURSQUARE_API_URL = 'https://api.foursquare.com/v3/places/search';
const CACHE_EXPIRATION = 86400; // 24 hours in seconds

export interface ILocation {
    name: string;
    address: string;
    rating: number;
    url: string;
}

export const getNearbyRestaurants = async (dish: string, lat: number, lon: number): Promise<ILocation[]> => {
    if (!FOURSQUARE_API_KEY) {
        console.warn('Foursquare API key is not configured. Skipping location search.');
        return [];
    }

    if (!redis) {
        console.warn('Redis client not available, skipping cache.');
        return fetchFromFoursquare(dish, lat, lon);
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

    const locations = await fetchFromFoursquare(dish, lat, lon);

    try {
        await redis.set(cacheKey, JSON.stringify(locations), 'EX', CACHE_EXPIRATION);
    } catch (error) {
        console.error('Redis error:', error);
    }

    return locations;
};

const fetchFromFoursquare = async (dish: string, lat: number, lon: number): Promise<ILocation[]> => {
    try {
        console.log('Fetching from Foursquare API');
        const response = await axios.get(FOURSQUARE_API_URL, {
            headers: {
                Authorization: FOURSQUARE_API_KEY!,
            },
            params: {
                ll: `${lat},${lon}`,
                query: `${dish} restaurant`,
                radius: 5000,
                categories: '13000', // Dining and Drinking
                fields: 'fsq_id,name,location,rating,link',
                limit: 20,
            },
        });

        const { results } = response.data;

        const locations: ILocation[] = results.map((place: any) => ({
            name: place.name || 'No name provided',
            address: place.location?.formatted_address || 'No address provided',
            rating: place.rating ? place.rating / 2 : 0, // Foursquare rating is out of 10, converting to 5-star scale
            url: place.link ? `https://foursquare.com${place.link}` : 'No URL provided',
        }));

        return locations;
    } catch (error) {
        console.error('Error fetching from Foursquare API:', error);
        return [];
    }
};


/*
const fetchFromGooglePlaces = async (dish: string, lat: number, lon: number): Promise<ILocation[]> => {
    try {
        console.log('Fetching from Google Places API');
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
            params: {
                location: `${lat},${lon}`,
                radius: 5000, // 5km radius
                keyword: `${dish} restaurant`,
                type: 'restaurant',
                key: process.env.GOOGLE_PLACES_API_KEY,
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
*/
