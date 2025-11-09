// import { useState, useEffect, useCallback, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import TopNavigation from "../../components/feature/TopNavigation";
// import BottomNavigation from "../../components/feature/BottomNavigation";
// import Card from "../../components/base/Card";
// import NaverMapComponent from "../../components/feature/NaverMapComponent";
// import { useCategoryStore } from "../../store/useCategoryStore";
// import { calculateDistance, formatDistance } from "../../utils/distance";
// import { useAuthStore } from "../../store/useAuthStore";
// import { usePartnerStore } from "../../store/usePartnerStore";

// // Types
// interface PartnerStore {
//   partnerStoreId: number;
//   storeName: string;
//   address: string;
//   category: string;
//   partnerCategory: string;
//   lat: number;
//   lng: number;
//   phone: string;
//   openingTime: string;
//   closingTime: string;
//   breakStartTime: string;
//   breakEndTime: string;
//   lastOrder: string;
//   introduce: string;
//   partnerBenefit: string;
//   etc: string;
//   sns: string;
// }

// interface PartnerStoreResponse {
//   content: PartnerStore[];
//   totalElements: number;
//   totalPages: number;
// }

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

// interface Location {
//   lat: number;
//   lng: number;
// }

// type SortType = "popularity" | "distance";

// // Constants
// const DEFAULT_LOCATION: Location = {
//   lat: 35.8407943328,
//   lng: 127.1320319577,
// };

// const CATEGORY_MAPPING: Record<string, string> = {
//   단과대학: "",
//   총학생회: "STUDENT_COUNCIL",
//   음식점: "RESTAURANT",
//   카페: "CAFE",
//   주점: "BAR",
//   기타: "ETC",
// };

// export const CATEGORY_API_MAPPING: Record<string, string> = {
//   단과대학: "",
//   총학생회: "STUDENT_COUNCIL",
//   음식점: "RESTAURANT",
//   카페: "CAFE",
//   주점: "BAR",
//   기타: "ETC",
// };

// // API 카테고리 -> 표시용 카테고리
// const API_CATEGORY_TO_DISPLAY: Record<string, string> = {
//   CAFE: "cafe",
//   RESTAURANT: "restaurant",
//   ETC: "etc",
//   BAR: "bar",
//   BEAUTY: "beauty",
// };

// const getCategoryIcon = (category: string): string => {
//   const icons = {
//     partner: "ri-service-fill",
//     cafe: "ri-cup-fill",
//     restaurant: "ri-restaurant-fill",
//     bar: "ri-beer-fill",
//     etc: "ri-shopping-cart-fill",
//     health: "ri-heart-pulse-fill",
//     beauty: "ri-scissors-cut-fill",
//     default: "ri-store-fill",
//     // shopping: "ri-shopping-cart-fill",
//   };
//   return icons[category as keyof typeof icons] || icons.default;
// };

// const convertPartnerStoreToStore = (
//   partnerStore: PartnerStore,
//   currentLocation: Location | null
// ): Store => {
//   const distanceInM = currentLocation
//     ? calculateDistance(
//         currentLocation.lat,
//         currentLocation.lng,
//         partnerStore.lat,
//         partnerStore.lng
//       )
//     : 0;

//   return {
//     id: partnerStore.partnerStoreId.toString(),
//     name: partnerStore.storeName,
//     rating: 4.5,
//     reviewCount: 0,
//     distance: formatDistance(distanceInM),
//     category: partnerStore.category, // API의 category 값 그대로 사용 (CAFE, RESTAURANT 등)
//     address: partnerStore.address,
//     mainCoupon: {
//       title: partnerStore.partnerBenefit || "혜택 정보 없음",
//       remaining: 10,
//     },
//     lat: partnerStore.lat,
//     lng: partnerStore.lng,
//     distanceInM,
//     popularity: 75,
//   };
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
//         maximumAge: 300000,
//       }
//     );
//   }, []);

//   useEffect(() => {
//     getCurrentLocation();
//   }, [getCurrentLocation]);

//   return { currentLocation, locationError, getCurrentLocation };
// };

// export default function MapPage() {
//   const navigate = useNavigate();

//   const {
//     categories,
//     selectedCategoryName,
//     setSelectedCategory,
//     toggleCategory,
//     isCategorySelected,
//   } = useCategoryStore();

//   const [showBottomSheet, setShowBottomSheet] = useState(false);
//   const [showListView, setShowListView] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortType, setSortType] = useState<SortType>("distance");
//   const [mapCenter, setMapCenter] = useState<Location>(DEFAULT_LOCATION);
//   const [mapKey, setMapKey] = useState(0);
//   const { affiliation } = useAuthStore();
//   const { currentLocation, getCurrentLocation } = useCurrentLocation();
//   const { stores, setStores } = usePartnerStore();
//   //const [stores, setStores] = useState<Store[]>([]);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPartnerStores = async () => {
//       if (!affiliation) {
//         console.log("소속 단과대학의 제휴 정보가 없습니다.");
//         return;
//       }

//       setLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(
//           `${
//             import.meta.env.VITE_API_BASE_URL
//           }/partner-store?page=0&size=100&partnerCategory=${encodeURIComponent(
//             affiliation
//           )}`,
//           {
//             method: "GET",
//             headers: {
//               Accept: "application/json; charset=UTF-8",
//             },
//             credentials: "include",
//           }
//         );

//         if (!response.ok) {
//           throw new Error("제휴상점 정보를 가져오는데 실패했습니다.");
//         }

//         const data: PartnerStoreResponse = await response.json();
//         console.log("제휴상점 데이터:", data);

//         const convertedStores = data.content.map((partnerStore) =>
//           convertPartnerStoreToStore(partnerStore, currentLocation)
//         );

//         setStores(convertedStores);
//       } catch (err) {
//         console.error("제휴상점 데이터 로드 오류:", err);
//         setError(err instanceof Error ? err.message : "알 수 없는 오류");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPartnerStores();
//   }, [affiliation, currentLocation]);

//   const storesWithDistance = useMemo(() => {
//     if (!currentLocation) {
//       return stores;
//     }

//     return stores.map((store) => {
//       const distanceInM = calculateDistance(
//         currentLocation.lat,
//         currentLocation.lng,
//         store.lat,
//         store.lng
//       );

//       return {
//         ...store,
//         distanceInM,
//         distance: formatDistance(distanceInM),
//       };
//     });
//   }, [currentLocation, stores]);

//   // const filteredStores = useMemo(() => {
//   //   return storesWithDistance.filter((store) => {
//   //     let matchesCategory = true;
//   //     if (selectedCategoryName) {
//   //       const selectedCategoryMapped =
//   //         CATEGORY_MAPPING[
//   //           selectedCategoryName as keyof typeof CATEGORY_MAPPING
//   //         ];
//   //       matchesCategory = store.category === selectedCategoryMapped;
//   //     }

//   //     const matchesSearch =
//   //       searchQuery === "" ||
//   //       store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//   //       store.mainCoupon.title
//   //         .toLowerCase()
//   //         .includes(searchQuery.toLowerCase());

//   //     return matchesCategory && matchesSearch;
//   //   });
//   // }, [storesWithDistance, selectedCategoryName, searchQuery]);

//   const filteredStores = useMemo(() => {
//     return storesWithDistance.filter((store) => {
//       let matchesCategory = true;

//       if (selectedCategoryName) {
//         const selectedCategoryApiValue = CATEGORY_MAPPING[selectedCategoryName];

//         if (selectedCategoryApiValue === "") {
//           matchesCategory = true;
//         } else {
//           matchesCategory = store.category === selectedCategoryApiValue;
//         }
//       }

//       const matchesSearch =
//         searchQuery === "" ||
//         store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         store.mainCoupon.title
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase());

//       return matchesCategory && matchesSearch;
//     });
//   }, [storesWithDistance, selectedCategoryName, searchQuery]);

//   const sortedStores = useMemo(() => {
//     return [...filteredStores].sort((a, b) => {
//       return sortType === "distance"
//         ? a.distanceInM - b.distanceInM
//         : b.popularity - a.popularity;
//     });
//   }, [filteredStores, sortType]);

//   const mapMarkers = useMemo(() => {
//     const markers = [];

//     if (currentLocation) {
//       markers.push({
//         lat: currentLocation.lat,
//         lng: currentLocation.lng,
//         title: "현재 위치",
//         content: createCurrentLocationMarkerContent(),
//         id: "current-location",
//       });
//     }

//     const storeMarkers = filteredStores.map((store) => ({
//       lat: store.lat,
//       lng: store.lng,
//       title: store.name,
//       content: createStoreMarkerContent(store),
//       id: `store-${store.id}`,
//       category: store.category,
//     }));

//     markers.push(...storeMarkers);
//     return markers;
//   }, [currentLocation, filteredStores]);

//   const handleCategoryToggle = useCallback(
//     (categoryName: string) => {
//       toggleCategory(categoryName);
//       console.log(categoryName);
//     },
//     [toggleCategory]
//   );

//   const handleStoreClick = useCallback(
//     (storeId: string) => {
//       console.log("=== handleStoreClick 호출 ===");
//       console.log("storeId:", storeId);
//       console.log("타입:", typeof storeId);
//       console.log("경로:", `/store/${storeId}`);

//       if (!storeId) {
//         console.error("storeId가 없습니다!");
//         return;
//       }

//       navigate(`/store/${storeId}`);
//     },
//     [navigate]
//   );

//   const handleMarkerClick = useCallback((markerId: string) => {
//     if (markerId.startsWith("store-")) {
//       setShowBottomSheet(true);
//     }
//   }, []);

//   const handleMyLocation = useCallback(() => {
//     if (currentLocation) {
//       setMapCenter({
//         lat: currentLocation.lat,
//         lng: currentLocation.lng,
//       });
//       setMapKey((prev) => prev + 1);
//     } else {
//       getCurrentLocation();
//     }
//   }, [currentLocation, getCurrentLocation]);

//   const handleListViewStoreClick = useCallback(
//     (storeId: string) => {
//       setShowListView(false);
//       console.log(storeId);
//       handleStoreClick(storeId);
//     },
//     [handleStoreClick]
//   );

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
//         {categories.map((category) => (
//           <button
//             key={category.id}
//             onClick={() => handleCategoryToggle(category.name)}
//             className={`px-4 py-2 rounded-20 text-sm font-sf font-medium whitespace-nowrap transition-all duration-200 ${
//               isCategorySelected(category.name)
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
//                 {selectedCategoryName
//                   ? `${selectedCategoryName} 매장`
//                   : "주변 매장"}
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
//         <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-10">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => setShowListView(false)}
//               className="w-10 h-10 flex items-center justify-center"
//             >
//               <i className="ri-close-line text-text text-xl" />
//             </button>
//             <h2 className="text-lg font-sf font-semibold text-text">
//               {selectedCategoryName
//                 ? `${selectedCategoryName} 매장`
//                 : "주변 매장"}
//             </h2>
//             <div className="w-10 h-10" />
//           </div>
//         </div>

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

//       <div className="pt-40 h-screen relative">
//         <div className="w-full h-full relative overflow-hidden">
//           <NaverMapComponent
//             key={mapKey}
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
import {
  calculateMyDistance,
  calculateDistance,
  formatDistance,
} from "../../utils/distance";
import { useAuthStore } from "../../store/useAuthStore";
import { usePartnerStore } from "../../store/usePartnerStore";

// Types
interface PartnerStore {
  partnerStoreId: number;
  storeName: string;
  address: string;
  category: string;
  partnerCategory: string;
  lat: number;
  lng: number;
  phone: string;
  openingTime: string;
  closingTime: string;
  breakStartTime: string;
  breakEndTime: string;
  lastOrder: string;
  introduce: string;
  partnerBenefit: string;
  etc: string;
  sns: string;
}

interface PartnerStoreResponse {
  content: PartnerStore[];
  totalElements: number;
  totalPages: number;
}

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
  lng: 127.1320319577,
};

const CATEGORY_MAPPING: Record<string, string> = {
  단과대학: "",
  총학생회: "STUDENT_COUNCIL",
  음식점: "RESTAURANT",
  카페: "CAFE",
  주점: "BAR",
  기타: "ETC",
};

export const CATEGORY_API_MAPPING: Record<string, string> = {
  단과대학: "",
  총학생회: "STUDENT_COUNCIL",
  음식점: "RESTAURANT",
  카페: "CAFE",
  주점: "BAR",
  기타: "ETC",
};

// API 카테고리 -> 표시용 카테고리
const API_CATEGORY_TO_DISPLAY: Record<string, string> = {
  CAFE: "cafe",
  RESTAURANT: "restaurant",
  ETC: "etc",
  BAR: "bar",
  BEAUTY: "beauty",
};

const getCategoryIcon = (category: string): string => {
  const icons = {
    partner: "ri-service-fill",
    cafe: "ri-cup-fill",
    restaurant: "ri-restaurant-fill",
    bar: "ri-beer-fill",
    etc: "ri-shopping-cart-fill",
    health: "ri-heart-pulse-fill",
    beauty: "ri-scissors-cut-fill",
    default: "ri-store-fill",
  };
  return icons[category as keyof typeof icons] || icons.default;
};

const convertPartnerStoreToStore = (
  partnerStore: PartnerStore,
  currentLocation: Location | null
): Store => {
  const distanceInM = currentLocation
    ? calculateMyDistance(
        currentLocation.lat,
        currentLocation.lng,
        partnerStore.lat,
        partnerStore.lng
      )
    : 0;

  return {
    id: partnerStore.partnerStoreId.toString(),
    name: partnerStore.storeName,
    rating: 4.5,
    reviewCount: 0,
    distance: formatDistance(distanceInM),
    category: partnerStore.category,
    address: partnerStore.address,
    mainCoupon: {
      title: partnerStore.partnerBenefit || "혜택 정보 없음",
      remaining: 10,
    },
    lat: partnerStore.lat,
    lng: partnerStore.lng,
    distanceInM,
    popularity: 75,
  };
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

const createEventMarkerContent = (eventTitle: string): string => `
  <div style="padding: 12px; min-width: 150px; text-align: center;">
    <h4 style="margin: 0 0 8px 0; font-weight: bold; color: #ffd700;">🍀 ${eventTitle}</h4>
    <p style="margin: 0; font-size: 12px; color: #666;">특별 이벤트 진행중!</p>
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
        maximumAge: 300000,
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
    setSelectedCategory,
    toggleCategory,
    isCategorySelected,
  } = useCategoryStore();

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [showListView, setShowListView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState<SortType>("distance");
  const [mapCenter, setMapCenter] = useState<Location>(DEFAULT_LOCATION);
  const [mapKey, setMapKey] = useState(0);
  const [showRandomEvent, setShowRandomEvent] = useState(false);
  const { affiliation } = useAuthStore();
  const { currentLocation, getCurrentLocation } = useCurrentLocation();
  const { stores, setStores } = usePartnerStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartnerStores = async () => {
      if (!affiliation) {
        console.log("소속 단과대학의 제휴 정보가 없습니다.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/partner-store?page=0&size=100&partnerCategory=${encodeURIComponent(
            affiliation
          )}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json; charset=UTF-8",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("제휴상점 정보를 가져오는데 실패했습니다.");
        }

        const data: PartnerStoreResponse = await response.json();
        console.log("제휴상점 데이터:", data);

        const convertedStores = data.content.map((partnerStore) =>
          convertPartnerStoreToStore(partnerStore, currentLocation)
        );

        setStores(convertedStores);
      } catch (err) {
        console.error("제휴상점 데이터 로드 오류:", err);
        setError(err instanceof Error ? err.message : "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerStores();
  }, [affiliation, currentLocation]);

  const storesWithDistance = useMemo(() => {
    if (!currentLocation) {
      return stores;
    }

    return stores.map((store) => {
      const distanceInM = calculateMyDistance(
        currentLocation.lat,
        currentLocation.lng,
        store.lat,
        store.lng
      );

      return {
        ...store,
        distanceInM,
        distance: formatDistance(distanceInM),
      };
    });
  }, [currentLocation, stores]);

  const filteredStores = useMemo(() => {
    return storesWithDistance.filter((store) => {
      let matchesCategory = true;

      if (selectedCategoryName) {
        const selectedCategoryApiValue = CATEGORY_MAPPING[selectedCategoryName];

        if (selectedCategoryApiValue === "") {
          matchesCategory = true;
        } else {
          matchesCategory = store.category === selectedCategoryApiValue;
        }
      }

      const matchesSearch =
        searchQuery === "" ||
        store.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.partnerBenefit.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [storesWithDistance, selectedCategoryName, searchQuery]);

  const sortedStores = useMemo(() => {
    return [...filteredStores].sort((a, b) => {
      return sortType === "distance"
        ? a.distanceInM - b.distanceInM
        : b.popularity - a.popularity;
    });
  }, [filteredStores, sortType]);

  const mapMarkers = useMemo(() => {
    const markers = [];

    if (currentLocation) {
      markers.push({
        lat: currentLocation.lat,
        lng: currentLocation.lng,
        title: "현재 위치",
        content: createCurrentLocationMarkerContent(),
        id: "current-location",
      });
    }

    // 랜덤 이벤트 마커 추가
    if (showRandomEvent && currentLocation) {
      const eventData = [
        {
          lat: 35.84527776844245,
          lng: 127.13328332946415,
          title: "글로벌인재관 어딘가",
        },
        {
          lat: 35.84506318544666,
          lng: 127.13376448578667,
          title: "경상대학 후정 어딘가",
        },
        {
          lat: 35.84637860543523,
          lng: 127.13003627271459,
          title: "건지광장 어딘가",
        },
        {
          lat: 35.84818181967663,
          lng: 127.13146167959808,
          title: "중앙도서관 어딘가",
        },
        {
          lat: 35.844118358407925,
          lng: 127.13035635696392,
          title: "인터내셔널센터 어딘가",
        },
      ];

      markers.push(
        ...eventData.map((event, index) => ({
          lat: event.lat,
          lng: event.lng,
          title: event.title,
          content: createEventMarkerContent(event.title),
          id: `event-${index}`,
        }))
      );
    }

    const storeMarkers = filteredStores.map((store) => ({
      lat: store.lat,
      lng: store.lng,
      title: store.storeName,
      content: createStoreMarkerContent(store),
      id: `store-${store.id}`,
      category: store.category,
    }));

    markers.push(...storeMarkers);
    return markers;
  }, [currentLocation, filteredStores, showRandomEvent]);

  const handleCategoryToggle = useCallback(
    (categoryName: string) => {
      toggleCategory(categoryName);
      console.log(categoryName);
    },
    [toggleCategory]
  );

  const handleStoreClick = useCallback(
    (storeId: string) => {
      console.log("=== handleStoreClick 호출 ===");
      console.log("storeId:", storeId);
      console.log("타입:", typeof storeId);
      console.log("경로:", `/store/${storeId}`);

      if (!storeId) {
        console.error("storeId가 없습니다!");
        return;
      }

      navigate(`/store/${storeId}`);
    },
    [navigate]
  );

  const handleMarkerClick = useCallback((markerId: string) => {
    if (markerId.startsWith("store-")) {
      setShowBottomSheet(true);
    } else if (markerId.startsWith("event-")) {
      console.log("이벤트 마커 클릭:", markerId);
      // 이벤트 마커 클릭 시 동작 추가 가능
    }
  }, []);

  const handleMyLocation = useCallback(() => {
    if (currentLocation) {
      setMapCenter({
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      });
      setMapKey((prev) => prev + 1);
    } else {
      getCurrentLocation();
    }
  }, [currentLocation, getCurrentLocation]);

  const handleListViewStoreClick = useCallback(
    (storeId: number) => {
      setShowListView(false);
      console.log(storeId);
      handleStoreClick(storeId);
    },
    [handleStoreClick]
  );

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
        onClick={() => setShowRandomEvent(!showRandomEvent)}
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all ${
          showRandomEvent ? "bg-primary text-white" : "bg-white text-primary"
        }`}
        title="랜덤 이벤트 표시"
      >
        <i className="ri-gift-fill text-xl" />
      </button>
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

  // const BottomSheet = () =>
  //   showBottomSheet && (
  //     <div className="fixed inset-0 z-50 pointer-events-none">
  //       <div
  //         className="absolute inset-0 bg-black/20"
  //         onClick={() => setShowBottomSheet(false)}
  //       />
  //       <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-20 max-h-96 pointer-events-auto">
  //         <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />
  //         <div className="px-4 pb-24 overflow-y-auto">
  //           <div className="flex items-center justify-between mb-4">
  //             <h3 className="text-lg font-sf font-semibold text-text">
  //               {selectedCategoryName
  //                 ? `${selectedCategoryName} 매장`
  //                 : "주변 매장"}
  //             </h3>
  //             <button
  //               onClick={() => setShowBottomSheet(false)}
  //               className="w-8 h-8 flex items-center justify-center"
  //             >
  //               <i className="ri-close-line text-text-secondary text-xl" />
  //             </button>
  //           </div>
  //           <div className="space-y-3">
  //             {filteredStores.map((store) => (
  //               <StoreCard
  //                 key={store.id}
  //                 store={store}
  //                 onClick={() => handleStoreClick(store.id)}
  //               />
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );

  const BottomSheet = () =>
    showBottomSheet && (
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div
          className="absolute inset-0 bg-black/20 pointer-events-auto"
          onClick={() => setShowBottomSheet(false)}
        />
        <div
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-20 pointer-events-auto flex flex-col"
          style={{ maxHeight: "45vh" }}
        >
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-4 flex-shrink-0" />
          <div className="px-4 pb-4 flex-shrink-0">
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
          </div>
          <div className="px-4 pb-24 overflow-y-auto flex-1 scrollbar-hide">
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
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
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

        <div className="flex-1 overflow-y-auto pt-32 pb-20 px-4">
          <div className="space-y-3">
            {sortedStores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                showPopularity={sortType === "popularity"}
                onClick={() => handleListViewStoreClick(Number(store.id))}
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
