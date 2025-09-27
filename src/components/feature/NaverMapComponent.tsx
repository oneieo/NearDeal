import { useEffect, Suspense, useState } from "react";
import {
  NaverMap,
  Container,
  Marker,
  //InfoWindow,
  useNavermaps,
} from "react-naver-maps";

interface MarkerData {
  id: string;
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
  onMarkerClick?: (markerId: string) => void;
}

// 실제 지도 컴포넌트 (Suspense 내부)
function MapContent({
  center,
  zoom = 16,
  markers = [],
  onMapReady,
  onMarkerClick,
}: NaverMapComponentProps) {
  const navermaps = useNavermaps();
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  useEffect(() => {
    if (onMapReady) {
      onMapReady();
    }
  }, [onMapReady]);

  const handleMarkerClick = (markerId: string) => {
    console.log("Marker clicked in NaverMapComponent:", markerId);
    setSelectedMarker(selectedMarker === markerId ? null : markerId);

    // 상위 컴포넌트로 마커 클릭 이벤트 전달
    if (onMarkerClick) {
      onMarkerClick(markerId);
    }
  };

  return (
    <NaverMap
      defaultCenter={new navermaps.LatLng(center.lat, center.lng)}
      defaultZoom={zoom}
      center={new navermaps.LatLng(center.lat, center.lng)}
    >
      {markers.map((marker) => (
        <div key={marker.id}>
          <Marker
            icon={
              marker.id.includes("current-location")
                ? "/icons/my-location.png"
                : "/icons/icon-clover2.png"
            }
            position={new navermaps.LatLng(marker.lat, marker.lng)}
            title={marker.title}
            onClick={() => handleMarkerClick(marker.id)}
          />
        </div>
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
  onMarkerClick,
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
            onMarkerClick={onMarkerClick}
          />
        </Suspense>
      </Container>
    </div>
  );
}
