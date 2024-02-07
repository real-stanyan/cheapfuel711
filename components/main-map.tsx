// "use client";

// import { useEffect, useRef } from "react";
// import { Loader } from "@googlemaps/js-api-loader";

// function MainMap({ address }) {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const loader = new Loader({
//       apiKey: "AIzaSyBzhFxMyry53A027xF9edMUyTuBgNoO378", // 请替换为你的API密钥
//       version: "weekly",
//     });

//     loader.load().then(() => {
//       const geocoder = new google.maps.Geocoder();
//       geocoder.geocode({ address: address }, (results, status) => {
//         if (status === "OK") {
//           const map = new google.maps.Map(mapRef.current, {
//             center: results[0].geometry.location,
//             zoom: 8,
//           });
//           new google.maps.Marker({
//             map: map,
//             position: results[0].geometry.location,
//           });
//         } else {
//           console.error(
//             `Geocode was not successful for the following reason: ${status}`
//           );
//         }
//       });
//     });
//   }, [address]);

//   return <div style={{ width: "100%", height: "100%" }} ref={mapRef} />;
// }

// export default MainMap;
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
