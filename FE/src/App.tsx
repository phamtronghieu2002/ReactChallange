import { BrowserRouter, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/route";
import { ToastContainer } from "react-toastify";
import React from "react";
import "./app.scss";
import ProtectedRoute from "@/routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = route?.layout || React.Fragment;
          const Component = route?.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={<Layout>{Component ? <Component /> : null}</Layout>}
            />
          );
        })}

        {privateRoutes.map((route, index) => {
          const Layout = route?.layout || React.Fragment;
          const Component = route?.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  {Component ? (
                    <ProtectedRoute
                      roles={route.roles || []}
                      component={<Component />}
                    />
                  ) : null}
                </Layout>
              }
            />
          );
        })}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
