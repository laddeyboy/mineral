import React from "react";
import ReactMapboxGL from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { Feature, FeatureCollection } from "geojson";
import "./App.css";

import { mbToken } from "./util/constants";
import AnnotationCard from "./containers/AnnotationCard";
import {
  deepCopy,
  getFeatureNotesByID,
  getFeatureNameByID,
  deleteFeatureFromFeaturesArray
} from "./util/helpers";

const Map = ReactMapboxGL({ accessToken: mbToken });

interface StateProps {
  showCard: boolean;
  cardNotes: Array<string>;
  featuresArray: Array<Feature>;
  activeFeatureID: string;
}

class App extends React.Component<{}, StateProps> {
  constructor(props: {}) {
    super(props);
    this.state = {
      showCard: false,
      cardNotes: [],
      featuresArray: [],
      activeFeatureID: ""
    };
  }
  // componentDidUpdate(PrevState: StateProps) {
  //   if (PrevState.featuresArray !== this.state.featuresArray) {
  //     console.log("checking features", this.state.featuresArray);
  //   }
  // }

  addCustomPropertiesToFeature = (feat: Feature): Feature => {
    const lengthID = this.state.featuresArray.length;
    const newFeature = { ...feat };
    if (newFeature.properties) {
      newFeature.properties["nickName"] = `Feature ${lengthID + 1}`;
      newFeature.properties["notes"] = [];
    }
    return newFeature;
  };

  onDrawCreate = ({ features }: FeatureCollection) => {
    const newFeature = this.addCustomPropertiesToFeature(features[0]);
    const newFeaturesArray = deepCopy(this.state.featuresArray);
    newFeaturesArray.push(newFeature);
    this.setState({
      featuresArray: newFeaturesArray,
      activeFeatureID: newFeature.id as string,
      showCard: true
    });
  };

  onDrawSelectionChange = ({ features }: FeatureCollection) => {
    if (features.length > 0) {
      this.setState({ showCard: true });
      const { id } = features[0];
      this.setState({ activeFeatureID: id as string });
    }
  };

  onDrawDelete = ({ features }: FeatureCollection) => {
    console.log("deleting the feature");
    const { featuresArray } = this.state;
    const updatedFeatures = deleteFeatureFromFeaturesArray(
      features[0].id as string,
      featuresArray
    );
    this.setState({ featuresArray: updatedFeatures, showCard: false });
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

  // loadGeoJSONData = () => {
  //   console.log("open file and draw shapes");
  // };

  // saveGeoJSONData = () => {
  //   console.log("open file and save shapes");
  // };

  render() {
    const { showCard, activeFeatureID, featuresArray } = this.state;
    return (
      <div>
        {showCard ? (
          <AnnotationCard
            title={getFeatureNameByID(activeFeatureID, featuresArray)}
            notes={getFeatureNotesByID(activeFeatureID, featuresArray)}
            updateNotes={this.updateNotes}
            closeAnnotationCard={() => this.setState({ showCard: false })}
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
            onDrawDelete={this.onDrawDelete}
          />
        </Map>
        {/* <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            className="import-btn"
            onClick={this.loadGeoJSONData}
          >
            Load GeoJSON
          </button>
          <button
            type="button"
            className="export-btn"
            onClick={this.saveGeoJSONData}
          >
            Save GeoJSON
          </button>
        </div> */}
      </div>
    );
  }
}
export default App;
