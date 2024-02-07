import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import getFilteredData from "../actions/getFilteredData";

export default function Sidebar() {
  const [fuelType, setFuelType] = useState("E10");
  const [priceDiff, setPriceDiff] = useState("25");
  const [topNear, setTopNear] = useState(5);

  useEffect(() => {
    getFilteredData()
      .then((data) => console.log(data))
      .catch((error) => console.error("Failed to fetch data: ", error));
  }, [fuelType, priceDiff, topNear]);

  return (
    <>
      <div className="w-[100%] flex justify-center mb-5">
        {/* fuel type */}
        <Select value={fuelType} onValueChange={(value) => setFuelType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="fuel type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="E10">E10</SelectItem>
            <SelectItem value="91">91</SelectItem>
            <SelectItem value="95">95</SelectItem>
            <SelectItem value="98">98</SelectItem>
            <SelectItem value="diesel">diesel</SelectItem>
          </SelectContent>
        </Select>
        {/* price diff */}
        <Select
          value={priceDiff}
          onValueChange={(value) => setPriceDiff(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="price diff" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">$0.10</SelectItem>
            <SelectItem value="15">$0.15</SelectItem>
            <SelectItem value="20">$0.20</SelectItem>
            <SelectItem value="25">$0.25</SelectItem>
            <SelectItem value="30">$0.30</SelectItem>
            <SelectItem value="35">$0.35</SelectItem>
            <SelectItem value="40">$0.40</SelectItem>
            <SelectItem value="45">$0.45</SelectItem>
            <SelectItem value="50">$0.50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <h1 className="flex items-center text-center text-[1vw]">
        Top{" "}
        <input
          style={{ width: "3vw", textAlign: "center" }}
          type="number"
          defaultValue={topNear}
          onChange={(e) => {
            setTopNear(Number(e.target.value));
            console.log(topNear);
          }}
        />
        Nearest station
      </h1>
    </>
  );
}
