// import './sign-up-form.styles.scss'
import Button from '../button/button.component'
import './sign-up-form.styles.scss'
import FormInput from '../form-input/form-input.component'
import { useState } from 'react'
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
const defaultFormFields ={
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
// ---------------------------------------------------
const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields

    //+++++++++++++++++++++++++++++++++++++++++++++++++++
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++
    const handleSubmit = async (event) => {
        event.preventDefault()
        if( password !== confirmPassword ) {
            alert("passwords do not match")
            return
        }
        
        
        try {
            const {user} = await createAuthUserWithEmailAndPassword (
                email,
                password  
                )
                
        await createUserDocumentFromAuth(user,{displayName} )
        resetFormFields()        

        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Can not create user, email in use')
            }
            console.log('User creation encountered an error.', error) 
            }
        
    }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++
    const handleChange = (event) => {
        const{ name, value } = event.target
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
            <h1>Sign up with your email and password</h1>
            <form>
            
            <FormInput 
                label='Display Name'
                type='text' 
                required 
                name='displayName'
                value={displayName}
                onChange={handleChange}
            />
        
                
            <FormInput 
                label='Email'
                type='email' 
                required 
                name='email' 
                value={email}
                onChange={handleChange}
            />
                

            <FormInput 
                label='Password'
                type='password' 
                required 
                name='password'
                value={password}
                onChange={handleChange}
                />
                
            <FormInput 
                label='Confirm Password'
                type='password' 
                required 
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleChange}
                />

                <Button buttonType='inverted' type='submit'>Sign Up</Button>    

            </form>

        </div>

    )
    
    
}

export default SignUpForm