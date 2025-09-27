export function calculateDistance(
  myLat: number,
  myLng: number,
  storeLat: number,
  storeLng: number
): number {
  // 지구 반지름 (미터)
  const earthRadius = 6371000;

  // 라디안으로 변환
  const toRad = (degree: number) => (degree * Math.PI) / 180;

  const dLat = toRad(storeLat - myLat);
  const dLng = toRad(storeLng - myLng);

  const lat1Rad = toRad(myLat);
  const lat2Rad = toRad(storeLat);

  // Haversine 공식
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // 거리 계산 (미터) 후 소수점 버림
  const distance = Math.floor(earthRadius * c);

  return distance;
}
