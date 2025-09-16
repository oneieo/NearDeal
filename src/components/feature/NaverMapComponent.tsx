import { useEffect, Suspense } from "react";
import { NaverMap, Container, Marker, useNavermaps } from "react-naver-maps";

interface MarkerData {
  lat: number;
  lng: number;
  title?: string;
  content?: string;
}

interface NaverMapComponentProps {
  width?: string | number;
  height?: string | number;
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  markers?: MarkerData[];
  className?: string;
  onMapReady?: () => void;
}

// 실제 지도 컴포넌트 (Suspense 내부)
function MapContent({
  center,
  zoom = 16,
  markers = [],
  onMapReady,
}: NaverMapComponentProps) {
  const navermaps = useNavermaps();

  useEffect(() => {
    if (onMapReady) {
      onMapReady();
    }
  }, [onMapReady]);

  return (
    <NaverMap
      defaultCenter={new navermaps.LatLng(center.lat, center.lng)}
      defaultZoom={zoom}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          defaultPosition={new navermaps.LatLng(marker.lat, marker.lng)}
          title={marker.title}
          // onClick 이벤트로 정보창 구현 가능
        />
      ))}
    </NaverMap>
  );
}

// 메인 컴포넌트
export default function NaverMapComponent({
  width = "100%",
  height = "400px",
  center,
  zoom = 16,
  markers = [],
  className = "",
  onMapReady,
}: NaverMapComponentProps) {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Container className="w-full h-full">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center text-gray-500">
                <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm">지도를 불러오는 중...</p>
              </div>
            </div>
          }
        >
          <MapContent
            center={center}
            zoom={zoom}
            markers={markers}
            onMapReady={onMapReady}
          />
        </Suspense>
      </Container>
    </div>
  );
}
