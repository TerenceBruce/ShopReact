import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {Link } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef =useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
  


    async function handleSubmit(e) {
      e.preventDefault()


      try {
        setMessage('')
        setError(null)
        setLoading(true)
        await resetPassword(emailRef.current.value)
        setMessage('Check your indox for further instructions')
      } catch {
        setError('Failed to reset password')
        
      }
      setLoading(false)
      
      
    } 

    return (
    <div>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Reset Password</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            {message && <Alert variant='success'>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
            <Form.Group id = "email">
                <Form.Label> Email</Form.Label>
                <Form.Control type ="email" ref={emailRef} required/>
            </Form.Group>
          
            <Button disabled={loading} className="w-100 text-center mt-2" type="submit">Reset Password</Button>
            </Form>
            <div className="w-100 text-center mt-3"></div>
            <Link to="/Login">Login</Link>

        </Card.Body>
      </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to="/SignUp">Sign Up</Link>
        </div>
      
    </div>
  )
}


