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
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Wishlist from "./pages/wishlist";
import Buynow from "./pages/buynow/buynow";
import MyOrders from "./pages/Myorders/myOrders";
import Advertisement from "./admin/pages/advertisment/Addadvertisement";
import ViewAllAdvertisment from "./admin/pages/advertisment/viewAll";
import SingleOrder from "./admin/pages/orders/singleOrder";
import AdminLogin from "./admin/pages/Adminlogin/AdminLogin";
 
 

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

            <div className="dash ">
              <Outlet/>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
       <ToastContainer/>
      {/* user */}
      <Routes>
        <Route path="/" element={<UserLayout/>}>
          <Route index element={<HomePage/>}/>
          <Route exact path="user-account" element={<UserInfo />}/> 
          <Route path="products-list" element={<Product/>}/>
          <Route path="/wishlist" element={<Wishlist />}/> 
           <Route path=":id" element={<ProductDetails/>}/>
           <Route exact path="/cart" element={<Cart />}/> 
          
           <Route path="/profile" element={<UserProfile />}/> 
         
           <Route path="/order" element={<Buynow />}></Route>
           <Route path="/myorders" element={<MyOrders/>}></Route>
        </Route>
        {/* <Route exact path="/" element={<HomePage />}></Route>
        <Route exact path="/products-list" element={<Product />}></Route>
        <Route exact path="/:id" element={<ProductDetails/>}></Route>
        <Route exact path="/cart" element={<Cart />}></Route>
        <Route exact path="/user-account" element={<User />}></Route>
        <Route path="/otp" element={<OTP />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/order1" element={<OrderAddrerss />}></Route> */}

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLogin/>}></Route>
        <Route path="/admin/" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="upload-product" element={<UploadList />} />
          <Route path="upload-product/add/:id" element={<AdminProductDetails />} />
          <Route path="upload-product/add" element={<UploadProduct />} />
          {/* <Route path="upload-product/add/:id" element={<UploadProduct />} /> */}
          <Route path="orders" element={<AdminOrder />} />
          <Route path="orders/detailed-view/:id" element={<SingleOrder />} />
          <Route path="delivery-and-tracking" element={<DeliveryTracking />} />
          <Route path="stock" element={<AdminStock />} />
          <Route path="expense" element={<AdminExpense />} />
          <Route path="reviewsandratings" element={<ReviewsAndRating />} />
          <Route path="advertisement" element={<ViewAllAdvertisment/>} />
          <Route path="advertisement/add" element={<Advertisement/>} />
          <Route path="advertisement/add/:id" element={<Advertisement/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
