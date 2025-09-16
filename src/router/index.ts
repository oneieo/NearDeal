// import { useNavigate, type NavigateFunction } from "react-router-dom";
// import { useRoutes } from "react-router-dom";
// import { useEffect } from "react";
// import routes from "./config";

// let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;

// declare global {
//   interface Window {
//     REACT_APP_NAVIGATE: ReturnType<typeof useNavigate>;
//   }
// }

// export const navigatePromise = new Promise<NavigateFunction>((resolve) => {
//   navigateResolver = resolve;
// });

// export function AppRoutes() {
//   const element = useRoutes(routes);
//   if (!window.REACT_APP_NAVIGATE) {
//     const navigate = useNavigate();
//     useEffect(() => {
//       window.REACT_APP_NAVIGATE = navigate;
//       navigateResolver(window.REACT_APP_NAVIGATE);
//     });
//   }
//   return element;
// }
import { useNavigate } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import routes from "./config";

let navigateResolver: (navigate: ReturnType<typeof useNavigate>) => void;

declare global {
  interface Window {
    REACT_APP_NAVIGATE: ReturnType<typeof useNavigate>;
  }
}

export const navigatePromise = new Promise<ReturnType<typeof useNavigate>>(
  (resolve) => {
    navigateResolver = resolve;
  }
);

export function AppRoutes() {
  const element = useRoutes(routes);
  const navigate = useNavigate(); // ✅ 최상위에서 hook 호출

  useEffect(() => {
    if (!window.REACT_APP_NAVIGATE) {
      window.REACT_APP_NAVIGATE = navigate;
      navigateResolver(navigate);
    }
  }, [navigate]); // ✅ 의존성 배열 추가

  return element;
}
