import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/rootReducer";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  // Optional: Add whitelist/blacklist for specific reducers
  // whitelist: ['auth'],
  // blacklist: ['temporaryData'],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // Optional: Enable Redux DevTools configuration
});

// Create persistor
const persistor = persistStore(store);

// Infer the RootState type
export type RootState = ReturnType<typeof store.getState>;

// Export store, persistor, and types
export { store, persistor };
export type AppDispatch = typeof store.dispatch;
