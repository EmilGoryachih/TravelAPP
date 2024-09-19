import axios from 'axios';

interface WikiThumbnail {
    source: string;
    width: number;
    height: number;
}

interface WikiPage {
    pageid: number;
    ns: number;     
    title: string;
    thumbnail?: WikiThumbnail;
}

interface WikiQueryResponse {
    query: {
        pages: {
            [key: string]: WikiPage;
        };
    };
}


export const getWikiImage = async (city: string): Promise<string | null> => {
    try {
        const response = await axios.get<WikiQueryResponse>(
            `https://en.wikipedia.org/w/api.php`,
            {
                params: {
                    action: 'query',
                    titles: city,
                    prop: 'pageimages|pageterms',
                    format: 'json',
                    origin: '*',
                    pithumbsize: 500,
                },
            }
        );

        const pages = response.data.query.pages;
        const page: WikiPage = Object.values(pages)[0];

        if (page.thumbnail) {
            return page.thumbnail.source;
        } else {
            console.warn(`No thumbnail found for city: ${city}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching Wikipedia image:', error);
        return null;
    }
};
