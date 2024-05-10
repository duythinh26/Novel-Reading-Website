import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/common/Navbar';
import AuthNavbar from './components/common/AuthNavbar';
import AuthPage from './components/pages/AuthPage';
import { lookInSession } from './components/common/Session';
import Editor from './components/pages/Editor';
import EditorNavbar from './components/common/EditorNavbar';
import Homepage from './components/pages/Homepage';
import SearchPage from './components/pages/SearchPage';
import ProfilePage from './components/pages/ProfilePage';
import PageNotFound from './components/pages/PageNotFound';
import NovelPage from './components/pages/NovelPage';

export const UserContext = createContext({})

const App = () => {
  const [userAuth, setUserAuth] = useState({});
  
  // Store user in session if user in it
  useEffect(() => {

    let userInSession = lookInSession("user")

    userInSession 
    ? setUserAuth(JSON.parse(userInSession)) // parse convert string into object
    : setUserAuth({ access_token: null })

  }, [] ) // Give variable in [] if we want useEffect run more than one after render since useEffect only run once

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path='/' element={<Navbar />}>
          {/* Must using Outlet in Navbar to render element below */}
          <Route path='sang-tac' element={<h1 className="pt-nav">Sáng tác</h1>}/>
          <Route path='convert' element={<h1 className="pt-nav">Dịch máy</h1>}/>
          <Route path='thao-luan' element={<h1 className="pt-nav">Thảo luận</h1>}/>
          <Route path='danh-sach' element={<h1 className="pt-nav">Danh sách</h1>}/>
          <Route path='dang-truyen' element={<h1 className="pt-nav">Đăng truyện</h1>}/>
          <Route path='gop-y' element={<h1 className="pt-nav">Góp ý</h1>}/>
          <Route path='ke-sach' element={<h1 className="pt-nav">Kệ sách</h1>}/>
          <Route path='search' element={ <SearchPage /> } /> 
          <Route path='user/:id' element={ <ProfilePage /> } />
          <Route path='novel/:novel_id' element={ <NovelPage /> } />
          <Route index element={ <Homepage /> } />
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
        <Route path='/dashboard' element={<EditorNavbar />}/>
        <Route path='/dashboard/series' element={
          <>
            <Editor />
          </>
        }/>
        {/* leave this tag at the end of the route / since the path of this route is all path */}
        <Route path='*' element={ <PageNotFound />}/>
      </Routes>
    </UserContext.Provider>
  )
}

export default App
