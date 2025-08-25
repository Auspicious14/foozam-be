import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

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

    try {
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
