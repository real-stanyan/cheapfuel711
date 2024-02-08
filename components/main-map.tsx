"use client";

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

declare global {
  interface Window {
    global_fillHere: (storeId: string) => void;
    global_goHere: (Lat: number, Lng: number) => void;
  }
}

interface LatLng {
  latitude: number;
  longitude: number;
}

interface MainMapProps {
  userLatLng: LatLng;
  targetLatLng?: Store[];
  lockLatLng?: Store[];
  handleSetTargetStation: (newState: string) => void;
}

const MainMap: React.FC<MainMapProps> = ({
  userLatLng,
  targetLatLng,
  lockLatLng,
  handleSetTargetStation,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  // 定义点击处理函数

  window.global_fillHere = function (storeId: string) {
    handleSetTargetStation(storeId);
  };

  window.global_goHere = function (Lat, Lng) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${Lat},${Lng}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`,
      version: "weekly",
    });

    loader.load().then(() => {
      if (mapRef.current) {
        // 设置地图以用户位置为中心
        const userLocation = new google.maps.LatLng(
          userLatLng.latitude,
          userLatLng.longitude
        );
        const map = new google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 12,
        });

        // 添加用户位置标记
        const userMarker = new google.maps.Marker({
          map: map,
          position: userLocation,
          icon: {
            url: "/images/userLatLng.png",
            scaledSize: new google.maps.Size(40, 40),
          },
        });

        // 用户位置信息窗口
        const userInfoWindow = new google.maps.InfoWindow({
          content: "<div>用户位置</div>", // 自定义内容
        });

        userMarker.addListener("click", () => {
          userInfoWindow.open(map, userMarker);
        });

        // 添加目标位置标记
        targetLatLng?.forEach((store) => {
          const marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(
              store.location.y,
              store.location.x
            ),
            icon: {
              url: "/images/targetLatLng.png",
              scaledSize: new google.maps.Size(40, 40),
            },
          });
          const infoWindow = new google.maps.InfoWindow({
            content: `
                    <div style="display: flex; flex-direction: column; width: 6vw;">
                      <h1 style="white-space: nowrap;">${store.name}</h1>
                      <div style="width: 100%;">
                        ${
                          store.prices.E10
                            ? `<h1 style="display: flex; justify-content: space-between;">${store.prices.E10.type}<span>${store.prices.E10.amount}</span></h1>`
                            : ""
                        }
                        ${
                          store.prices.U91
                            ? `<h1 style="display: flex; justify-content: space-between;">${store.prices.U91.type}<span>${store.prices.U91.amount}</span></h1>`
                            : ""
                        }
                        ${
                          store.prices.U95
                            ? `<h1 style="display: flex; justify-content: space-between;">${store.prices.U95.type}<span>${store.prices.U95.amount}</span></h1>`
                            : ""
                        }
                        ${
                          store.prices.U98
                            ? `<h1 style="display: flex; justify-content: space-between;">${store.prices.U98.type}<span>${store.prices.U98.amount}</span></h1>`
                            : ""
                        }
                        ${
                          store.prices.PremDSL
                            ? `<h1 style="display: flex; justify-content: space-between;">${store.prices.PremDSL.type}<span>${store.prices.PremDSL.amount}</span></h1>`
                            : ""
                        }
                        ${
                          store.prices.LPG
                            ? `<h1 style="display: flex; justify-content: space-between;">${store.prices.LPG.type}<span>${store.prices.LPG.amount}</span></h1>`
                            : ""
                        }
                      </div>
                      <div style="display: flex; justify-content: space-between;">
                        <div style="padding: 0.3vw; border: 1px solid black;" onclick="window.global_fillHere('${
                          store.id
                        }')">
                          fill here
                        </div>
                        <div style="padding: 0.3vw; border: 1px solid black;" onclick="window.global_goHere('${
                          store.location.y
                        }','${store.location.x}')">
                          go here
                        </div>
                      </div>
                    </div>`,
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });
        });

        // 添加锁定位置标记（如果存在）
        lockLatLng?.forEach((store) => {
          new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(
              store.location.y,
              store.location.x
            ),
            icon: {
              url: "/images/lockLatLng.png",
              scaledSize: new google.maps.Size(40, 40),
            },
          });
        });
      }
    });
  }, [userLatLng, targetLatLng, lockLatLng]); // 依赖项包括所有坐标

  return <div style={{ width: "100%", height: "100%" }} ref={mapRef} />;
};

export default MainMap;
