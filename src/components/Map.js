import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import floridaOutline from "../json/fl-state_outline.json";
import georgiaOutline from "../json/ge-state_outline.json";
import pennsylvaniaOutline from "../json/pl-state_outline.json";

import florida from "../json/florida.json";
import georgia from "../json/georgia.json";
import pennsylvania from "../json/pennsylvania.json";

const Map = () => {
  const [currentState, setCurrentState] = useState("");
  const floridaRef = useRef();
  const georgiaRef = useRef();
  const pennsylvaniaRef = useRef();

  useEffect(() => {
    if (currentState === "florida") {
      georgiaRef.current.clearLayers().addData(georgiaOutline);
      pennsylvaniaRef.current.clearLayers().addData(pennsylvaniaOutline);
    }

    if (currentState === "georgia") {
      floridaRef.current.clearLayers().addData(floridaOutline);
      pennsylvaniaRef.current.clearLayers().addData(pennsylvaniaOutline);
    }

    if (currentState === "pennsylvania") {
      floridaRef.current.clearLayers().addData(floridaOutline);
      georgiaRef.current.clearLayers().addData(georgiaOutline);
    }
  }, [currentState]);

  const tileLayerOptions = {
    detectRetina: true,
    maxZoom: 20,
    maxNativeZoom: 17,
    minZoom: 3,
    noWrap: true,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  };

  const floridaOptions = {
    style: {
      fillColor: "red",
      fillOpacity: 0.5,
      color: "red",
      weight: 1,
    },
  };

  const georgiaOptions = {
    style: {
      fillColor: "purple",
      fillOpacity: 0.5,
      color: "purple",
      weight: 1,
    },
  };

  const pennsylvaniaOptions = {
    style: {
      fillColor: "blue",
      fillOpacity: 0.5,
      color: "blue",
      weight: 1,
    },
  };

  const handleFloridaClicked = (feature, layer) => {
    layer.on({
      click: (event) => {
        if (!floridaRef.current) return;

        const map = event.target._map;
        map.flyTo([27.8, -83.5], 7);

        floridaRef.current.clearLayers().addData(florida);
        setCurrentState("florida");
      },
    });
  };

  const handleGeorgiaClicked = (feature, layer) => {
    layer.on({
      click: (event) => {
        if (!georgiaRef.current) return;

        setCurrentState("georgia");

        const map = event.target._map;
        map.flyTo([32.7, -83.2], 7);

        georgiaRef.current.clearLayers().addData(georgia);
      },
    });
  };

  const handlePennsylvaniaClicked = (feature, layer) => {
    layer.on({
      click: (event) => {
        if (!pennsylvaniaRef) return;

        setCurrentState("pennsylvania");

        const map = event.target._map;
        map.flyTo([41.203323, -77.194527], 7);
        pennsylvaniaRef.current.clearLayers().addData(pennsylvania);
      },
    });
  };

  return (
    <MapContainer center={[38.5, -96]} zoom={5} style={{ height: "100vh" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        style={{ border: "none" }}
        {...tileLayerOptions}
      />
      <GeoJSON
        ref={floridaRef}
        data={floridaOutline}
        {...floridaOptions}
        onEachFeature={handleFloridaClicked}
      />
      <GeoJSON
        ref={georgiaRef}
        data={georgiaOutline}
        {...georgiaOptions}
        onEachFeature={handleGeorgiaClicked}
      />
      <GeoJSON
        ref={pennsylvaniaRef}
        data={pennsylvaniaOutline}
        style={pennsylvaniaOptions.style}
        onEachFeature={handlePennsylvaniaClicked}
      />
    </MapContainer>
  );
};

export default Map;
