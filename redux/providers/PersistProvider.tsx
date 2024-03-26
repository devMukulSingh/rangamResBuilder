"use client";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "../store/store";

export default function PersistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const persistor = persistStore(store);
  return <PersistGate persistor={persistor}>{children}</PersistGate>;
}
