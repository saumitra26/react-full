import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { bookAPI } from "../src/services/bookAPI";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { writerApi } from "../src/services/writerAPI";
type RenderOptions = {
  route?: string;
  path?: string;
}
export const renderWithProviders = (ui: React.ReactElement, { route = "/book/2", path = "/book/:id" }: RenderOptions = {}) => {
  const store = configureStore({
    reducer: {
      [bookAPI.reducerPath]: bookAPI.reducer,
       [writerApi.reducerPath]:writerApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(bookAPI.middleware).concat(writerApi.middleware),
  });
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path={ path} element={ui} />
          <Route path="/book" element={<div>Book List Page</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};
