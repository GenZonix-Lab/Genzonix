import './App.css'
import AppLayout from './Layouts/AppLayout'
import ScrollToTop from "./Components/ScrollToTop.jsx";
import Home from './application/main/Home.jsx' 
import Products from './application/Product/Products.jsx' 
import ProjectPages from './application/Projects/ProjectPages.jsx'
import Projects from './application/Projects/Projects.jsx';
import Profile from './application/main/Profile.jsx';
import CloudSandbox from './application/Solutions/CloudSandbox.jsx';
//SupportPages
import Support from './application/Supportpages/Support'
import Faq from './application/Supportpages/Faq'
import Policy from './application/Supportpages/Policy'
import Auth from './application/Authenticator/Auth.jsx'
import ProfileUpdate from './application/Authenticator/ProfileUpdate.jsx'

import Cart from './application/Delivery/Cart.jsx'
import CheckoutPage from './application/Delivery/CheckoutPage.jsx'
import ProductPages from './application/Product/ProductPages.jsx';
import Order from './application/Delivery/Order.jsx'
import Subscription from './application/Solutions/Subscription.jsx'
import SubscriptionDetails from './application/Solutions/SubscriptionDetails.jsx';
//404 Missing page
import Missing from './Missing.jsx'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import PrivacyPolicy from './application/Supportpages/PrivacyPolicy.jsx';
import Terms from './application/Supportpages/Terms.jsx';
import Dairy from './dairy/Dairy.jsx';

function App() {
   //define app routing
   <ScrollToTop />
  const home = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path='/sandbox' element={<CloudSandbox/>}/>
      <Route path='/products'>
        <Route index element={<Products/>}/>
        <Route path=':productId' element={<ProductPages/>}/>
      </Route>
      <Route path='/projects'>
        <Route index element={<ProjectPages/>}/>
        <Route path=':projectId' element={<Projects/>}/>
      </Route>
      <Route path='/support' element={<Support/>}/>

      <Route path='/profile' element={<Profile/>}/>
      
      
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout' element={<CheckoutPage/>}/>
      <Route path='/order' element={<Order/>}/>
      <Route path='/subscription' element={<Subscription/>}/>
      <Route path='/subscriptiondetails' element={<SubscriptionDetails/>}/>
      
      <Route path='/faq' element={<Faq/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
      <Route path='/terms&Conditions' element={<Terms/>}/>
      <Route path='/Auth' element={<Auth />}/>
      <Route path='/profileUpdate' element={<ProfileUpdate />}/>

      <Route path='/dairy' element={<Dairy/>}/>
      <Route path='*' element={<Missing/>}/>
    </Route>
    )) 

  return (
   <RouterProvider router={home}></RouterProvider>
)
}

export default App
