import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../config'

import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

import UserHome from '../pages/user/UserHome';
import UserLogin from '../pages/user/UserLogin';
import Signup from '../pages/user/Signup';
import Otp from '../pages/user/Otp';
import Profile from '../pages/user/Profile'
import BecomeASeller from '../pages/user/BecomeASeller';
import ProjectForm from '../pages/user/ProjectForm';
import AccountOverview from '../pages/user/AccountOverview'
import SellerProfile from '../pages/user/SellerProfile';
// import AddListing from '../pages/user/AddListing';
import CreateListing from '../pages/user/CreateListing';
import SellerListings from '../pages/user/SellerListings';
import ViewListing from '../pages/user/ViewListing';
import Chatpage from '../pages/user/Chatpage';
import Checkout from '../pages/user/Checkout';
import OrderSuccessPage from '../pages/user/OrderSuccessPage';
import BuyOrders from '../pages/user/BuyOrders';
import ViewOrder from '../pages/user/ViewOrder'
import Guide from '../pages/user/Guide';
import UserPrivateRoutes from '../privateRoutes/UserPrivateRoutes';

import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Users from '../pages/admin/Users';
import Categories from '../pages/admin/Categories';
import SubCategories from '../pages/admin/SubCategories';
import Packages from '../pages/admin/Packages';
import Sellers from '../pages/admin/Sellers'
import AdminPrivateRoutes from '../privateRoutes/AdminPrivateRoutes'
import TestTable from '../components/user/TestTable';
import BrowseCategories from '../pages/user/BrowseCategories';
import AddRequirements from '../pages/user/AddRequirements';
import SellOrders from '../pages/user/SellOrders';
import SalesReport from '../pages/admin/SalesReport';
import Orders from '../pages/admin/Orders'





const Routers = () => {
    axios.defaults.baseURL = BASE_URL
    return (
        <Router>

            <Routes>
                <Route exact path='/login' element={<UserLogin />} />
                <Route exact path='/signup' element={<Signup />} />
                <Route exact path='/otp' element={<Otp />} />
                <Route exact path='/' element={<UserHome />} />
                <Route exact path='/account' element={<TestTable />} />
                <Route exact path='/kshome' element={<ProjectForm />} />
                <Route exact path='/browse' element={<BrowseCategories />} />
                <Route excat path='/viewListing/:id' element={<ViewListing />} />
                <Route excat path='/quickguide' element={<Guide />} />

                <Route exact element={<UserPrivateRoutes type="user" />}>
                    <Route exact path='/account' element={<Profile />} />
                    <Route exact path='/becomeaseller' element={<BecomeASeller />} />
                    <Route path='/overview' element={<AccountOverview />} />
                    <Route path='/sellerprofile' element={<SellerProfile />} />
                    {/* <Route path='/createListing' element={<AddListing />} /> */}
                    <Route exact path='/createListing' element={<CreateListing />} />
                    <Route exact path='/sellerListings' element={<SellerListings />} />
                    <Route exact path='/chatpage' element={<Chatpage />} />
                    <Route exact path='/addRequirements' element={<AddRequirements />} />
                    <Route exact path='/checkout' element={<Checkout />} />
                    <Route exact path='/success' element={<OrderSuccessPage />} />
                    <Route exact path='/buyOrders' element={<BuyOrders />} />
                    <Route exact path='/viewOrder/:id' element={<ViewOrder />} />
                    <Route exact path='/sellOrders' element={<SellOrders />} />
                </Route>
                <Route path="*" element={<UserHome />} />
                {/* ------------------------------------------------------------ */}

                < Route exact path='/admin' element={<AdminLogin />} />
                <Route exact element={<AdminPrivateRoutes type='admin' />}>
                    <Route exact path='/admin/dashboard' element={<AdminDashboard />} />
                    <Route exact path='/admin/users' element={<Users />} />
                    <Route exact path='/admin/categories' element={<Categories />} />
                    <Route exact path='/admin/subcategories' element={<SubCategories />} />
                    <Route exact path='/admin/packages' element={<Packages />} />
                    <Route exact path='/admin/sellers' element={<Sellers />} />
                    <Route exact path='/admin/salesReport' element={<SalesReport />} />
                    <Route exact path='/admin/orders' element={<Orders />} />
                </Route>
            </Routes >
        </Router >
    )
}
export default Routers