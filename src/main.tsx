import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { persister, queryClient } from "./react-query/queryClient";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
  </StrictMode>
);
