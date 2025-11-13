import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { PartnerStore } from "../../types/partnerStoreType"; // 타입 적용
import TopNavigation from "../../components/feature/TopNavigation";
import BottomNavigation from "../../components/feature/BottomNavigation";
import Card from "../../components/base/Card";

export default function StoreSearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState<PartnerStore[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 🔍 검색 API 호출
  const fetchStores = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/partner-stores/search?keyword=${keyword}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("검색 결과를 불러오지 못했습니다.");

      const data = await res.json();

      // API 응답 구조가 { content: [] } 형태라면
      const list = data.content ? data.content : data;

      setStores(list);
    } catch (err) {
      setError("검색 결과를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyword) fetchStores();
  }, [keyword]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavigation title="검색 결과" />

      <div className="pt-20 px-4 space-y-4">
        <h2 className="text-lg font-sf font-semibold">
          "{keyword}" 검색 결과
        </h2>

        {loading && <p>불러오는 중...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* 🔥 검색 결과 리스트 출력 */}
        {stores.length > 0 ? (
          <div className="space-y-3">
            {stores.map((store) => (
              <Card
                key={store.partnerStoreId}
                className="p-4 cursor-pointer hover:shadow-md transition-all"
                onClick={() => navigate(`/store/${store.partnerStoreId}`)}
              >
                <h3 className="font-sf font-bold text-text">
                  {store.storeName}
                </h3>

                <p className="text-sm text-text-secondary">
                  {store.address}
                </p>

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