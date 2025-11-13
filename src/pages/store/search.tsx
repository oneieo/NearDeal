import { useSearchParams } from "react-router-dom";

export default function StoreSearchPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  return (
    <div>
      <h1>검색 결과 페이지</h1>
      <p>검색어: {keyword}</p>

      {/* 여기 아래에 검색된 상점 리스트 렌더링 구현하면 됨 */}
    </div>
  );
}