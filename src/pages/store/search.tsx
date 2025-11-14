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
      <TopNavigation title="검색 결과" />

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
                <h3 className="font-sf font-bold text-text">{store.storeName}</h3>
                <p className="text-sm text-text-secondary">{store.address}</p>
                <p className="text-sm text-primary font-medium mt-1">
                  {store.partnerBenefit}
                </p>
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
