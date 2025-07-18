import './App.css'
import AppLayout from './Layouts/AppLayout'
import ScrollToTop from "./Components/ScrollToTop.jsx";
import Home from './application/main/Home.jsx' 
import Products from './application/Products' 
import Projects from './application/Projects'
import Support from './application/main/Support.jsx'
import Faq from './application/main/Faq.jsx'
import Policy from './application/main/Policy.jsx'
import Auth from './application/Authenticator/Auth.jsx'
import ProfileUpdate from './application/Authenticator/ProfileUpdate.jsx'

import Cart from './application/Delivery/Cart.jsx'
import CheckoutPage from './application/Delivery/CheckoutPage.jsx'
import Order from './application/Delivery/Order.jsx'

import Gzxp24001 from './application/gzxproj24/Gzxp24001.jsx';
import Gzxp24002 from './application/gzxproj24/Gzxp24002.jsx';
import Gzxp24003 from './application/gzxproj24/Gzxp24003.jsx';
import Gzxp24004 from './application/gzxproj24/Gzxp24004.jsx';
import Gzxp24005 from './application/gzxproj24/Gzxp24005.jsx';


import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';

function App() {
   //define app routing
   <ScrollToTop />
  const home = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path='/products' element={<Products/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout' element={<CheckoutPage/>}/>
      <Route path='/order' element={<Order/>}/>
      <Route path='/support' element={<Support/>}/>
      <Route path='/faq' element={<Faq/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/Auth' element={<Auth />}/>
      <Route path='/profileUpdate' element={<ProfileUpdate />}/>
      <Route path='Gzxp24001' element={<Gzxp24001 />}/>
      <Route path='Gzxp24002' element={<Gzxp24002 />}/>
      <Route path='Gzxp24003' element={<Gzxp24003 />}/>
      <Route path='Gzxp24004' element={<Gzxp24004 />}/>
      <Route path='Gzxp24005' element={<Gzxp24005 />}/>
    </Route>
    )) 

  return (
   <RouterProvider router={home}></RouterProvider>
)
}

export default App
