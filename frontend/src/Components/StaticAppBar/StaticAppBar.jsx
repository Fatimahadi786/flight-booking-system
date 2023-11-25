import React from 'react'
import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import Search from '../Search/Search'
import Travelers from '../Travelers/Travelers'

const StaticAppBar = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Search/>
      <Travelers/>
    </div>
  )
}

export default StaticAppBar
