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
import {useEffect, useState} from "react";
import {Path} from "../../models/path.ts";
import Tts from "../../API/Tts.ts";
import Dictafon from "../dictafon.tsx";

const YMap = () => {
  const [mapState] = useState({
    center: [54.50302, 36.25075],
    zoom: 12,
  });
  const [path, setPath] = useState<Path>();
  const [status, setStatus] = useState(0);

  useEffect(() => {
    fetch("/path.json")
    .then((response) => response.json())
    .then((data) => data.result as Path[])
    .then((data) => setPath(data[0]));
  }, []);

  function onCafe() {
    if (status >= 1) {
      return;
    }
    setStatus(1);
    fetch("/path_with_cafe.json")
    .then((response) => response.json())
    .then((data) => data.result as Path[])
    .then((data) => setPath(data[0]));
    Tts("Кафе добавлено в маршрут").then();
  }

  function onGasStation() {
    if (status >= 2) {
      return;
    }
    setStatus(2);
    fetch("/path_with_cafe_azs.json")
    .then((response) => response.json())
    .then((data) => data.result as Path[])
    .then((data) => setPath(data[0]));
    Tts("Заправка добавлена в маршрут").then();
  }

  return (
    <div id="map">
      <Dictafon onCafe={onCafe} onGasStation={onGasStation}/>
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
          {path?.waypoints.map((waypoint, index) => (
            <Placemark key={index} geometry={[waypoint.original_point.lat, waypoint.original_point.lon]}/>
          ))}
          {path?.maneuvers.map((maneuver, i) => (
            maneuver?.outcoming_path?.geometry.map((geometry, j) => (
              <GeoObject
                key={i + " " + j}
                geometry={{
                  type: "LineString",
                  coordinates: geometry.selection.replace("LINESTRING(", "").replace(")", "")
                  .split(", ").map((point) => point.split(" ").map((coord) => parseFloat(coord)).reverse()),
                }}
                options={{
                  strokeColor: "#ff0000",
                  strokeWidth: 3,
                }}
              />
            ))
          ))}
        </Map>
      </YMaps>
    </div>
  )
}
export default YMap;