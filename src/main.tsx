import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { persister, queryClient } from "./react-query/queryClient";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import RootLayout from "./layout/rootLayout/root-layout";
import Login from "./pages/login/login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SignUp from "./pages/sign-up/sign-up";
import CreateAccountSuccess from "./pages/create-account-success/create-account-success";
import useAuth from "./custom-hook/useAuth";
import ProtectedRouteLayout from "./layout/rootLayout/protected-root-layout";
import CreateProduct from "./pages/create-product/create-product";

const router = createBrowserRouter([
  {
    element: <RootLayout />, // This wraps all child routes
    children: [
      {
        path: "/",
        element: <div></div>,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/create-account-success",
        element: <CreateAccountSuccess />,
      },
      {
        element: <ProtectedRouteLayout />,
        children: [
          {
            path: "/create-product",
            element: <CreateProduct />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}
        >
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </PersistQueryClientProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
