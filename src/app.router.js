import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthGuard from './guards/auth.guard.js';
import LoginComponent from "./components/login.component";
import ProfileComponent from "./components/profile.component";
import RegisterComponent from "./components/register.component";
import NotFoundComponent from "./components/not-found.component";
import SideBarComponent from './components/Sidebar.component.jsx';
import UserComponent from './components/user.component.jsx';
import CategoryComponent from './components/category.component.jsx';
import AddUserComponent from './components/addUser.component.jsx';
import AddCategory from './components/addCategory.component.jsx';
import EditUserComponent from './components/editUser.component.jsx';
import DashboardComponent from './components/dashboard.component.jsx';
import MainComponent from './components/MainComponent.jsx'; // Import MainComponent
import AddressComponent from './components/Address.component.jsx';
import AddAddress from './components/addAddress.jsx';
import OrderComponent from './components/Orders.component.jsx';
import AddOrder from './components/addOrder.jsx'
import ViewOrder from './components/viewOrders.jsx';
import SubCategoryComponent from '../src/components/SubCategories.jsx';
import AddSubCategory from '../src/components/AddSubcat.jsx';
import EditSubCategory from './components/EditSubCateogory.jsx';
import ServiceComponent from './components/Services.Component.jsx';
import AddServiceComponent from './components/AddService.Component.jsx';
import EditCategory from './components/EditCategory.jsx';
import VendorsComponent from './components/Vendors.Component/Vendors.Component .jsx';
import EditVendor from './components/Vendors.Component/EditVendor.jsx';
import AddVendor from './components/Vendors.Component/AddVendor.jsx';
const AppRouter = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route exact path='/' element={<LoginComponent />} />
      <Route path='/register' element={<RegisterComponent />} />
      <Route path='/sidebar' element={<SideBarComponent />} />
      <Route element={<AuthGuard />}>
        <Route
          path='/users'
          element={<UserComponent/>} 
        />
        <Route path='/profile' element={<ProfileComponent />} />
        <Route path='/category' element={<CategoryComponent />} />
        <Route path='/subCategory' element={<SubCategoryComponent />} />
        <Route path='/order' element={<OrderComponent />} />
        <Route path='/dashboard' element={<MainComponent component={<DashboardComponent />} />} />
        <Route path='/service' element={<ServiceComponent />} />
        <Route path='/vendor' element={<VendorsComponent />} />
        

        <Route path='/adduser' element={<AddUserComponent />} />
        <Route path='/addorder' element={<AddOrder />} />
        <Route path='/addsubcat' element={<AddSubCategory />} />

        
        <Route path='/addCategory' element={<AddCategory />} />
        <Route path='/addAddress' element={<AddAddress />} />
        <Route path='/addService' element={<AddServiceComponent />} />
        <Route path='/addVendor' element={<AddVendor />} />


        
        <Route path='/editUser' element={<EditUserComponent />} />
        <Route path="/address" element={<AddressComponent />} />
        <Route path="/viewOrder" element ={<ViewOrder/>}/>
        <Route path='/editSubcat' element={<EditSubCategory />} />
        <Route path ='/editCategory' element={<EditCategory />} />
        <Route path ='/editVendor' element={<EditVendor/>} />

      </Route>
      <Route path='*' element={<NotFoundComponent />} />
    </Routes>
  );
};

export default AppRouter;
