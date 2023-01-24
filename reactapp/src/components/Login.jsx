import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {Link, useNavigate  } from 'react-router-dom'

export default function Login() {
    const emailRef =useRef()
    const passwordRef =useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    async function handleSubmit(e) {
      e.preventDefault()


      try {
        setError(null)
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        navigate('/')
      } catch {
        setError('Failed to log in')
        
      }
      setLoading(false)
      
      
    } 

    return (
    <div>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Log In</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
            <Form.Group id = "email">
                <Form.Label> Email</Form.Label>
                <Form.Control type ="email" ref={emailRef} required/>
            </Form.Group>
            <Form.Group id = "password">
                <Form.Label> Password</Form.Label>
                <Form.Control type ="password" ref={passwordRef} required/>
            </Form.Group>
            <Button disabled={loading} className="w-100 text-center mt-2" type="submit">Log In</Button>
            </Form>
            <div className="w-100 text-center mt-3"></div>
            <Link to="/ForgotPassword">Forgot password?</Link>

        </Card.Body>
      </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to="/SignUp">Sign Up</Link>
        </div>
      
    </div>
  )
}


