// import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast';
import ProductDetail from './components/product/ProductDetail';
import ProductSearch from './components/product/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect, useState } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/cart/OrderSuccess';
import UserOrders from './components/order/UserOrders';
import OrderDetail from './components/order/OrderDetail';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ReviewList from './components/admin/ReviewList';
import { Blocked } from './components/user/Blocked';
import ImpersonationBanner from './components/admin/ImpersonationBanner';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("")
  useEffect(() => {
    store.dispatch(loadUser)
    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])

  return (
      <div className="App min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <div className='absolute inset-0 overflow-hidden'>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.6)_0%,rgba(10,80,60,0.4)_0%,rgba(0,0,0,0.1)_100%)]"></div>
          </div>
        </div>
        <div className="relative z-50 pt-20 min-h-screen">
          <Router>
            <HelmetProvider>
                <Header/>
                <ImpersonationBanner/>
                    <div className='w-full max-w-6xl mx-auto h-full p-4'>
                      <Toaster position="top-center" reverseOrder={false} />
                      <Routes>
                          <Route path='/' element={<Home/>} />
                          <Route path='/search/:keyword' element={<ProductSearch/>} />
                          <Route path='/product/:id' element={<ProductDetail/>} />
                          <Route path='/login' element={<Login/>} />
                          <Route path='/blocked' element={<Blocked/>} />
                          <Route path='/register' element={<Register/>} />
                          <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute> } />
                          <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute> } />
                          <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute> } />
                          <Route path='/password/forgot' element={<ForgotPassword/> } />
                          <Route path='/password/reset/:token' element={<ResetPassword/> } />
                          <Route path='/cart' element={<Cart/> } />
                          <Route path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute> } />
                          <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute> } />
                          <Route path='/order/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute> } />
                          <Route path='/orders' element={<ProtectedRoute><UserOrders/></ProtectedRoute> } />
                          <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute> } />
                          {stripeApiKey && <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute> } />
    } 
                      </Routes>
                    </div>
                    {/* Admin Routes */}
                    <Routes>
                      <Route path='/admin' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute> } />
                      <Route path='/admin/dashboard' element={ <ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute> } />
                      <Route path='/admin/products' element={ <ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute> } />
                      <Route path='/admin/products/create' element={ <ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute> } />
                      <Route path='/admin/product/:id' element={ <ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute> } />
                      <Route path='/admin/orders' element={ <ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute> } />
                      <Route path='/admin/order/:id' element={ <ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute> } />
                      <Route path='/admin/users' element={ <ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute> } />
                      <Route path='/admin/user/:id' element={ <ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute> } />
                      <Route path='/admin/reviews' element={ <ProtectedRoute isAdmin={true}><ReviewList/></ProtectedRoute> } />
                      </Routes>
            </HelmetProvider>
          </Router>
        </div>
                <Footer/>
    </div>
  );
}

export default App;
