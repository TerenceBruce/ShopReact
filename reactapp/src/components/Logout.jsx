import  React, {useState} from 'react'
import { useAuth } from "../contexts/AuthContext"
import { Button,Alert } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'

export default function Logout() {
    const [error,setError] = useState("")
    const { logout }=useAuth()
    const navigate = useNavigate()

    async function handleLogout(){// can only use await in async function
        setError('')

        try{
        
            await logout()
            navigate('/login')

        }catch{
            setError('Failed to log out ')
        }
            
        }

  return (
    <div>
        {error && <Alert variant='danger'>{error}</Alert>}
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  )
}

