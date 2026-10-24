import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashBoard";
import DashboardHome from "./pages/DashboardHome";
import Employee from "./pages/Employee";
import AddEmp from "./pages/AddEmp";
import { AuthProvider, useAuth } from "./pages/context/AuthContext";
import HelpSupport from "./pages/HelpSupport";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login  />
          )
        }
      />

      <Route
        element={
          user ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employee/add" element={<AddEmp />} />
        <Route path="/employee/edit/:id" element={<AddEmp />} />
        <Route path="/help" element={<HelpSupport/>}/>
      </Route>
      <Route
        path="*"
        element={
          <Navigate
            to={user ? "/dashboard" : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}