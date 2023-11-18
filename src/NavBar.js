import './NavBar.css';
import * as React from "react";
import Homepage from './Homepage'
import Forecast from './Forecast'
import CurrentWeather from './CurrentWeather'

import{
  BrowserRouter, Route, Outlet, Routes, NavLink
} from "react-router-dom";

function Layout(){ /*Layout of the NavBar*/
  return(
    <>
          <ul>
                  <NavLink to='/' className={({ isActive }) => (isActive ? "link-active" : "link")}>Home</NavLink>


                  <NavLink to='/forecast' className={({ isActive }) => (isActive ? "link-active" : "link")}>3-Day Forecast</NavLink>
          </ul>
        <Outlet />
    </>
  );
}


function NavBar(){ /*Linking of different webpages together*/
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                <Route index element={<Homepage/>}/>
                <Route path="forecast" element={<Forecast/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default NavBar;