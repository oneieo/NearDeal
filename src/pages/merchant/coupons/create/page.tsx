import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../../../../components/feature/TopNavigation';
import Button from '../../../../components/base/Button';
import Card from '../../../../components/base/Card';

export default function MerchantCouponCreatePage() {
  const navigate = useNavigate();

  // 폼 상태
  const [couponForm, setCouponForm] = useState({
    title: '',
    description: '',
    discountType: 'percentage', // 'percentage' | 'amount'
    discountValue: '',
    validUntil: '',
    totalCount: '50',
    selectedMenus: [] as string[],
    applyToAllMenus: false,
  });
  const [showMenuSelector, setShowMenuSelector] = useState(false);

  // (예시) 메뉴 목록 — 실제로는 API/상태관리 연동 가능
  const menuItems = [
    { id: '1', name: '아메리카노', category: '음료' },
    { id: '2', name: '카페라떼', category: '음료' },
    { id: '3', name: '카푸치노', category: '음료' },
    { id: '4', name: '에스프레소', category: '음료' },
    { id: '5', name: '초콜릿 머핀', category: '디저트' },
    { id: '6', name: '크로와상', category: '디저트' },
    { id: '7', name: '치즈케이크', category: '디저트' },
    { id: '8', name: '아보카도 토스트', category: '브런치' },
    { id: '9', name: '그릭 샐러드', category: '샐러드' },
  ];

  // 핸들러들
  const handleMenuToggle = (menuId: string) => {
    if (couponForm.applyToAllMenus) return;
    setCouponForm((prev) => ({
      ...prev,
      selectedMenus: prev.selectedMenus.includes(menuId)
        ? prev.selectedMenus.filter((id) => id !== menuId)
        : [...prev.selectedMenus, menuId],
    }));
  };

  const handleAllMenusToggle = () => {
    setCouponForm((prev) => ({
      ...prev,
      applyToAllMenus: !prev.applyToAllMenus,
      selectedMenus: !prev.applyToAllMenus ? [] : prev.selectedMenus,
    }));
  };

  const handleCouponCreate = () => {
    if (!couponForm.title || !couponForm.description || !couponForm.discountValue) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }
    if (!couponForm.applyToAllMenus && couponForm.selectedMenus.length === 0) {
      alert('적용할 메뉴를 선택해주세요.');
      return;
    }

    // TODO: 실제 생성 API 연동
    alert('쿠폰이 성공적으로 생성되었습니다! 🎉');

    // 생성 후 쿠폰 목록으로 이동
    navigate('/merchant/coupons');
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation
        title="쿠폰 생성"
        leftAction={
          <button
            onClick={() => navigate('/merchant/coupons')}
            className="w-10 h-10 flex items-center justify-center"
          >
            <i className="ri-arrow-left-line text-text text-xl" />
          </button>
        }
      />

      <div className="pt-20 px-4 pb-24 space-y-4">
        <Card className="p-4 space-y-4">
          {/* 쿠폰 제목 */}
          <div>
            <label className="block text-sm font-sf font-medium text-text mb-2">쿠폰 제목 *</label>
            <input
              type="text"
              value={couponForm.title}
              onChange={(e) => setCouponForm({ ...couponForm, title: e.target.value })}
              placeholder="예: 신규고객 할인"
              className="w-full p-3 border border-gray-200 rounded-xl focus:border-primary focus:outline-none text-sm font-sf"
            />
          </div>

          {/* 쿠폰 설명 */}
          <div>
            <label className="block text-sm font-sf font-medium text-text mb-2">쿠폰 설명 *</label>
            <textarea
              value={couponForm.description}
              onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
              placeholder="예: 첫 방문 고객 대상 특별 할인"
              rows={3}
              className="w-full p-3 border border-gray-200 rounded-xl focus:border-primary focus:outline-none text-sm font-sf resize-none"
            />
          </div>

          {/* 할인 유형 */}
          <div>
            <label className="block text-sm font-sf font-medium text-text mb-2">할인 유형</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCouponForm({ ...couponForm, discountType: 'percentage' })}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-sf font-medium transition-all ${
                  couponForm.discountType === 'percentage'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary'
                }`}
              >
                퍼센트(%)
              </button>
              <button
                type="button"
                onClick={() => setCouponForm({ ...couponForm, discountType: 'amount' })}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-sf font-medium transition-all ${
                  couponForm.discountType === 'amount'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary'
                }`}
              >
                금액(원)
              </button>
            </div>
          </div>

          {/* 할인값 */}
          <div>
            <label className="block text-sm font-sf font-medium text-text mb-2">할인값 *</label>
            <div className="relative">
              <input
                type="number"
                value={couponForm.discountValue}
                onChange={(e) => setCouponForm({ ...couponForm, discountValue: e.target.value })}
                placeholder={couponForm.discountType === 'percentage' ? '20' : '5000'}
                className="w-full p-3 pr-12 border border-gray-200 rounded-xl focus:border-primary focus:outline-none text-sm font-sf"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary text-sm font-sf">
                {couponForm.discountType === 'percentage' ? '%' : '원'}
              </span>
            </div>
          </div>

          {/* 만료일 */}
          <div>
            <label className="block text-sm font-sf font-medium text-text mb-2">만료일</label>
            <input
              type="date"
              value={couponForm.validUntil}
              onChange={(e) => setCouponForm({ ...couponForm, validUntil: e.target.value })}
              className="w-full p-3 border border-gray-200 rounded-xl focus:border-primary focus:outline-none text-sm font-sf"
            />
          </div>

          {/* 발행 수량 */}
          <div>
            <label className="block text-sm font-sf font-medium text-text mb-2">발행 수량</label>
            <input
              type="number"
              value={couponForm.totalCount}
              onChange={(e) => setCouponForm({ ...couponForm, totalCount: e.target.value })}
              placeholder="50"
              className="w-full p-3 border border-gray-200 rounded-xl focus:border-primary focus:outline-none text-sm font-sf"
            />
          </div>

          {/* 적용 메뉴 */}
          <div>
            <label className="block text-sm font-sf font-medium text-text mb-2">적용 메뉴 *</label>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                <input
                  type="checkbox"
                  id="allMenus"
                  checked={couponForm.applyToAllMenus}
                  onChange={handleAllMenusToggle}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="allMenus" className="text-sm font-sf text-text">
                  전체 메뉴에 적용
                </label>
              </div>

              {!couponForm.applyToAllMenus && (
                <div>
                  <button
                    type="button"
                    onClick={() => setShowMenuSelector(!showMenuSelector)}
                    className="w-full p-3 border border-gray-200 rounded-xl text-left text-sm font-sf text-text-secondary flex items-center justify-between"
                  >
                    <span>
                      {couponForm.selectedMenus.length > 0
                        ? `${couponForm.selectedMenus.length}개 메뉴 선택됨`
                        : '메뉴를 선택하세요'}
                    </span>
                    <i className={`ri-arrow-${showMenuSelector ? 'up' : 'down'}-s-line text-xl`} />
                  </button>

                  {showMenuSelector && (
                    <div className="mt-2 border border-gray-200 rounded-xl max-h-48 overflow-y-auto">
                      {menuItems.map((menu) => (
                        <div
                          key={menu.id}
                          className="flex items-center gap-3 p-3 border-b border-gray-100 last:border-b-0"
                        >
                          <input
                            type="checkbox"
                            id={`menu-${menu.id}`}
                            checked={couponForm.selectedMenus.includes(menu.id)}
                            onChange={() => handleMenuToggle(menu.id)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <label
                            htmlFor={`menu-${menu.id}`}
                            className="flex-1 text-sm font-sf text-text"
                          >
                            {menu.name}
                          </label>
                          <span className="text-xs text-text-secondary bg-gray-100 px-2 py-1 rounded-full">
                            {menu.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* 하단 액션 */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate('/merchant/coupons')}
          >
            임시 저장
          </Button>
          <Button fullWidth onClick={handleCouponCreate}>
            쿠폰 발행
          </Button>
        </div>
      </div>
    </div>
  );
}
