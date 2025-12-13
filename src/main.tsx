import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import AppRouter from "./routes/AppRouter.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store} from "./store.ts"
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
);
