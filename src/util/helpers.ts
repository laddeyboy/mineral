import { Feature } from "geojson";

export const deepCopy = (arr: Array<Feature>) => {
  return arr.map(geoObj => JSON.parse(JSON.stringify(geoObj)));
};

export const getFeatureNotesByID = (
  id: string,
  featuresArray: Array<Feature>
) => {
  return featuresArray
    .filter(feature => feature.id === id)
    .map(feat => feat.properties && feat.properties.notes)[0];
};

export const deleteFeatureFromFeaturesArray = (
  id: string,
  featuresArray: Array<Feature>
) => {
  return featuresArray.filter(feature => feature.id !== id);
};
