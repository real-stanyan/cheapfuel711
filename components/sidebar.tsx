import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SidebarProps {
  handleSetFuelType: (newState: string) => void;
  handleSetPriceDiff: (newState: string) => void;
  handleSetDistance: (newState: string) => void;
  handleSetTopNum: (newState: string) => void;
  handleSetRule: (newState: string) => void;
  fuelType: string;
  priceDiff: string;
  distance: string;
  topNum: string;
  rule: string;
  targetStation?: Store | any;
}

export default function Sidebar({
  handleSetFuelType,
  handleSetPriceDiff,
  handleSetDistance,
  handleSetTopNum,
  handleSetRule,
  fuelType,
  priceDiff,
  distance,
  topNum,
  rule,
  targetStation,
}: SidebarProps) {
  return (
    <>
      <div className="w-[100%] flex justify-center ">
        {/* fuel type */}
        <Select
          value={fuelType}
          onValueChange={(value) => handleSetFuelType(value)}
        >
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
          onValueChange={(value) => handleSetPriceDiff(value)}
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
      <Select
        value={distance}
        onValueChange={(value) => handleSetDistance(value)}
      >
        <SelectTrigger className="w-[100%]">
          <SelectValue placeholder="Distance" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5km</SelectItem>
          <SelectItem value="10">10km</SelectItem>
          <SelectItem value="15">15km</SelectItem>
          <SelectItem value="20">20km</SelectItem>
        </SelectContent>
      </Select>

      <div className="text-center mt-5">
        <h1>Target Station</h1>
        {targetStation ? (
          <div>
            <h1>{targetStation[0].name}</h1>
            <h1>
              {targetStation[0].state} {targetStation[0].postCode}
            </h1>
            <h1>{targetStation[0].suburb}</h1>
          </div>
        ) : (
          "Target Station net set"
        )}
      </div>
      {/* <h1 className="flex items-center text-center text-[0.8vw]">
        Top
        <Select
          value={topNum}
          onValueChange={(value) => handleSetTopNum(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="rank" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="15">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
        <Select value={rule} onValueChange={(value) => handleSetRule(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="rule" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nearest">nearest</SelectItem>
            <SelectItem value="cheapest">cheapest</SelectItem>
          </SelectContent>
        </Select>
        station
      </h1> */}
    </>
  );
}
