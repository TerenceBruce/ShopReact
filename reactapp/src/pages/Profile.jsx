import React 
//{useState} UNCOMMENT WHEN ADDING MORE FUNCTIONS TO THE PROFILE PAGE
 from 'react'
import {  Card, 
    //Alert 
} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link  } from 'react-router-dom'
import Logout from '../components/Logout'
import NavigationBar from "../components/NavigationBar";
export default function Dashboard() {
    //const [error,setError] = useState("")
    const  {currentUser} =useAuth()


   
    
  return (
    <div>
      <NavigationBar />

      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {/* {error && <Alert variant='danger'>{error}</Alert>} */}
          <strong>Email: </strong>
          {currentUser.email}
          <Link to="/UpdateProfile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Logout />
      </div>
    </div>
  );
}
