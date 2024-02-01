import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import RootLayout from './components/layouts/RootLayout'
import Dashboard from './pages/dashboard'
import Users from './pages/users'

import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import { Suspense, lazy } from 'react'
import Profile from './pages/users/Profile'
import Orders from './pages/orders'

//product
const Products = lazy(() => import('./pages/products'))

function App() {

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path='/' element={<RootLayout />}>
              <Route path='' element={<Dashboard />} />
              <Route path='users' element={<Users />} />
              <Route path='users/profile' element={<Profile />} />
              <Route path='products' element={<Products />} />
              <Route path='orders' element={<Orders />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:id' element={<ResetPassword />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
