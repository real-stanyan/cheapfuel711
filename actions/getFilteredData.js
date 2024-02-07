export default async function getFilteredData(fuelType, topNear) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_FUEL_API);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    const filteredData = data.regions.find((region) => region.region === "All");
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}
