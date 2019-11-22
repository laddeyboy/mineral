import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Feature } from "geojson";

import {
  getFeatureNotesByID,
  deleteFeatureFromFeaturesArray
} from "./util/helpers";

// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

describe("testing the app helper functionality", () => {
  const feature: any = {
    id: "fcbd4f085c4bc06dfb17236aca85dcef",
    geometry: {
      type: "Polygon",
      coordinates: [
        [-95.50325106118179, 29.855504796254564],
        [-95.44351290200231, 29.88468083351347],
        [-95.44866274331049, 29.826915917369718],
        [-95.50325106118179, 29.855504796254564]
      ]
    },
    type: "Feature",
    properties: {
      nickName: "Test Data",
      notes: ["a test", "a second test", "a third test"]
    }
  };

  it("should return an array of notes", () => {
    const testID = "fcbd4f085c4bc06dfb17236aca85dcef";
    const notes = getFeatureNotesByID(testID, [feature]);
    expect(notes).toBeTruthy();
  });
  it("should delete a feature from featuresArray", () => {
    const testID = "fcbd4f085c4bc06dfb17236aca85dcef";
    const updatedFeatureArray = deleteFeatureFromFeaturesArray(testID, [
      feature
    ]);
    expect([feature]).toHaveLength(1);
    expect(updatedFeatureArray).toHaveLength(0);
  });
});
