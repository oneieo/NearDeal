import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface CategoryState {
  selectedCategoryId: string;
  selectedCategoryName: string;
  categories: Category[];

  setSelectedCategory: (categoryName: string) => void;
  clearSelectedCategory: () => void;
  toggleCategory: (categoryName: string) => void;

  getSelectedCategory: () => Category | null;
  isCategorySelected: (categoryName: string) => boolean;
}

const defaultCategories: Category[] = [
  {
    id: "1",
    name: "즐겨찾기",
    icon: "ri-star-fill",
    color: "bg-red-100 text-red-600",
  },
  {
    id: "2",
    name: "제휴",
    icon: "ri-service-fill",
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: "3",
    name: "음식점",
    icon: "ri-restaurant-fill",
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: "4",
    name: "카페",
    icon: "ri-cup-fill",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "5",
    name: "헤어샵",
    icon: "ri-scissors-cut-fill",
    color: "bg-green-100 text-green-600",
  },
  {
    id: "6",
    name: "마트",
    icon: "ri-shopping-bag-fill",
    color: "bg-purple-100 text-purple-600",
  },
  //   {
  //     id: "5",
  //     name: "편의점",
  //     icon: "ri-light-fill",
  //     color: "bg-green-100 text-green-600",
  //   },
];

export const useCategoryStore = create<CategoryState>()(
  devtools(
    (set, get) => ({
      selectedCategoryId: "",
      selectedCategoryName: "",
      categories: defaultCategories,

      // 카테고리 선택
      setSelectedCategory: (categoryName: string) =>
        set(
          { selectedCategoryName: categoryName },
          false,
          "setSelectedCategory"
        ),

      // 카테고리 선택 해제
      clearSelectedCategory: () =>
        set({ selectedCategoryName: "" }, false, "clearSelectedCategory"),

      // 카테고리 토글 (선택된 것을 다시 클릭하면 해제)
      toggleCategory: (categoryName: string) => {
        const { selectedCategoryName } = get();
        set(
          {
            selectedCategoryName:
              selectedCategoryName === categoryName ? "" : categoryName,
          },
          false,
          "toggleCategory"
        );
      },

      // 선택된 카테고리 객체 반환
      getSelectedCategory: () => {
        const { selectedCategoryName, categories } = get();
        return (
          categories.find((cat) => cat.name === selectedCategoryName) || null
        );
      },

      // 카테고리 선택 여부 확인
      isCategorySelected: (categoryName: string) => {
        const { selectedCategoryName } = get();
        return selectedCategoryName === categoryName;
      },
    }),
    {
      name: "category-store",
    }
  )
);
