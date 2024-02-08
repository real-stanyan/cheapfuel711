"use client";

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface MainMapProps {
  latitude: number;
  longitude: number;
}

const MainMap: React.FC<MainMapProps> = ({ latitude, longitude }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`,
      version: "weekly",
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const location = new google.maps.LatLng(latitude, longitude);
        const map = new google.maps.Map(mapRef.current, {
          center: location,
          zoom: 12,
        });
        new google.maps.Marker({
          map: map,
          position: location,
        });
      }
    });
  }, [latitude, longitude]);

  return <div style={{ width: "100%", height: "100%" }} ref={mapRef} />;
};

export default MainMap;
