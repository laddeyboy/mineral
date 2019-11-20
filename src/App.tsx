import React, { useState, useEffect } from "react";
import ReactMapboxGL from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { GeoJSON, Feature } from "geojson";

import { mbToken } from "./util/constants";
import AnnotationCard from "./containers/AnnotationCard";

const Map = ReactMapboxGL({ accessToken: mbToken });

const App: React.FC = () => {
  const [featuresArray, setFeatures] = useState<Array<Feature>>([]);
  const [activeFeatureID, setActiveFeatureID] = useState<string>("");
  const [showCard, toggleShowCard] = useState<boolean>(false);
  const [cardNotes, setCardNotes] = useState<Array<string>>([]);
  const [cardTitle, setCardTitle] = useState<string>("");

  useEffect(() => {
    console.log("featuresArray effect", featuresArray);
  }, [featuresArray]);

  const onDrawCreate = ({ features }: any) => {
    const { id } = features[0];
    const [newFeature] = features;
    newFeature.properties["nickName"] = `Feature ${id.slice(-4)}`;
    newFeature.properties["notes"] = ["a test", "a second test"];
    setFeatures(featuresArray => [...featuresArray, newFeature]);
    setActiveFeatureID(id);
    toggleShowCard(true);
  };

  const onDrawSelectionChange = ({ features }: any) => {
    toggleShowCard(true);
    if (features.length > 0) {
      const { id } = features[0];
      setCardTitle(id);
    }
  };

  const handleCloseAnnotationCard = (notes: Array<string>) => {
    setCardNotes(notes);
    toggleShowCard(false);
  };

  return (
    <div>
      {showCard ? (
        <AnnotationCard
          title={"something meaningful"}
          notes={cardNotes} //notes is now an array of objects???
          closeAnnotationCard={handleCloseAnnotationCard}
        />
      ) : null}
      <Map
        style="mapbox://styles/mapbox/streets-v10"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        zoom={[11]}
        center={[-95.3884096, 29.7640512]}
        //onStyleLoad={testingOnClick} //allows me to get the map Context
      >
        <DrawControl
          displayControlsDefault={false}
          controls={{ polygon: true, trash: true }}
          onDrawCreate={onDrawCreate}
          onDrawSelectionChange={onDrawSelectionChange}
        />
      </Map>
    </div>
  );
};

export default App;
