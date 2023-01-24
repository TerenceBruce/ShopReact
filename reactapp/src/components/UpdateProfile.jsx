import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate  } from 'react-router-dom'

export default function UpdateProfile() {
    //const emailRef =useRef()
    const passwordRef =useRef()
    const passwordConfirmRef =useRef()
    const { currentUser, updateUserPassword,
       //updateUserEmail 
      } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


     function handleSubmit(e) {
      e.preventDefault()

      if(passwordRef.current.value !== 
        passwordConfirmRef.current.value) {
        return setError('Password do not match')
      }

      const promises =[]
      setError(null)
      setLoading(true)
      //  if(emailRef.currentUser !== currentUser.email){
      //    promises.push(updateUserEmail(emailRef.current.value))
      //  }
      if(passwordRef.currentUser){
        promises.push(updateUserPassword(passwordRef.current.value))
      }
      
      Promise.all(promises).then(() => {
        navigate('/')
      }).catch(() => {
        setError('Failed to update account')
      }).finally(() => {
        setLoading(false)
      })

 
    } 

    return (
    <div>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Update Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
            <Form.Group id = "email">
                <Form.Label> Email : {currentUser.email}</Form.Label>
            </Form.Group>
            <Form.Group id = "password">
                <Form.Label> Password</Form.Label>
                <Form.Control type ="password" ref={passwordRef}  placeholder="Leave blank to keep the same"/>
            </Form.Group>
            <Form.Group id = "passsword-confirm">
                <Form.Label> Password Confirmation</Form.Label>
                <Form.Control type ="password" ref={passwordConfirmRef}  placeholder="Leave blank to keep the same"/>
                </Form.Group>
            <Button disabled={loading} className="w-100 text-center mt-2" type="submit">Update Profile</Button>
            </Form>
        </Card.Body>
      </Card>
        <div className="w-100 text-center mt-2">
            <Link to="/">Cancel</Link>
        </div>
      
    </div>
  )
}
