"use client";

import { useEffect, useState } from "react";

// import components
import MainMap from "../components/main-map";
import Sidebar from "../components/sidebar";

interface LocationState {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  error?: {
    code: number;
    message: string;
  };
}

export default function Home() {
  const [location, setLocation] = useState<LocationState>({ loaded: false });

  const onSuccess = (location: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error: GeolocationPositionError) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation is not supported by your browser",
      } as GeolocationPositionError);
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  console.log(location);

  return (
    <main className="flex w-[100vw] h-[100vh]">
      <div className="w-[15%] h-[100%] p-[1vw]">
        <Sidebar />
      </div>
      <div className="w-[85%] h-[100%]">
        {location.loaded && location.coordinates ? (
          <MainMap
            latitude={location.coordinates.lat}
            longitude={location.coordinates.lng}
          />
        ) : (
          <div>Loading map or location not available...</div>
        )}
      </div>
    </main>
  );
}
