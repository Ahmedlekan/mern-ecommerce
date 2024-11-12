import HomePage from "./pages/general-view/HomePage"
import SignUp from  "./pages/authentication/SignUp"
import SignIn from "./pages/authentication/SignIn"
import Layout from "./component/general-view/Layout"
import AdminLayout from "./component/admin-view/AdminLayout"
import AdminDashboard from "./pages/admin-view/Dashboard"
// import ProtectedRoute from "./component/ProtectedRoute"
import AdminFeatures from "./pages/admin-view/Features"
import AdminOrders from "./pages/admin-view/Orders"
import AdminProducts from "./pages/admin-view/Product"
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import { Skeleton } from "./component/ui/Skeleton"
import { useAppContext } from "./contexts/AppContext"
import Account from "./pages/general-view/Account"
import Checkout from "./pages/general-view/Checkout"
import ProductDetails from "./pages/general-view/ProductDetails"
import ProductCategory from "./pages/general-view/ProductCategory"
import Favorites from "./pages/general-view/Favorites"


const AuthenticatedLayout = () => (
  <>
    <Outlet />
  </>
);

function App() {

  const {isLoggedIn, isLoading} = useAppContext()
  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  return (
    <div>

      <Router>
        
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="login" element={<SignIn />} />
            <Route path="product/:productId" element={<ProductDetails />} />
            <Route path="product-category/" element={<ProductCategory />} />
            <Route path="favorite" element={<Favorites />} />

            {isLoggedIn && (
              <Route element={<AuthenticatedLayout />}>
                <Route path="account" element={<Account/>} />
                <Route path="checkout" element={<Checkout/>} />
              </Route>
            )}
          </Route>

          {isLoggedIn && (
            <Route path="admin" 
              element={
                
                  <AdminLayout />
                }
              >

              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="features" element={<AdminFeatures />} />
            </Route>
          )}
          
        </Routes>
      
      </Router>
      
    </div>
  )
}

export default App
