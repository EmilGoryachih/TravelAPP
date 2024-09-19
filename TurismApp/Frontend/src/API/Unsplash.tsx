import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'N-jUfmPDpu_Fn4TTlu5LzuU4jzKF-uj3p5xMFPi2vaM';

export const fetchCityImage = async (city: string): Promise<string | null> => {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: city,
                orientation: 'landscape',
                order_by: 'relevance',
            },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
        });

        if (response.data.results.length > 0) {
            return response.data.results[4].urls.regular;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching city image:', error);
        return null;
    }
};
