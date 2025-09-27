export function calculateDistance(
  myLat: number,
  myLng: number,
  storeLat: number,
  storeLng: number
): number {
  const earthRadius = 6371000;
  const toRad = (degree: number) => (degree * Math.PI) / 180;

  const dLat = toRad(storeLat - myLat);
  const dLng = toRad(storeLng - myLng);

  const lat1Rad = toRad(myLat);
  const lat2Rad = toRad(storeLat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.floor(earthRadius * c);
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters}m`;
  } else {
    const km = (meters / 1000).toFixed(1);
    return `${km}km`;
  }
}
