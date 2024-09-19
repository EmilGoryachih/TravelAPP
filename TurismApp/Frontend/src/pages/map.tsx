import {
    FullscreenControl,
    GeolocationControl,
    GeoObject,
    Map,
    Placemark,
    SearchControl,
    YMaps,
    ZoomControl
} from "@pbe/react-yandex-maps";
import {useState} from "react";

const YanMap = () => {
    const [coords, setCoords] = useState();
    const [mapState, setMapState] = useState({
        center: [55.75, 37.57],
        zoom: 9,
    });

    const onMapClick = (e: any) => {
    }

    return (
        <div>
            <YMaps query={{apikey: "db0e13bf-cb5d-49a0-b541-24a5e6111641"}}>
                <Map
                    modules={["Placemark", "geocode", "geoObject.addon.balloon"]}
                    state={mapState}
                    width='100%'
                    height='100vh'
                >
                    <ZoomControl/>
                    <FullscreenControl/>
                    <SearchControl/>
                    <GeolocationControl/>
                </Map>
            </YMaps>
        </div>
    )
}
export default YanMap;
