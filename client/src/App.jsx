import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/common/Navbar'
import AuthNavbar from './components/common/AuthNavbar'
import AuthPage from './components/pages/AuthPage'
import { createContext, useEffect, useState } from 'react'
import { lookInSession } from './components/common/Session'

export const UserContext = createContext({})

const App = () => {
  const [userAuth, setUserAuth] = useState({});
  
  // Store user in session if user in it
  useEffect(() => {

    let userInSession = lookInSession("user" )

    userInSession 
    ? setUserAuth(JSON.parse(userInSession)) // parse convert string into object
    : setUserAuth({ access_token: null })

  }, [] ) // Give variable in [] if we want useEffect run more than one after render since useEffect only run once

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path='/' element={<Navbar />}>
          {/* Must using Outlet in Navbar to render element below */}
          <Route path='sang-tac' element={<h1 className="pt-[46px]">Sáng tác</h1>}/>
          <Route path='convert' element={<h1 className="pt-[46px]">Convert</h1>}/>
          <Route path='xuat-ban' element={<h1 className="pt-[46px]">Xuất bản</h1>}/>
          <Route path='thao-luan' element={<h1 className="pt-[46px]">Thảo luận</h1>}/>
          <Route path='danh-sach' element={<h1 className="pt-[46px]">Danh sách</h1>}/>
          <Route path='dang-truyen' element={<h1 className="pt-[46px]">Đăng truyện</h1>}/>
          <Route path='gop-y' element={<h1 className="pt-[46px]">Góp ý</h1>}/>
        </Route>
          <Route path='/signin' element={
            // Using fragment (<></>) to render multiple component in one Route
            <>
              <AuthNavbar />
              <AuthPage type="signin"/>
            </>
          }/>
          <Route path='/signup' element={
            <>
              <AuthNavbar />
              <AuthPage type="signup"/>
            </>
          }/>
      </Routes>
    </UserContext.Provider>
  )
}

export default App
