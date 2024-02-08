function calculateBoundingBox(lat, lng, distance) {
  var earthRadius = 6371; // 地球半径，单位公里
  var maxLatitude = 90; // 最大纬度
  var minLatitude = -90; // 最小纬度
  var maxLongitude = 180; // 最大经度
  var minLongitude = -180; // 最小经度

  // 计算纬度差值
  var deltaLat = (distance / earthRadius) * (180 / Math.PI);
  // 计算经度差值，需要考虑纬度对经度差值的影响
  var deltaLng =
    (distance / (earthRadius * Math.cos((Math.PI * lat) / 180))) *
    (180 / Math.PI);

  // 计算北东角和南西角的纬度和经度
  var neLat = lat + deltaLat;
  var neLng = lng + deltaLng;
  var swLat = lat - deltaLat;
  var swLng = lng - deltaLng;

  // 确保计算结果不超出经纬度的范围
  neLat = Math.min(neLat, maxLatitude);
  neLng = Math.min(neLng, maxLongitude);
  swLat = Math.max(swLat, minLatitude);
  swLng = Math.max(swLng, minLongitude);

  return { neLat, neLng, swLat, swLng };
}

export default async function getLockStore(
  fuelType,
  targetLatLng,
  targetPrice
) {
  const { x: lng, y: lat } = targetLatLng;
  let timestamp = Date.now();
  console.log("====================================");
  console.log(targetPrice);
  console.log("====================================");
  let timestampForCacheBusting = timestamp - 1000; // 比实际时间戳小1000毫秒
  const box = calculateBoundingBox(lat, lng, 20);
  const { neLat, neLng, swLat, swLng } = box;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FUEL_API}?neLat=${neLat}&neLng=${neLng}&swLat=${swLat}&swLng=${swLng}&ts=${timestamp}&_=${timestampForCacheBusting}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    const filteredData = data.message.list.filter(
      (list) =>
        list.brand === "SEVENELEVEN" &&
        list.prices[fuelType] !== undefined &&
        list.prices[fuelType].amount + 25 <= targetPrice
    );
    return filteredData;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}
