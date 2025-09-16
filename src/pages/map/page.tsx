import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNavigation from "../../components/feature/TopNavigation";
import BottomNavigation from "../../components/feature/BottomNavigation";
import Card from "../../components/base/Card";
import NaverMapComponent from "../../components/feature/NaverMapComponent";

interface Store {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  category: string;
  address: string;
  mainCoupon: {
    title: string;
    remaining: number;
  };
  lat: number;
  lng: number;
  distanceInM: number;
  popularity: number;
}

interface Category {
  id: string;
  name: string;
  active: boolean;
}

const categories: Category[] = [
  { id: "favorite", name: "즐겨찾기", active: false },
  { id: "super", name: "슈퍼", active: false },
  { id: "cafe", name: "카페", active: true },
  { id: "restaurant", name: "음식점", active: false },
  { id: "partner", name: "제휴", active: false },
];

const allStores: Store[] = [
  {
    id: "1",
    name: "스타벅스 역삼점",
    rating: 4.8,
    reviewCount: 321,
    distance: "120m",
    category: "cafe",
    address: "서울 강남구 역삼동 123-45",
    mainCoupon: {
      title: "아메리카노 1+1",
      remaining: 15,
    },
    lat: 37.5665,
    lng: 127.0295,
    distanceInM: 120,
    popularity: 95,
  },
  {
    id: "2",
    name: "투썸플레이스 테헤란점",
    rating: 4.6,
    reviewCount: 198,
    distance: "250m",
    category: "cafe",
    address: "서울 강남구 테헤란로 456",
    mainCoupon: {
      title: "케이크 30% 할인",
      remaining: 8,
    },
    lat: 37.5655,
    lng: 127.0305,
    distanceInM: 250,
    popularity: 87,
  },
  {
    id: "3",
    name: "이디야커피 강남역점",
    rating: 4.5,
    reviewCount: 156,
    distance: "320m",
    category: "cafe",
    address: "서울 강남구 강남대로 789",
    mainCoupon: {
      title: "음료 2000원 할인",
      remaining: 23,
    },
    lat: 37.5645,
    lng: 127.0285,
    distanceInM: 320,
    popularity: 78,
  },
  {
    id: "4",
    name: "롯데마트 역삼점",
    rating: 4.2,
    reviewCount: 89,
    distance: "180m",
    category: "super",
    address: "서울 강남구 역삼동 456-78",
    mainCoupon: {
      title: "생필품 10% 할인",
      remaining: 30,
    },
    lat: 37.567,
    lng: 127.03,
    distanceInM: 180,
    popularity: 65,
  },
  {
    id: "5",
    name: "맥도날드 테헤란점",
    rating: 4.3,
    reviewCount: 245,
    distance: "350m",
    category: "restaurant",
    address: "서울 강남구 테헤란로 234",
    mainCoupon: {
      title: "빅맥세트 20% 할인",
      remaining: 12,
    },
    lat: 37.564,
    lng: 127.031,
    distanceInM: 350,
    popularity: 82,
  },
];

type SortType = "popularity" | "distance";

export default function MapPage() {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "cafe",
  ]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showListView, setShowListView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState<SortType>("distance");
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          console.error("위치 정보를 가져올 수 없습니다:", error);
          setLocationError("위치 정보를 가져올 수 없습니다");
          // 기본 위치 설정 (서울시청)
          setCurrentLocation({
            lat: 37.5665,
            lng: 126.978,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5분간 캐시 사용
        }
      );
    } else {
      setLocationError("이 브라우저는 위치 서비스를 지원하지 않습니다");
      // 기본 위치 설정
      setCurrentLocation({
        lat: 37.5665,
        lng: 126.978,
      });
    }
  }, []);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // 필터링된 매장 목록
  const filteredStores = allStores.filter((store) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(store.category);
    const matchesSearch =
      searchQuery === "" ||
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.mainCoupon.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // 정렬된 매장 목록
  const sortedStores = [...filteredStores].sort((a, b) => {
    if (sortType === "distance") {
      return a.distanceInM - b.distanceInM;
    } else {
      return b.popularity - a.popularity;
    }
  });

  // 지도에 표시할 마커들
  const mapMarkers = [
    // 현재 위치 마커
    ...(currentLocation
      ? [
          {
            lat: currentLocation.lat,
            lng: currentLocation.lng,
            title: "현재 위치",
            content: `
              <div style="padding: 12px; min-width: 150px; text-align: center;">
                <h4 style="margin: 0 0 8px 0; font-weight: bold; color: #0066cc;">📍 현재 위치</h4>
                <p style="margin: 0; font-size: 12px; color: #666;">여기에 계신가요?</p>
              </div>
            `,
          },
        ]
      : []),
    // 매장 마커들
    ...filteredStores.map((store) => ({
      lat: store.lat,
      lng: store.lng,
      title: store.name,
      content: `
        <div style="padding: 12px; min-width: 200px;">
          <h4 style="margin: 0 0 8px 0; font-weight: bold; color: #333;">${store.name}</h4>
          <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${store.address}</p>
          <div style="display: flex; align-items: center; margin: 4px 0;">
            <span style="color: #ff6b00; font-weight: bold;">★ ${store.rating}</span>
            <span style="margin-left: 8px; font-size: 12px; color: #666;">리뷰 ${store.reviewCount}개</span>
          </div>
          <p style="margin: 8px 0 0 0; color: #0066cc; font-weight: bold; font-size: 13px;">${store.mainCoupon.title}</p>
          <p style="margin: 4px 0 0 0; color: #ff6b00; font-size: 12px;">${store.mainCoupon.remaining}개 남음</p>
        </div>
      `,
    })),
  ];

  // 지도 중심점 (현재 위치 우선, 없으면 첫 번째 매장, 그것도 없으면 기본값)
  const mapCenter =
    currentLocation ||
    (filteredStores.length > 0
      ? { lat: filteredStores[0].lat, lng: filteredStores[0].lng }
      : { lat: 37.5665, lng: 126.978 });

  const handleStoreClick = (storeId: string) => {
    navigate(`/store/${storeId}`);
  };

  const handleMyLocation = () => {
    if (currentLocation) {
      // 이미 현재 위치가 있다면 지도를 해당 위치로 이동
      console.log("현재 위치로 이동:", currentLocation);
    } else {
      // 현재 위치가 없다면 다시 가져오기 시도
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCurrentLocation(newLocation);
            console.log("새로운 현재 위치:", newLocation);
          },
          (error) => {
            console.error("위치 정보를 가져올 수 없습니다:", error);
            alert("위치 정보를 가져올 수 없습니다. 설정을 확인해주세요.");
          }
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 상단 네비게이션 */}
      <TopNavigation
        leftAction={
          <button className="w-10 h-10 flex items-center justify-center">
            <i className="ri-menu-line text-text text-xl" />
          </button>
        }
        rightAction={
          <button className="w-10 h-10 flex items-center justify-center">
            <i className="ri-notification-line text-text text-xl" />
          </button>
        }
        showBorder={false}
      />

      {/* 검색바 */}
      <div className="fixed top-12 left-0 right-0 z-40 bg-white px-4 py-3 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="쿠폰/가게 검색"
            className="w-full h-12 pl-12 pr-4 bg-gray-100 rounded-16 border-none text-sm font-sf placeholder-text-secondary focus:outline-none focus:bg-white focus:shadow-sm"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
            <i className="ri-search-line text-text-secondary" />
          </div>
        </div>

        {/* 위치 상태 표시 */}
        {/* {locationError && (
          <div className="mt-2 px-2 py-1 bg-yellow-100 border border-yellow-300 rounded text-xs text-yellow-700">
            <i className="ri-error-warning-line mr-1" />
            {locationError} (기본 위치로 표시됨)
          </div>
        )}
        {currentLocation && !locationError && (
          <div className="mt-2 px-2 py-1 bg-green-100 border border-green-300 rounded text-xs text-green-700">
            <i className="ri-map-pin-line mr-1" />
            현재 위치를 기준으로 표시됩니다
          </div>
        )} */}
      </div>

      {/* 카테고리 칩 */}
      <div className={`fixed top-28 left-0 right-0 z-40 bg-white px-4 py-3`}>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`px-4 py-2 rounded-20 text-sm font-sf font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategories.includes(category.id)
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-text hover:bg-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 지도 영역 */}
      <div className={`pt-40 h-screen relative`}>
        <div className="w-full h-full relative overflow-hidden">
          {/* 네이버 지도 */}
          <NaverMapComponent
            width="100%"
            height="100%"
            center={mapCenter}
            zoom={15}
            markers={mapMarkers}
            className="absolute inset-0"
          />

          {/* 우측 하단 버튼들 */}
          <div className="absolute bottom-24 right-4 flex flex-col gap-3 z-20">
            {/* 목록 보기 버튼 */}
            <button
              onClick={() => setShowListView(true)}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
            >
              <i className="ri-list-unordered text-primary text-xl" />
            </button>

            {/* 내 위치 버튼 */}
            <button
              onClick={handleMyLocation}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
              title="내 위치로 이동"
            >
              <i className="ri-navigation-fill text-primary text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* 바텀 시트 */}
      {showBottomSheet && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setShowBottomSheet(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-20 max-h-96 overflow-hidden pointer-events-auto">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />

            <div className="px-4 pb-24 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-sf font-semibold text-text">
                  주변 매장
                </h3>
                <button
                  onClick={() => setShowBottomSheet(false)}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <i className="ri-close-line text-text-secondary text-xl" />
                </button>
              </div>

              <div className="space-y-3">
                {filteredStores.map((store) => (
                  <Card
                    key={store.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleStoreClick(store.id)}
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-12 flex items-center justify-center flex-shrink-0">
                        <i
                          className={`text-text-secondary text-2xl ${
                            store.category === "cafe"
                              ? "ri-cup-fill"
                              : store.category === "super"
                              ? "ri-shopping-cart-fill"
                              : store.category === "restaurant"
                              ? "ri-restaurant-fill"
                              : "ri-store-fill"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-sf font-semibold text-text text-sm leading-tight truncate">
                            {store.name}
                          </h4>
                          <span className="text-xs text-text-secondary ml-2 flex-shrink-0">
                            {store.distance}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <i className="ri-star-fill text-accent text-sm" />
                            <span className="text-sm font-sf font-medium text-text">
                              {store.rating}
                            </span>
                          </div>
                          <span className="text-xs text-text-secondary">
                            리뷰 {store.reviewCount}개
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-primary font-sf font-medium truncate">
                              {store.mainCoupon.title}
                            </p>
                          </div>
                          <span className="text-xs text-accent font-sf font-medium ml-2">
                            {store.mainCoupon.remaining}개 남음
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 목록 보기 모달 */}
      {showListView && (
        <div className="fixed inset-0 z-50 bg-white">
          {/* 상단 헤더 */}
          <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowListView(false)}
                className="w-10 h-10 flex items-center justify-center"
              >
                <i className="ri-close-line text-text text-xl" />
              </button>
              <h2 className="text-lg font-sf font-semibold text-text">
                주변 매장
              </h2>
              <div className="w-10 h-10" />
            </div>
          </div>

          {/* 정렬 옵션 */}
          <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
            <div className="flex gap-2">
              <button
                onClick={() => setSortType("distance")}
                className={`px-4 py-2 rounded-20 text-sm font-sf font-medium transition-all duration-200 ${
                  sortType === "distance"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-text hover:bg-gray-300"
                }`}
              >
                가까운순
              </button>
              <button
                onClick={() => setSortType("popularity")}
                className={`px-4 py-2 rounded-20 text-sm font-sf font-medium transition-all duration-200 ${
                  sortType === "popularity"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-text hover:bg-gray-300"
                }`}
              >
                인기순
              </button>
            </div>
          </div>

          {/* 매장 목록 */}
          <div className="pt-32 pb-20 px-4 overflow-y-auto">
            <div className="space-y-3">
              {sortedStores.map((store) => (
                <Card
                  key={store.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setShowListView(false);
                    handleStoreClick(store.id);
                  }}
                >
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-12 flex items-center justify-center flex-shrink-0">
                      <i
                        className={`text-text-secondary text-2xl ${
                          store.category === "cafe"
                            ? "ri-cup-fill"
                            : store.category === "super"
                            ? "ri-shopping-cart-fill"
                            : store.category === "restaurant"
                            ? "ri-restaurant-fill"
                            : "ri-store-fill"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-sf font-semibold text-text text-sm leading-tight truncate">
                          {store.name}
                        </h4>
                        <span className="text-xs text-text-secondary ml-2 flex-shrink-0">
                          {store.distance}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <i className="ri-star-fill text-accent text-sm" />
                          <span className="text-sm font-sf font-medium text-text">
                            {store.rating}
                          </span>
                        </div>
                        <span className="text-xs text-text-secondary">
                          리뷰 {store.reviewCount}개
                        </span>
                        {sortType === "popularity" && (
                          <>
                            <span className="text-xs text-text-secondary">
                              •
                            </span>
                            <span className="text-xs text-primary font-sf font-medium">
                              인기도 {store.popularity}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-primary font-sf font-medium truncate">
                            {store.mainCoupon.title}
                          </p>
                        </div>
                        <span className="text-xs text-accent font-sf font-medium ml-2">
                          {store.mainCoupon.remaining}개 남음
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 하단 네비게이션 */}
      <BottomNavigation />
    </div>
  );
}
