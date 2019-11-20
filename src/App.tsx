import React from "react";
import ReactMapboxGL from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { Feature } from "geojson";

import { mbToken } from "./util/constants";
import AnnotationCard from "./containers/AnnotationCard";
import { deepCopy } from "./util/helpers";

const Map = ReactMapboxGL({ accessToken: mbToken });

interface StateProps {
  showCard: boolean;
  cardNotes: Array<string>;
  featuresArray: Array<any>;
  activeFeatureID: string;
}

class App extends React.Component<{}, StateProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      showCard: false,
      cardNotes: [],
      featuresArray: [],
      activeFeatureID: ""
    };
  }

  addCustomPropertiesToFeature = (feat: Feature): Feature => {
    const newFeature = { ...feat };
    if (newFeature.properties) {
      newFeature.properties["nickName"] = `Feature`;
      newFeature.properties["notes"] = [];
    }
    return newFeature;
  };

  onDrawCreate = ({ features }: any) => {
    const newFeature = this.addCustomPropertiesToFeature(features[0]);
    console.log(newFeature, newFeature.id);
    const newFeaturesArray = deepCopy(this.state.featuresArray);
    newFeaturesArray.push(newFeature);
    this.setState({ featuresArray: newFeaturesArray });
    this.setState({ activeFeatureID: newFeature.id as string });
    this.setState({ showCard: true });
  };

  getFeatureNotesByID = (id: string) => {
    const { featuresArray } = this.state;
    return featuresArray
      .filter(item => item.id === id)
      .map(feat => feat.properties && feat.properties.notes)[0];
  };

  onDrawSelectionChange = ({ features }: any) => {
    this.setState({ showCard: true });
    if (features.length > 0) {
      const { id } = features[0];
      this.setState({ activeFeatureID: id });
    }
  };

  updateNotes = (note: string) => {
    const { featuresArray, activeFeatureID } = this.state;
    const updatedFeatures = deepCopy(featuresArray);
    updatedFeatures.map(feat => {
      if (feat.properties && feat.id === activeFeatureID) {
        feat.properties.notes.push(note);
      }
    });
    this.setState({ featuresArray: updatedFeatures });
  };

  handleCloseAnnotationCard = () => {
    this.setState({ showCard: false });
  };

  render() {
    const { showCard, activeFeatureID } = this.state;
    return (
      <div>
        {showCard ? (
          <AnnotationCard
            title={"Title"}
            notes={this.getFeatureNotesByID(activeFeatureID)}
            updateNotes={this.updateNotes}
            closeAnnotationCard={this.handleCloseAnnotationCard}
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
        >
          <DrawControl
            displayControlsDefault={false}
            controls={{ polygon: true, trash: true }}
            onDrawCreate={this.onDrawCreate}
            onDrawSelectionChange={this.onDrawSelectionChange}
          />
        </Map>
      </div>
    );
  }
}
export default App;
