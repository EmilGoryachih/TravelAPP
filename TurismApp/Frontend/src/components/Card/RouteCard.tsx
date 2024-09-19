// src/components/RouteCard.tsx
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fetchCityImage } from '../../API/Unsplash';
import Stack from "@mui/material/Stack";

interface RouteCardProps {
    title: string;
    description?: string;
    city: string;
    author_id: number;
    onButtonClick: () => void;
}

const RouteCard: React.FC<RouteCardProps> = ({
                                                 title,
                                                 description,
                                                 city,
                                                 author_id,
                                                 onButtonClick,
                                             }) => {
    const [cityImage, setCityImage] = React.useState<string | null>(null);

    React.useEffect(() => {
        const loadCityImage = async () => {
            const imageUrl = await fetchCityImage(`Город ${city} центр`);
            setCityImage(imageUrl);
        };

        loadCityImage();
    }, [city]);

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Stack>

                </Stack>
                <Typography variant="h5" component="div">
                    {city}
                </Typography>
                {/*<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>*/}
                {/*    {author_id}*/}
                {/*</Typography>*/}
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{description}</Typography>
                {cityImage && (
                    <Typography variant="body2">
                        <img src={cityImage} alt={city} style={{ width: '100%' }} />
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onButtonClick}>
                    {title}
                </Button>
            </CardActions>
        </Card>
    );
};

export default RouteCard;
