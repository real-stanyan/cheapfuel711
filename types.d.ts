interface Location {
  x: number;
  y: number;
}

interface PriceInfo {
  type: string;
  updated: number;
  relevant: boolean;
  reportedBy: string;
  amount: number;
}

interface Store {
  id: string;
  name: string;
  brand: string;
  state: string;
  suburb: string;
  address: string;
  postCode: string;
  country: string;
  phone: string;
  location: Location;
  open24: boolean;
  prices: {
    [fuelType: string]: PriceInfo;
  };
  icon: string;
  brandIcon: string;
  autoUpdated: boolean;
  restrooms?: boolean;
  mappingOption?: string;
  locationChecked?: boolean;
}

type Stores = Store[];
