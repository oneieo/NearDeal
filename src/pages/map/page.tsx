// import { useState, useEffect, useCallback, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import TopNavigation from "../../components/feature/TopNavigation";
// import BottomNavigation from "../../components/feature/BottomNavigation";
// import Card from "../../components/base/Card";
// import NaverMapComponent from "../../components/feature/NaverMapComponent";

// // Types
// interface Store {
//   id: string;
//   name: string;
//   rating: number;
//   reviewCount: number;
//   distance: string;
//   category: string;
//   address: string;
//   mainCoupon: {
//     title: string;
//     remaining: number;
//   };
//   lat: number;
//   lng: number;
//   distanceInM: number;
//   popularity: number;
// }

// interface Category {
//   id: string;
//   name: string;
// }

// interface Location {
//   lat: number;
//   lng: number;
// }

// type SortType = "popularity" | "distance";

// // Constants
// const CATEGORIES: Category[] = [
//   { id: "favorite", name: "즐겨찾기" },
//   { id: "partner", name: "제휴" },
//   { id: "restaurant", name: "음식점" },
//   { id: "cafe", name: "카페" },
//   { id: "store", name: "마트" },
//   { id: "convenient", name: "편의점" },
//   { id: "hairshop", name: "헤어샵" },
// ];

// const DEFAULT_LOCATION: Location = {
//   lat: 35.8407943328,
//   lng: 127.1320319577, // 전북대 기본 위치
// };

// const ALL_STORES: Store[] = [
//   {
//     id: "1",
//     name: "스타벅스 역삼점",
//     rating: 4.8,
//     reviewCount: 321,
//     distance: "120m",
//     category: "cafe",
//     address: "서울 강남구 역삼동 123-45",
//     mainCoupon: { title: "아메리카노 1+1", remaining: 15 },
//     lat: 37.5665,
//     lng: 127.0295,
//     distanceInM: 120,
//     popularity: 95,
//   },
//   {
//     id: "2",
//     name: "투썸플레이스 테헤란점",
//     rating: 4.6,
//     reviewCount: 198,
//     distance: "250m",
//     category: "cafe",
//     address: "서울 강남구 테헤란로 456",
//     mainCoupon: { title: "케이크 30% 할인", remaining: 8 },
//     lat: 37.5655,
//     lng: 127.0305,
//     distanceInM: 250,
//     popularity: 87,
//   },
//   {
//     id: "3",
//     name: "이디야커피 강남역점",
//     rating: 4.5,
//     reviewCount: 156,
//     distance: "320m",
//     category: "cafe",
//     address: "서울 강남구 강남대로 789",
//     mainCoupon: { title: "음료 2000원 할인", remaining: 23 },
//     lat: 37.5645,
//     lng: 127.0285,
//     distanceInM: 320,
//     popularity: 78,
//   },
//   {
//     id: "4",
//     name: "롯데마트 역삼점",
//     rating: 4.2,
//     reviewCount: 89,
//     distance: "180m",
//     category: "super",
//     address: "서울 강남구 역삼동 456-78",
//     mainCoupon: { title: "생필품 10% 할인", remaining: 30 },
//     lat: 37.567,
//     lng: 127.03,
//     distanceInM: 180,
//     popularity: 65,
//   },
//   {
//     id: "5",
//     name: "맥도날드 테헤란점",
//     rating: 4.3,
//     reviewCount: 245,
//     distance: "350m",
//     category: "restaurant",
//     address: "서울 강남구 테헤란로 234",
//     mainCoupon: { title: "빅맥세트 20% 할인", remaining: 12 },
//     lat: 37.564,
//     lng: 127.031,
//     distanceInM: 350,
//     popularity: 82,
//   },
//   {
//     id: "6",
//     name: "여유",
//     rating: 4.3,
//     reviewCount: 245,
//     distance: "350m",
//     category: "partner",
//     address: "전북 전주시 덕진구 백제대로 595",
//     mainCoupon: { title: "아메리카노 또는 아이스티 5+1", remaining: 12 },
//     lat: 35.841623778922376,
//     lng: 127.13476044104675,
//     distanceInM: 350,
//     popularity: 82,
//   },
//   {
//     id: "7",
//     name: "네커피",
//     rating: 4.3,
//     reviewCount: 245,
//     distance: "350m",
//     category: "partner",
//     address: "전북 전주시 덕진구 삼송5길 14-18 네커피",
//     mainCoupon: { title: "쿠폰 8개만 채워도 혜택 적용", remaining: 12 },
//     lat: 35.843521847759625,
//     lng: 127.13791834621006,
//     distanceInM: 350,
//     popularity: 82,
//   },
//   {
//     id: "8",
//     name: "인솔커피",
//     rating: 4.3,
//     reviewCount: 245,
//     distance: "350m",
//     category: "partner",
//     address: "전북 전주시 덕진구 권삼득로 315 1층 인솔커피 전북대점",
//     mainCoupon: { title: "만 원 이상 구매 시 쿠키 증정", remaining: 12 },
//     lat: 35.84374510140307,
//     lng: 127.12754418572484,
//     distanceInM: 350,
//     popularity: 82,
//   },
//   {
//     id: "9",
//     name: "온앤오프",
//     rating: 4.3,
//     reviewCount: 245,
//     distance: "350m",
//     category: "partner",
//     address: "전북 전주시 덕진구 명륜3길 14 3층",
//     mainCoupon: { title: "평일 1500원, 주말 1800원", remaining: 12 },
//     lat: 35.842401975476896,
//     lng: 127.12778278511642,
//     distanceInM: 350,
//     popularity: 82,
//   },
// ];

// // Utility functions
// const getCategoryIcon = (category: string): string => {
//   const icons = {
//     cafe: "ri-cup-fill",
//     super: "ri-shopping-cart-fill",
//     restaurant: "ri-restaurant-fill",
//     default: "ri-store-fill",
//   };
//   return icons[category as keyof typeof icons] || icons.default;
// };

// const createStoreMarkerContent = (store: Store): string => `
//   <div style="padding: 12px; min-width: 200px;">
//     <h4 style="margin: 0 0 8px 0; font-weight: bold; color: #333;">${store.name}</h4>
//     <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${store.address}</p>
//     <div style="display: flex; align-items: center; margin: 4px 0;">
//       <span style="color: #ff6b00; font-weight: bold;">★ ${store.rating}</span>
//       <span style="margin-left: 8px; font-size: 12px; color: #666;">리뷰 ${store.reviewCount}개</span>
//     </div>
//     <p style="margin: 8px 0 0 0; color: #0066cc; font-weight: bold; font-size: 13px;">${store.mainCoupon.title}</p>
//     <p style="margin: 4px 0 0 0; color: #ff6b00; font-size: 12px;">${store.mainCoupon.remaining}개 남음</p>
//   </div>
// `;

// const createCurrentLocationMarkerContent = (): string => `
//   <div style="padding: 12px; min-width: 150px; text-align: center;">
//     <h4 style="margin: 0 0 8px 0; font-weight: bold; color: #0066cc;">📍 현재 위치</h4>
//     <p style="margin: 0; font-size: 12px; color: #666;">여기에 계신가요?</p>
//   </div>
// `;

// // Custom hooks
// const useCurrentLocation = () => {
//   const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
//   const [locationError, setLocationError] = useState<string | null>(null);

//   const getCurrentLocation = useCallback(() => {
//     if (!navigator.geolocation) {
//       setLocationError("이 브라우저는 위치 서비스를 지원하지 않습니다");
//       setCurrentLocation(DEFAULT_LOCATION);
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setCurrentLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//         setLocationError(null);
//       },
//       (error) => {
//         console.error("위치 정보를 가져올 수 없습니다:", error);
//         setLocationError("위치 정보를 가져올 수 없습니다");
//         setCurrentLocation(DEFAULT_LOCATION);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 300000, // 5분간 캐시 사용
//       }
//     );
//   }, []);

//   useEffect(() => {
//     getCurrentLocation();
//   }, [getCurrentLocation]);

//   return { currentLocation, locationError, getCurrentLocation };
// };

// // Main component
// export default function MapPage() {
//   const navigate = useNavigate();

//   // State
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([
//     "partner",
//   ]);
//   const [showBottomSheet, setShowBottomSheet] = useState(false);
//   const [showListView, setShowListView] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortType, setSortType] = useState<SortType>("distance");
//   const [mapCenter, setMapCenter] = useState<Location>(DEFAULT_LOCATION);

//   // Custom hooks
//   const { currentLocation, getCurrentLocation } = useCurrentLocation();

//   // Computed values
//   const filteredStores = useMemo(() => {
//     console.log("Filtering stores with categories:", selectedCategories);
//     return ALL_STORES.filter((store) => {
//       const matchesCategory =
//         selectedCategories.length === 0 ||
//         selectedCategories.includes(store.category);
//       const matchesSearch =
//         searchQuery === "" ||
//         store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         store.mainCoupon.title
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase());

//       return matchesCategory && matchesSearch;
//     });
//   }, [selectedCategories, searchQuery]);

//   const sortedStores = useMemo(() => {
//     return [...filteredStores].sort((a, b) => {
//       return sortType === "distance"
//         ? a.distanceInM - b.distanceInM
//         : b.popularity - a.popularity;
//     });
//   }, [filteredStores, sortType]);

//   const mapMarkers = useMemo(() => {
//     console.log(
//       "Computing map markers with filtered stores:",
//       filteredStores.length
//     );
//     const markers = [];

//     // 현재 위치 마커
//     if (currentLocation) {
//       markers.push({
//         lat: currentLocation.lat,
//         lng: currentLocation.lng,
//         title: "현재 위치",
//         content: createCurrentLocationMarkerContent(),
//         id: "current-location",
//       });
//     }

//     // 매장 마커들 - filteredStores가 변경될 때마다 새로 생성
//     const storeMarkers = filteredStores.map((store) => ({
//       lat: store.lat,
//       lng: store.lng,
//       title: store.name,
//       content: createStoreMarkerContent(store),
//       id: `store-${store.id}`,
//       category: store.category, // 디버깅을 위해 카테고리 정보 추가
//     }));

//     markers.push(...storeMarkers);
//     // console.log(
//     //   "Final markers:",
//     //   markers.length,
//     //   markers.map((m) => ({ id: m.id, category: m.category }))
//     // );

//     return markers;
//   }, [currentLocation, filteredStores]);

//   // Event handlers
//   const handleCategoryToggle = useCallback((categoryId: string) => {
//     console.log("Category toggle:", categoryId);
//     setSelectedCategories((prev) => {
//       const newCategories = prev.includes(categoryId)
//         ? prev.filter((id) => id !== categoryId)
//         : [...prev, categoryId];
//       console.log("New categories:", newCategories);
//       return newCategories;
//     });
//   }, []);

//   const handleStoreClick = useCallback(
//     (storeId: string) => {
//       navigate(`/store/${storeId}`);
//     },
//     [navigate]
//   );

//   const handleMarkerClick = useCallback((markerId: string) => {
//     console.log("Marker clicked:", markerId);

//     // 상점 마커인 경우 (현재 위치 마커가 아닌 경우)
//     if (markerId.startsWith("store-")) {
//       setShowBottomSheet(true);
//     }
//   }, []);

//   const handleMyLocation = useCallback(() => {
//     if (currentLocation) {
//       console.log("지도 중심을 현재 위치로 이동:", currentLocation);
//       setMapCenter({
//         lat: currentLocation.lat,
//         lng: currentLocation.lng,
//       });
//     } else {
//       getCurrentLocation();
//     }
//   }, [currentLocation, getCurrentLocation]);

//   const handleListViewStoreClick = useCallback(
//     (storeId: string) => {
//       setShowListView(false);
//       handleStoreClick(storeId);
//     },
//     [handleStoreClick]
//   );

//   // 현재 위치가 변경되면 지도 중심을 업데이트
//   useEffect(() => {
//     if (currentLocation) {
//       setMapCenter(currentLocation);
//     } else if (filteredStores.length > 0) {
//       setMapCenter({ lat: filteredStores[0].lat, lng: filteredStores[0].lng });
//     }
//   }, [currentLocation, filteredStores]);

//   // Components
//   const SearchBar = () => (
//     <div className="fixed top-12 left-0 right-0 z-40 bg-white px-4 py-3 border-b border-gray-200">
//       <div className="relative">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="쿠폰/가게 검색"
//           className="w-full h-12 pl-12 pr-4 bg-gray-100 rounded-16 border-none text-sm font-sf placeholder-text-secondary focus:outline-none focus:bg-white focus:shadow-sm"
//         />
//         <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
//           <i className="ri-search-line text-text-secondary" />
//         </div>
//       </div>
//     </div>
//   );

//   const CategoryChips = () => (
//     <div className="fixed top-28 left-0 right-0 z-40 bg-white px-4 py-3">
//       <div className="flex gap-2 overflow-x-auto scrollbar-hide">
//         {CATEGORIES.map((category) => (
//           <button
//             key={category.id}
//             onClick={() => handleCategoryToggle(category.id)}
//             className={`px-4 py-2 rounded-20 text-sm font-sf font-medium whitespace-nowrap transition-all duration-200 ${
//               selectedCategories.includes(category.id)
//                 ? "bg-primary text-white"
//                 : "bg-gray-200 text-text hover:bg-gray-300"
//             }`}
//           >
//             {category.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   );

//   const MapButtons = () => (
//     <div className="absolute bottom-24 right-4 flex flex-col gap-3 z-20">
//       <button
//         onClick={() => setShowListView(true)}
//         className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
//       >
//         <i className="ri-list-unordered text-primary text-xl" />
//       </button>
//       <button
//         onClick={handleMyLocation}
//         className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
//         title="내 위치로 이동"
//       >
//         <i className="ri-navigation-fill text-primary text-xl" />
//       </button>
//     </div>
//   );

//   const StoreCard = ({
//     store,
//     showPopularity = false,
//     onClick,
//   }: {
//     store: Store;
//     showPopularity?: boolean;
//     onClick: () => void;
//   }) => (
//     <Card
//       className="cursor-pointer hover:shadow-md transition-shadow"
//       onClick={onClick}
//     >
//       <div className="flex gap-4">
//         <div className="w-16 h-16 bg-gray-100 rounded-12 flex items-center justify-center flex-shrink-0">
//           <i
//             className={`text-text-secondary text-2xl ${getCategoryIcon(
//               store.category
//             )}`}
//           />
//         </div>
//         <div className="flex-1 min-w-0">
//           <div className="flex items-start justify-between mb-1">
//             <h4 className="font-sf font-semibold text-text text-sm leading-tight truncate">
//               {store.name}
//             </h4>
//             <span className="text-xs text-text-secondary ml-2 flex-shrink-0">
//               {store.distance}
//             </span>
//           </div>
//           <div className="flex items-center gap-2 mb-2">
//             <div className="flex items-center gap-1">
//               <i className="ri-star-fill text-accent text-sm" />
//               <span className="text-sm font-sf font-medium text-text">
//                 {store.rating}
//               </span>
//             </div>
//             <span className="text-xs text-text-secondary">
//               리뷰 {store.reviewCount}개
//             </span>
//             {showPopularity && (
//               <>
//                 <span className="text-xs text-text-secondary">•</span>
//                 <span className="text-xs text-primary font-sf font-medium">
//                   인기도 {store.popularity}
//                 </span>
//               </>
//             )}
//           </div>
//           <div className="flex items-center justify-between">
//             <div className="flex-1 min-w-0">
//               <p className="text-xs text-primary font-sf font-medium truncate">
//                 {store.mainCoupon.title}
//               </p>
//             </div>
//             <span className="text-xs text-accent font-sf font-medium ml-2">
//               {store.mainCoupon.remaining}개 남음
//             </span>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );

//   const BottomSheet = () =>
//     showBottomSheet && (
//       <div className="fixed inset-0 z-50 pointer-events-none">
//         <div
//           className="absolute inset-0 bg-black/20"
//           onClick={() => setShowBottomSheet(false)}
//         />
//         <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-20 max-h-96 overflow-hidden pointer-events-auto">
//           <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />
//           <div className="px-4 pb-24 overflow-y-auto">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-sf font-semibold text-text">
//                 주변 매장
//               </h3>
//               <button
//                 onClick={() => setShowBottomSheet(false)}
//                 className="w-8 h-8 flex items-center justify-center"
//               >
//                 <i className="ri-close-line text-text-secondary text-xl" />
//               </button>
//             </div>
//             <div className="space-y-3">
//               {filteredStores.map((store) => (
//                 <StoreCard
//                   key={store.id}
//                   store={store}
//                   onClick={() => handleStoreClick(store.id)}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );

//   const ListViewModal = () =>
//     showListView && (
//       <div className="fixed inset-0 z-50 bg-white">
//         {/* Header */}
//         <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => setShowListView(false)}
//               className="w-10 h-10 flex items-center justify-center"
//             >
//               <i className="ri-close-line text-text text-xl" />
//             </button>
//             <h2 className="text-lg font-sf font-semibold text-text">
//               주변 매장
//             </h2>
//             <div className="w-10 h-10" />
//           </div>
//         </div>

//         {/* Sort Options */}
//         <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
//           <div className="flex gap-2">
//             {[
//               { key: "distance", label: "가까운순" },
//               { key: "popularity", label: "인기순" },
//             ].map(({ key, label }) => (
//               <button
//                 key={key}
//                 onClick={() => setSortType(key as SortType)}
//                 className={`px-4 py-2 rounded-20 text-sm font-sf font-medium transition-all duration-200 ${
//                   sortType === key
//                     ? "bg-primary text-white"
//                     : "bg-gray-200 text-text hover:bg-gray-300"
//                 }`}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Store List */}
//         <div className="pt-32 pb-20 px-4 overflow-y-auto">
//           <div className="space-y-3">
//             {sortedStores.map((store) => (
//               <StoreCard
//                 key={store.id}
//                 store={store}
//                 showPopularity={sortType === "popularity"}
//                 onClick={() => handleListViewStoreClick(store.id)}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-background">
//       <TopNavigation
//         leftAction={
//           <button className="w-10 h-10 flex items-center justify-center">
//             <i className="ri-menu-line text-text text-xl" />
//           </button>
//         }
//         rightAction={
//           <button className="w-10 h-10 flex items-center justify-center">
//             <i className="ri-settings-line text-text text-xl" />
//           </button>
//         }
//         showBorder={false}
//       />

//       <SearchBar />
//       <CategoryChips />

//       {/* Map Area */}
//       <div className="pt-40 h-screen relative">
//         <div className="w-full h-full relative overflow-hidden">
//           <NaverMapComponent
//             width="100%"
//             height="100%"
//             center={mapCenter}
//             zoom={15}
//             markers={mapMarkers}
//             className="absolute inset-0"
//             onMarkerClick={handleMarkerClick}
//           />
//           <MapButtons />
//         </div>
//       </div>

//       <BottomSheet />
//       <ListViewModal />
//       <BottomNavigation />
//     </div>
//   );
// }

import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TopNavigation from "../../components/feature/TopNavigation";
import BottomNavigation from "../../components/feature/BottomNavigation";
import Card from "../../components/base/Card";
import NaverMapComponent from "../../components/feature/NaverMapComponent";
import { useCategoryStore } from "../../store/useCategoryStore";

// Types
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

interface Location {
  lat: number;
  lng: number;
}

type SortType = "popularity" | "distance";

// Constants
const DEFAULT_LOCATION: Location = {
  lat: 35.8407943328,
  lng: 127.1320319577, // 전북대 기본 위치
};

// 카테고리 이름과 store category 매핑
const CATEGORY_MAPPING = {
  음식점: "restaurant",
  카페: "cafe",
  헤어샵: "beauty",
  마트: "shopping",
  제휴: "partner",
  즐겨찾기: "favorite",
};

const ALL_STORES: Store[] = [
  {
    id: "1",
    name: "스타벅스 역삼점",
    rating: 4.8,
    reviewCount: 321,
    distance: "120m",
    category: "cafe",
    address: "서울 강남구 역삼동 123-45",
    mainCoupon: { title: "아메리카노 1+1", remaining: 15 },
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
    mainCoupon: { title: "케이크 30% 할인", remaining: 8 },
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
    mainCoupon: { title: "음료 2000원 할인", remaining: 23 },
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
    category: "shopping",
    address: "서울 강남구 역삼동 456-78",
    mainCoupon: { title: "생필품 10% 할인", remaining: 30 },
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
    mainCoupon: { title: "빅맥세트 20% 할인", remaining: 12 },
    lat: 37.564,
    lng: 127.031,
    distanceInM: 350,
    popularity: 82,
  },
  {
    id: "6",
    name: "여유",
    rating: 4.3,
    reviewCount: 245,
    distance: "350m",
    category: "partner",
    address: "전북 전주시 덕진구 백제대로 595",
    mainCoupon: { title: "아메리카노 또는 아이스티 5+1", remaining: 12 },
    lat: 35.841623778922376,
    lng: 127.13476044104675,
    distanceInM: 350,
    popularity: 82,
  },
  {
    id: "7",
    name: "네커피",
    rating: 4.3,
    reviewCount: 245,
    distance: "350m",
    category: "partner",
    address: "전북 전주시 덕진구 삼송5길 14-18 네커피",
    mainCoupon: { title: "쿠폰 8개만 채워도 혜택 적용", remaining: 12 },
    lat: 35.843521847759625,
    lng: 127.13791834621006,
    distanceInM: 350,
    popularity: 82,
  },
  {
    id: "8",
    name: "인솔커피",
    rating: 4.3,
    reviewCount: 245,
    distance: "350m",
    category: "partner",
    address: "전북 전주시 덕진구 권삼득로 315 1층 인솔커피 전북대점",
    mainCoupon: { title: "만 원 이상 구매 시 쿠키 증정", remaining: 12 },
    lat: 35.84374510140307,
    lng: 127.12754418572484,
    distanceInM: 350,
    popularity: 82,
  },
  {
    id: "9",
    name: "온앤오프",
    rating: 4.3,
    reviewCount: 245,
    distance: "350m",
    category: "partner",
    address: "전북 전주시 덕진구 명륜3길 14 3층",
    mainCoupon: { title: "평일 1500원, 주말 1800원", remaining: 12 },
    lat: 35.842401975476896,
    lng: 127.12778278511642,
    distanceInM: 350,
    popularity: 82,
  },
];

// Utility functions
const getCategoryIcon = (category: string): string => {
  const icons = {
    cafe: "ri-cup-fill",
    shopping: "ri-shopping-cart-fill",
    restaurant: "ri-restaurant-fill",
    beauty: "ri-scissors-cut-fill",
    health: "ri-heart-pulse-fill",
    partner: "ri-service-fill",
    default: "ri-store-fill",
  };
  return icons[category as keyof typeof icons] || icons.default;
};

const createStoreMarkerContent = (store: Store): string => `
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
`;

const createCurrentLocationMarkerContent = (): string => `
  <div style="padding: 12px; min-width: 150px; text-align: center;">
    <h4 style="margin: 0 0 8px 0; font-weight: bold; color: #0066cc;">📍 현재 위치</h4>
    <p style="margin: 0; font-size: 12px; color: #666;">여기에 계신가요?</p>
  </div>
`;

// Custom hooks
const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("이 브라우저는 위치 서비스를 지원하지 않습니다");
      setCurrentLocation(DEFAULT_LOCATION);
      return;
    }

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
        setCurrentLocation(DEFAULT_LOCATION);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5분간 캐시 사용
      }
    );
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return { currentLocation, locationError, getCurrentLocation };
};

export default function MapPage() {
  const navigate = useNavigate();

  const {
    categories,
    selectedCategoryName,
    toggleCategory,
    isCategorySelected,
    getSelectedCategory,
  } = useCategoryStore();

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showListView, setShowListView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState<SortType>("distance");
  const [mapCenter, setMapCenter] = useState<Location>(DEFAULT_LOCATION);
  const [mapKey, setMapKey] = useState(0);

  const { currentLocation, getCurrentLocation } = useCurrentLocation();

  // 홈에서 선택된 카테고리를 기반으로 필터링된 매장들
  const filteredStores = useMemo(() => {
    console.log(
      "Filtering stores with selected category:",
      selectedCategoryName
    );

    return ALL_STORES.filter((store) => {
      // 카테고리 필터링
      let matchesCategory = true;
      if (selectedCategoryName) {
        const selectedCategoryMapped =
          CATEGORY_MAPPING[
            selectedCategoryName as keyof typeof CATEGORY_MAPPING
          ];
        matchesCategory = store.category === selectedCategoryMapped;
      }

      // 검색어 필터링
      const matchesSearch =
        searchQuery === "" ||
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.mainCoupon.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategoryName, searchQuery]);

  const sortedStores = useMemo(() => {
    return [...filteredStores].sort((a, b) => {
      return sortType === "distance"
        ? a.distanceInM - b.distanceInM
        : b.popularity - a.popularity;
    });
  }, [filteredStores, sortType]);

  const mapMarkers = useMemo(() => {
    console.log(
      "Computing map markers with filtered stores:",
      filteredStores.length
    );
    const markers = [];

    // 현재 위치 마커
    if (currentLocation) {
      markers.push({
        lat: currentLocation.lat,
        lng: currentLocation.lng,
        title: "현재 위치",
        content: createCurrentLocationMarkerContent(),
        id: "current-location",
      });
    }

    // 필터링된 매장 마커들
    const storeMarkers = filteredStores.map((store) => ({
      lat: store.lat,
      lng: store.lng,
      title: store.name,
      content: createStoreMarkerContent(store),
      id: `store-${store.id}`,
      category: store.category,
    }));

    markers.push(...storeMarkers);

    return markers;
  }, [currentLocation, filteredStores]);

  // Event handlers
  const handleCategoryToggle = useCallback(
    (categoryName: string) => {
      toggleCategory(categoryName);
    },
    [toggleCategory]
  );

  const handleStoreClick = useCallback(
    (storeId: string) => {
      navigate(`/store/${storeId}`);
    },
    [navigate]
  );

  const handleMarkerClick = useCallback((markerId: string) => {
    console.log("Marker clicked:", markerId);

    if (markerId.startsWith("store-")) {
      setShowBottomSheet(true);
    }
  }, []);

  const handleMyLocation = useCallback(() => {
    if (currentLocation) {
      console.log("Moving map center to current location:", currentLocation);
      setMapCenter({
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      });
      // key 변경으로 강제 리렌더링
      setMapKey((prev) => prev + 1);
    } else {
      console.log("Current location not available, fetching...");
      getCurrentLocation();
    }
  }, [currentLocation, getCurrentLocation]);

  const handleListViewStoreClick = useCallback(
    (storeId: string) => {
      setShowListView(false);
      handleStoreClick(storeId);
    },
    [handleStoreClick]
  );

  // 현재 위치가 변경되면 지도 중심을 업데이트
  useEffect(() => {
    if (currentLocation) {
      setMapCenter(currentLocation);
    } else if (filteredStores.length > 0) {
      setMapCenter({ lat: filteredStores[0].lat, lng: filteredStores[0].lng });
    }
  }, [currentLocation, filteredStores]);

  // Components
  const SearchBar = () => (
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
    </div>
  );

  const CategoryChips = () => (
    <div className="fixed top-28 left-0 right-0 z-40 bg-white px-4 py-3">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryToggle(category.name)}
            className={`px-4 py-2 rounded-20 text-sm font-sf font-medium whitespace-nowrap transition-all duration-200 ${
              isCategorySelected(category.name)
                ? "bg-primary text-white"
                : "bg-gray-200 text-text hover:bg-gray-300"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );

  const MapButtons = () => (
    <div className="absolute bottom-24 right-4 flex flex-col gap-3 z-20">
      <button
        onClick={() => setShowListView(true)}
        className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
      >
        <i className="ri-list-unordered text-primary text-xl" />
      </button>
      <button
        onClick={handleMyLocation}
        className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        title="내 위치로 이동"
      >
        <i className="ri-navigation-fill text-primary text-xl" />
      </button>
    </div>
  );

  const StoreCard = ({
    store,
    showPopularity = false,
    onClick,
  }: {
    store: Store;
    showPopularity?: boolean;
    onClick: () => void;
  }) => (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-12 flex items-center justify-center flex-shrink-0">
          <i
            className={`text-text-secondary text-2xl ${getCategoryIcon(
              store.category
            )}`}
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
            {showPopularity && (
              <>
                <span className="text-xs text-text-secondary">•</span>
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
  );

  const BottomSheet = () =>
    showBottomSheet && (
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
                {selectedCategoryName
                  ? `${selectedCategoryName} 매장`
                  : "주변 매장"}
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
                <StoreCard
                  key={store.id}
                  store={store}
                  onClick={() => handleStoreClick(store.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  const ListViewModal = () =>
    showListView && (
      <div className="fixed inset-0 z-50 bg-white">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowListView(false)}
              className="w-10 h-10 flex items-center justify-center"
            >
              <i className="ri-close-line text-text text-xl" />
            </button>
            <h2 className="text-lg font-sf font-semibold text-text">
              {selectedCategoryName
                ? `${selectedCategoryName} 매장`
                : "주변 매장"}
            </h2>
            <div className="w-10 h-10" />
          </div>
        </div>

        {/* Sort Options */}
        <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
          <div className="flex gap-2">
            {[
              { key: "distance", label: "가까운순" },
              { key: "popularity", label: "인기순" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSortType(key as SortType)}
                className={`px-4 py-2 rounded-20 text-sm font-sf font-medium transition-all duration-200 ${
                  sortType === key
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-text hover:bg-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Store List */}
        <div className="pt-32 pb-20 px-4 overflow-y-auto">
          <div className="space-y-3">
            {sortedStores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                showPopularity={sortType === "popularity"}
                onClick={() => handleListViewStoreClick(store.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation
        leftAction={
          <button className="w-10 h-10 flex items-center justify-center">
            <i className="ri-menu-line text-text text-xl" />
          </button>
        }
        rightAction={
          <button className="w-10 h-10 flex items-center justify-center">
            <i className="ri-settings-line text-text text-xl" />
          </button>
        }
        showBorder={false}
      />

      <SearchBar />
      <CategoryChips />

      <div className="pt-40 h-screen relative">
        <div className="w-full h-full relative overflow-hidden">
          <NaverMapComponent
            key={mapKey}
            width="100%"
            height="100%"
            center={mapCenter}
            zoom={15}
            markers={mapMarkers}
            className="absolute inset-0"
            onMarkerClick={handleMarkerClick}
          />
          <MapButtons />
        </div>
      </div>

      <BottomSheet />
      <ListViewModal />
      <BottomNavigation />
    </div>
  );
}
