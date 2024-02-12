import React, { useContext } from 'react'
import { Navbar,Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthenticationContext } from '../Context API/TokenAuth'

function Header({insideDashboard}) {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthenticationContext)
  const navigate = useNavigate()

  const handleLogout = () =>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    setIsAuthorised(false)
    navigate('/')
  }
  return (
    <>
    <Navbar style={{backgroundColor:'#a274c4'}}>
        <Container>
          <Navbar.Brand href="#home" className='fs-2'>
          <Link to={'/'} style={{textDecoration:'none'}} className='text-white '><i class="fa-solid fa-code me-2 "></i><span>Project Fair</span></Link>
          </Navbar.Brand>
      {
        insideDashboard && 
          <div>
            <button onClick={handleLogout} className="btn text-black"><i className="fa-solid fa-right-from-bracket">Logout</i></button>
          </div>
        
      }
        </Container>
      </Navbar>

    </>
  )
}

export default Header