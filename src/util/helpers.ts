import { Feature } from "geojson";

const didGetLocation = (position: Position) => {
  const { longitude, latitude } = position.coords;
  return { longitude, latitude };
  // return { longitude: -46.8182, latitude: 8.2275 }; //switzerland geoloc for testing
};
const didNOTGetLocation = () => {
  console.log("ERROR, retrieving coordinates");
  // return HOUSTON coordinates by default
  const HTX_LONGITUDE = -95.4884096;
  const HTX_LATITUDE = 29.6640512;
  return { longitude: HTX_LONGITUDE, latitude: HTX_LATITUDE };
};

export const getBroswerLocation = () => {
  const getLocation = navigator.geolocation.getCurrentPosition(
    didGetLocation,
    didNOTGetLocation,
    { timeout: 2000 }
  );
  console.log("getLocation", typeof getLocation);
};

export const deepCopy = (arr: Array<Feature>) => {
  console.log("calling deep copy", arr);
  return arr.map(geoObj => JSON.parse(JSON.stringify(geoObj)));
};
