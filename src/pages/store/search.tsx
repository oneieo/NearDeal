import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TopNavigation from "../../components/feature/TopNavigation";
import BottomNavigation from "../../components/feature/BottomNavigation";
import Card from "../../components/base/Card";
import type { PartnerStore } from "../../types/partnerStoreType";
import { useAuthStore } from "../../store/useAuthStore";

export default function StoreSearchPage() {
  const { affiliation } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const [loading, setLoading] = useState(false);
  const [stores, setLocalStores] = useState<PartnerStore[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 전체 상점 목록 API
  const fetchAllStores = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!affiliation) {
        setError("소속 대학 정보가 없습니다.");
        return [];
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/partner-store?page=0&size=100&partnerCategory=${encodeURIComponent(
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

      const data = await response.json();
      return data.content || [];
    } catch (err) {
      console.error("검색 리스트 로드 오류:", err);
      setError("검색 결과를 불러오는 중 오류가 발생했습니다.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // 검색 기능
  const searchStores = async () => {
    const allStores = await fetchAllStores();

    const filtered = allStores.filter((store) =>
      store.storeName.toLowerCase().includes(keyword.toLowerCase())
    );

    setLocalStores(filtered);
  };

  useEffect(() => {
    if (keyword) searchStores();
  }, [keyword]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavigation 
        title="검색 결과" 
        leftAction={
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center"
          >
            <i className="ri-arrow-left-line text-text text-xl" />
          </button>
        }
      />

      <div className="pt-20 px-4 space-y-4">
        <h2 className="text-lg font-sf font-semibold">"{keyword}" 검색 결과</h2>

        {loading && <p>불러오는 중...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {stores.length > 0 ? (
          <div className="space-y-3">
            {stores.map((store) => (
              <Card
                key={store.partnerStoreId}
                className="p-4 cursor-pointer hover:shadow-md transition-all"
                onClick={() => navigate(`/store/${store.partnerStoreId}`)}
              >
                {/* 가게 이름 */}
                <h3 className="font-sf font-bold text-text text-lg">{store.storeName}</h3>
                
                {/* 가게 주소 */}
                <div className="flex items-center gap-1 mt-1 mb-3">
                  <i className="ri-map-pin-line text-text-secondary text-xs" />
                  <p className="text-sm text-text-secondary">{store.address}</p>
                </div>

                {/* [수정] 제휴 혜택 대신 제휴 주체(partnerCategory) 표시 */}
                <div className="flex items-center">
                  <span className="bg-primary/10 text-primary text-xs font-sf font-bold px-2 py-1.5 rounded-8 flex items-center gap-1">
                    <i className="ri-shake-hands-line"></i>
                    {store.partnerCategory} 제휴
                  </span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          !loading &&
          !error && <p className="text-text-secondary">검색 결과가 없습니다.</p>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
