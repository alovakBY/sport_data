import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./routes/Router";
import { MainLayout } from "./components/MainLayout";

import { configureStore } from "./redux/configureStore";

import "./index.css";

const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MainLayout>
          <div className="center">
            <Router />
          </div>
        </MainLayout>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
