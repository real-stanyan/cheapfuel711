"use client";

import { useEffect, useState } from "react";

// import components
import MainMap from "../components/main-map";
import Sidebar from "../components/sidebar";

import MapLoading from "../components/map-loading";

import getFilteredData from "../actions/getFilteredData";
import getLockStore from "../actions/getLockStore";

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
  const [fuelType, setFuelType] = useState("E10");
  const [priceDiff, setPriceDiff] = useState("25");
  const [distance, setDistance] = useState("5");
  const [topNum, setTopNum] = useState("5");
  const [rule, setRule] = useState("nearest");
  const [store, setStore] = useState<Stores>();
  const [lockStore, setLockStore] = useState<Stores>();
  const [targetStationID, setTargetStationID] = useState("");
  const [targetStation, setTargetStation] = useState<Stores>();

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

  const handleSetFuelType = (value: string) => {
    setFuelType(value);
  };

  const handleSetPriceDiff = (value: string) => {
    setPriceDiff(value);
  };

  const handleSetDistance = (value: string) => {
    setDistance(value);
  };

  const handleSetTopNum = (value: string) => {
    setTopNum(value);
  };

  const handleSetRule = (value: string) => {
    setRule(value);
  };

  const handleSetTargetStationID = (value: string) => {
    setTargetStationID(value);
  };

  useEffect(() => {
    getFilteredData(
      fuelType,
      priceDiff,
      topNum,
      rule,
      location.coordinates,
      distance
    )
      .then((data) => {
        setStore(data);
      })
      .catch((error) => console.error("Failed to fetch data: ", error));
  }, [fuelType, priceDiff, distance, topNum, rule, location]);

  useEffect(() => {
    // 假设 store 是 Store[] 类型，targetStationID 是选中的站点ID
    const target = store?.find((store) => store.id === targetStationID);

    // 假设 setTargetStation 期望的是 Store 类型或 undefined
    // 直接将找到的 store 对象（或 undefined）设置为目标站点
    setTargetStation(target ? [target] : undefined);

    // 如果你需要单独处理 Location，确保 getLockStore 函数接收正确的参数
    // 例如，这里传递整个 target 对象而不是 target?.location
    if (target) {
      getLockStore(fuelType, target.location, target.prices[fuelType].amount)
        .then((data) => {
          setLockStore(data);
        })
        .catch((error) => console.error("Failed to fetch data: ", error));
    }
  }, [targetStationID, store]); // 假设 store 也是一个依赖项

  console.log(location);
  console.log(store);
  console.log(targetStation);

  return (
    <main className="flex w-[100vw] h-[100vh]">
      <div className="w-[15%] h-[100%] p-[1vw]">
        <Sidebar
          handleSetFuelType={handleSetFuelType}
          handleSetPriceDiff={handleSetPriceDiff}
          handleSetDistance={handleSetDistance}
          handleSetTopNum={handleSetTopNum}
          handleSetRule={handleSetRule}
          fuelType={fuelType}
          priceDiff={priceDiff}
          distance={distance}
          topNum={topNum}
          rule={rule}
          targetStation={targetStation}
        />
      </div>
      <div className="w-[85%] h-[100%]">
        {location.loaded && location.coordinates ? (
          <MainMap
            userLatLng={{
              latitude: location.coordinates.lat,
              longitude: location.coordinates.lng,
            }}
            targetLatLng={store}
            lockLatLng={lockStore}
            handleSetTargetStation={handleSetTargetStationID}
          />
        ) : (
          <MapLoading />
        )}
      </div>
    </main>
  );
}
