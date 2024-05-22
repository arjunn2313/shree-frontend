import { Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/homePage";
import Product from "./pages/product/product";
import ProductDetails from "./pages/ProductDetails/productDetails";
import Cart from "./pages/BAG/cart";
import User from "./pages/user/user";
import OTP from "./components/userAccount/OTP";
import UserProfile from "./components/userAccount/userProfile";
import Order from "./pages/order/Order";
import OrderAddrerss from "./pages/order/orderAddrerss";
import AdminDashboard from "./admin/pages/home/adminDashboard";
import UploadProduct from "./admin/pages/product/uploadProduct";
import UploadList from "./admin/pages/product/uploadList";
import AdminOrder from "./admin/pages/orders/order";
import DeliveryTracking from "./admin/pages/deliveryTracking/deliveryTracking";
import AdminStock from "./admin/pages/stocks/stock";
import AdminExpense from "./admin/pages/expense/expense";
import ReviewsAndRating from "./admin/pages/reviews&rating/review";
import AdminNav from "./admin/components/adminNav";
import SideBar from "./admin/components/sideBar";
import AdminProductDetails from "./admin/pages/product/viewProductDetails";
import NavBar from "./components/navBar/navBar";
import Footer from "./components/footer/footer";
import UserInfo from "./components/userAccount/userInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Buynow from "./pages/buynow/buynow";
import MyOrders from "./pages/Myorders/myOrders";
import Advertisement from "./admin/pages/advertisment/Addadvertisement";
import ViewAllAdvertisment from "./admin/pages/advertisment/viewAll";
import SingleOrder from "./admin/pages/orders/singleOrder";
import AdminLogin from "./admin/pages/Adminlogin/AdminLogin";
import EditProduct from "./admin/pages/product/EditProduct";
import Update from "./admin/pages/product/Update";
import Question from "./components/customerQustion/question";
import ContactForm from "./components/contactform/contactForm";
import LoginPageUser from "./pages/user/loginPage";
import Wishlist from "./pages/wishlist/wishlist";
import { AdminPrivateRoute, PageNotFound } from "./routes/protectRoute";
import { AdminProtectedRoute } from "./routes/privateRoute";
import SingleOrderInvoice from "./admin/pages/orders/singleOrderInvoice";
import Notification from "./admin/pages/notification/notification";

function App() {
  const UserLayout = () => {
    return (
      <>
        <div>
          <NavBar />
        </div>
        <div>
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      </>
    );
  };

  const AdminLayout = () => {
    return (
      <div>
        <AdminNav />
        <div className="menu-home">
          <div className="dash-con">
            <SideBar />

            <div
              className="dash "
              style={{ overflow: "scroll", height: "87vh" }}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* User routes */}
        <Route element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="user-account" element={<UserInfo />} />
          <Route path="products-list" element={<Product />} />
          <Route path="products-list/:id" element={<Product />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path=":id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="faqs" element={<Question />} />
          <Route path="login" element={<LoginPageUser />} />
          <Route path="contact" element={<ContactForm />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="order" element={<Buynow />} />
          <Route path="myorders" element={<MyOrders />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="admin/login"
          element={
            <AdminProtectedRoute>
              <AdminLogin />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="admin/"
          element={
            <AdminPrivateRoute>
              <AdminLayout />
            </AdminPrivateRoute>
          }
        >
          <Route
            index
            element={
              <AdminPrivateRoute>
                {" "}
                <AdminDashboard />
              </AdminPrivateRoute>
            }
          />
          <Route path="upload-product" element={<UploadList />} />
          <Route
            path="upload-product/add/view"
            element={<AdminProductDetails />}
          />
          <Route
            path="upload-product/add/:id"
            element={<AdminProductDetails />}
          />
          <Route path="upload-product/edit/:action/:id" element={<Update />} />
          <Route path="upload-product/add" element={<UploadProduct />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="orders/detailed-view/:id" element={<SingleOrder />} />
          <Route path="orders/detailed-view/:id/invoice" element={<SingleOrderInvoice/>} />
          <Route path="delivery-and-tracking" element={<DeliveryTracking />} />
          <Route path="stock" element={<AdminStock />} />
          <Route path="expense" element={<AdminExpense />} />
          <Route path="reviewsandratings" element={<ReviewsAndRating />} />
          <Route path="advertisement" element={<ViewAllAdvertisment />} />
          <Route path="advertisement/add" element={<Advertisement />} />
          <Route path="advertisement/add/:id" element={<Advertisement />} />
          <Route path="notification" element={<Notification />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
