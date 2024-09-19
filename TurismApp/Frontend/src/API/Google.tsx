import axios from 'axios';

const GOOGLE_PLACES_API_KEY = 'YOUR_API_KEY_HERE';

export const getCityImage = async (city: string) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
            {
                params: {
                    input: city,
                    inputtype: 'textquery',
                    fields: 'photos',
                    key: GOOGLE_PLACES_API_KEY,
                },
            }
        );

        const placeId = response.data.candidates[0]?.place_id;

        if (!placeId) {
            throw new Error('No place found for the provided city.');
        }

        const photoResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json`,
            {
                params: {
                    place_id: placeId,
                    fields: 'photos',
                    key: GOOGLE_PLACES_API_KEY,
                },
            }
        );

        const photoReference = photoResponse.data.result.photos[0]?.photo_reference;

        if (!photoReference) {
            throw new Error('No photo found for the provided place.');
        }

        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`;
    } catch (error) {
        console.error('Error fetching city image:', error);
        return '';
    }
};
