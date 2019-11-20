import { Feature } from "geojson";

export const deepCopy = (arr: Array<Feature>) => {
  return arr.map(geoObj => JSON.parse(JSON.stringify(geoObj)));
};
