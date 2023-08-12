import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import DashboardLayout from "./Layout";
import NewRoot from "./routes/new/root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BotLayout from "./Layout/BotLayout";
import BotEmbedRoot from "./routes/bot/embed";
import BotPreviewRoot from "./routes/bot/playground";
import BotDSRoot from "./routes/bot/ds";
import BotSettingsRoot from "./routes/bot/settings";
import LoginRoot from "./routes/login/root";
import { AuthProvider } from "./context/AuthContext";
import SettingsRoot from "./routes/settings/root";
import BotIntegrationRoot from "./routes/bot/integrations";
import BotAppearanceRoot from "./routes/bot/appearance";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";

const router = createHashRouter([
  {
    element: (
      <DashboardLayout>
        <Root />
      </DashboardLayout>
    ),
    path: "/",
    errorElement: <div></div>,
  },
  {
    element: (
      <DashboardLayout>
        <NewRoot />
      </DashboardLayout>
    ),
    path: "/new",
    errorElement: <div></div>,

  },
  {
    path: "/bot/:id/embed",
    element: (
      <BotLayout>
        <BotEmbedRoot />
      </BotLayout>
    ),
    errorElement: <div></div>,

  },
  {
    path: "/bot/:id",
    element: (
      <BotLayout>
        <BotPreviewRoot />
      </BotLayout>
    ),
    errorElement: <div></div>,

  },
  {
    path: "/bot/:id/data-sources",
    element: (
      <BotLayout>
        <BotDSRoot />
      </BotLayout>
    ),
    errorElement: <div></div>,

  },
  {
    path: "/bot/:id/settings",
    element: (
      <BotLayout>
        <BotSettingsRoot />
      </BotLayout>
    ),
    errorElement: <div></div>,

  },
  {
    path: "/bot/:id/integrations",
    element: (
      <BotLayout>
        <BotIntegrationRoot />
      </BotLayout>
    ),
    errorElement: <div></div>,

  },
  {
    path: "/bot/:id/appearance",
    element: (
      <BotLayout>
        <BotAppearanceRoot />
      </BotLayout>
    ),
    errorElement: <div></div>,

  },
  {
    path: "/login",
    element: <LoginRoot />,
    errorElement: <div></div>,

  },
  {
    path: "/settings",
    element: (
      <DashboardLayout>
        <SettingsRoot />
      </DashboardLayout>
    ),
    errorElement: <div></div>,

  },
  {
    path: "/*",
    element: (
      <div>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    ),
    errorElement: <div></div>,
  },
]);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={{}}>
      <StyleProvider hashPriority="high">
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthProvider>
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>
);
