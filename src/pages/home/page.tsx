import TopNavigation from "../../components/feature/TopNavigation";
import BottomNavigation from "../../components/feature/BottomNavigation";
import Card from "../../components/base/Card";
import Button from "../../components/base/Button";
import { useCategoryStore } from "../../store/useCategoryStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Coupon {
  id: string;
  title: string;
  description: string;
  discount: string;
  store: string;
  category: string;
  expiresAt: string;
  image: string;
}

const featuredCoupons: Coupon[] = [
  {
    id: "1",
    title: "치킨 2마리 22% 할인",
    description: "교촌치킨 신메뉴 출시 기념",
    discount: "50%",
    store: "교촌치킨 전북대점",
    category: "음식",
    expiresAt: "2025-09-30",
    image:
      "https://readdy.ai/api/search-image?query=Korean%20fried%20chicken%20on%20white%20background%2C%20appetizing%20golden%20crispy%20chicken%20pieces%2C%20restaurant%20food%20photography%2C%20clean%20minimalist%20style%2C%20soft%20lighting%2C%20high%20quality%20commercial%20photo&width=300&height=200&seq=chicken1&orientation=landscape",
  },
  {
    id: "2",
    title: "아메리카노 사이즈 업",
    description: "스타벅스 신규 고객 혜택",
    discount: "Size Up",
    store: "스타벅스 전북대병원점",
    category: "카페",
    expiresAt: "2025-12-25",
    image:
      "https://readdy.ai/api/search-image?query=Premium%20coffee%20americano%20in%20white%20cup%20on%20clean%20white%20background%2C%20steam%20rising%2C%20minimalist%20cafe%20style%2C%20professional%20product%20photography%2C%20warm%20lighting&width=300&height=200&seq=coffee1&orientation=landscape",
  },
  {
    id: "3",
    title: "헤어컷 20% 할인",
    description: "살롱드빌리지 개강 이벤트",
    discount: "30%",
    store: "살롱드빌리지하우스",
    category: "뷰티",
    expiresAt: "2025-09-30",
    image:
      "https://readdy.ai/api/search-image?query=Modern%20hair%20salon%20interior%20with%20styling%20chair%20and%20mirrors%2C%20clean%20white%20background%2C%20professional%20salon%20equipment%2C%20minimalist%20beauty%20salon%20design%2C%20bright%20lighting&width=300&height=200&seq=salon1&orientation=landscape",
  },
];

const hotDeals: Coupon[] = [
  {
    id: "4",
    title: "마라탕 20% 할인",
    description: "전북대 인기 마라탕집",
    discount: "20%",
    store: "미미마라 전북대점",
    category: "음식",
    expiresAt: "2025-10-01",
    image:
      "https://readdy.ai/api/search-image?query=Spicy%20maratang%20hot%20pot%20with%20vegetables%20and%20noodles%20on%20white%20background%2C%20Korean-Chinese%20fusion%20food%2C%20steam%20effect%2C%20appetizing%20restaurant%20photography&width=200&height=150&seq=maratang1&orientation=landscape",
  },
  {
    id: "5",
    title: "네일아트 40% 할인",
    description: "젤네일 전 메뉴 할인",
    discount: "40%",
    store: "네일데이유",
    category: "뷰티",
    expiresAt: "2024-12-29",
    image:
      "https://readdy.ai/api/search-image?query=Beautiful%20manicured%20hands%20with%20colorful%20nail%20art%20on%20white%20background%2C%20professional%20nail%20salon%20photography%2C%20elegant%20finger%20positioning%2C%20soft%20lighting&width=200&height=150&seq=nail1&orientation=landscape",
  },
];

export default function Home() {
  const {
    categories,
    selectedCategoryName,
    setSelectedCategory,
    isCategorySelected,
    getSelectedCategory,
  } = useCategoryStore();
  const navigate = useNavigate();

  const handleClickCategoryBtn = (name: string) => {
    setSelectedCategory(name);
    console.log(getSelectedCategory()?.name);
    navigate("/map");
  };

  useEffect(() => {
    if (selectedCategoryName !== "") {
      setSelectedCategory("");
    }
  }, []);

  useEffect(() => {
    // 세션 스토리지에서 로그인 여부 확인하고
    // 로그인 했으면 홈(/) 리다이렉트
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 상단 네비게이션 */}
      <TopNavigation
        leftAction={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-map-pin-fill text-primary text-xl" />
            </div>
            <div>
              <p className="text-xs text-text-secondary font-sf">현재 위치</p>
              <p className="text-sm font-sf font-medium text-text">
                전주시 덕진구
              </p>
            </div>
          </div>
        }
        rightAction={
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center">
              <i className="ri-notification-fill text-text-secondary text-xl" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center">
              <i className="ri-menu-fill text-text-secondary text-xl" />
            </button>
          </div>
        }
        showBorder={false}
      />

      {/* 메인 콘텐츠 */}
      <div className="pt-20 px-4 space-y-6">
        {/* 헤더 섹션 */}
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-sf font-bold text-text mb-1">
              안녕하세요! 👋
            </h1>
            <p className="text-text-secondary font-sf">
              오늘도 최고의 할인 혜택을 찾아보세요
            </p>
          </div>

          {/* 검색바 */}
          <div className="relative">
            <input
              type="text"
              placeholder="상점명이나 할인 상품을 검색해보세요"
              className="w-full h-12 pl-12 pr-4 bg-white rounded-16 border border-gray-200 text-sm font-sf placeholder-text-secondary focus:outline-none focus:border-primary"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
              <i className="ri-search-line text-text-secondary" />
            </div>
          </div>
        </div>

        {/* 카테고리 */}
        <div className="space-y-4">
          <h2 className="text-lg font-sf font-semibold text-text">카테고리</h2>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleClickCategoryBtn(category.name)}
                className={`p-4 rounded-16 transition-all duration-200 ${
                  isCategorySelected(category.name)
                    ? "bg-primary text-white shadow-md"
                    : "bg-white shadow-sm hover:shadow-md"
                }`}
              >
                <div
                  className={`w-8 h-8 mx-auto mb-2 flex items-center justify-center rounded-8 ${
                    isCategorySelected(category.id)
                      ? "bg-white/20"
                      : category.color
                  }`}
                >
                  <i
                    className={`${category.icon} text-lg ${
                      isCategorySelected(category.id) ? "text-white" : ""
                    }`}
                  />
                </div>
                <p
                  className={`text-sm font-sf font-medium ${
                    isCategorySelected(category.id) ? "text-white" : "text-text"
                  }`}
                >
                  {category.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* 인기 쿠폰 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-sf font-semibold text-text">
              🔥 인기 쿠폰
            </h2>
            <button className="text-sm font-sf text-primary">더보기</button>
          </div>

          <div className="space-y-3">
            {featuredCoupons.map((coupon) => (
              <Card key={coupon.id} className="overflow-hidden">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-12 overflow-hidden flex-shrink-0">
                    <img
                      src={coupon.image}
                      alt={coupon.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-sf font-semibold text-text text-sm leading-tight">
                        {coupon.title}
                      </h3>
                      <span className="bg-primary text-white text-xs font-sf font-bold px-2 py-1 rounded-8 ml-2">
                        {coupon.discount}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary font-sf mb-2">
                      {coupon.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-text-secondary font-sf">
                        {coupon.store}
                      </p>
                      <p className="text-xs text-accent font-sf">
                        {new Date(coupon.expiresAt).toLocaleDateString("ko-KR")}
                        까지
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 오늘의 특가 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-sf font-semibold text-text">
              ⚡ 오늘의 특가
            </h2>
            <button className="text-sm font-sf text-primary">더보기</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {hotDeals.map((deal) => (
              <Card key={deal.id} className="overflow-hidden">
                <div className="space-y-3">
                  <div className="relative">
                    <div className="w-full h-24 rounded-12 overflow-hidden">
                      <img
                        src={deal.image}
                        alt={deal.title}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <span className="absolute top-2 right-2 bg-accent text-white text-xs font-sf font-bold px-2 py-1 rounded-8">
                      {deal.discount}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-sf font-semibold text-text text-sm leading-tight">
                      {deal.title}
                    </h3>
                    <p className="text-xs text-text-secondary font-sf">
                      {deal.store}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 하단 CTA */}
        <div className="pt-4 pb-6">
          <Button
            fullWidth
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-dark"
          >
            <i className="ri-coupon-fill" />내 쿠폰함 확인하기
          </Button>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <BottomNavigation />
    </div>
  );
}
