"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { signUp } from '../../../services/allAPIs'
import styles from '../signup/page.module.css'


function Signup() {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [pswd,setPswd] = useState('')
    const router = useRouter()

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const data = {
            name:name,
            email:email,
            phone:phone,
            pswd:pswd
        }
        console.log(data);

        try {
            const response = await signUp(data)
            console.log(response);
            router.push("/signin")     
        } catch (error) {
            console.log("Enter Valid Credentials");
        }
    }

  return (
    <div className={`${styles.signUpContainer} row`}>
        <div className='col-lg-3 col-3'></div>
        <div className='col-lg-6 col-6 d-flex flex-column align-items-center justify-content-center'>
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center mt-3">
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </div>
                <div className="mb-3">
                    <label for="phone" className="form-label">Phone</label>
                    <input 
                        type="tel" 
                        className="form-control" 
                        id="phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        />
                </div>
                <div className="mb-3">
                    <label for="pswd" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="pswd"
                        required
                        value={pswd}
                        onChange={(e) => setPswd(e.target.value)}
                        />
                </div>
                <button type="submit" className="btn btn-primary mb-5 mt-3">Submit</button>
            </form>
        </div>
        <div className='col-lg-3 col-3'></div>
    </div>
  )
}

export default Signup