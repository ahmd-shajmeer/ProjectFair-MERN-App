import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import MyProjects from '../Components/MyProjects'
import Profile from '../Components/Profile'

function Dashboard() {
  const [username,setUsername] = useState(" ")

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setUsername(sessionStorage.getItem('username'))
    }else{
      setUsername()
    }
  },[])

  return (
    <>
      <Header insideDashboard />
      
      <div className="dashboard container">
        <h1 className='fw-bolder'>Welcome<span className='text-info'> {username.split(" ")[0]}</span></h1>
        <div className="row mt-5">
          <div className='col-lg-8'>
            <MyProjects/>
            </div>
            <div className="col-lg-4">
              <Profile/>
            </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard