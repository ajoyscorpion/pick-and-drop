"use client"

import Link from 'next/link';
import styles from '../signin/page.module.css'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../../context/authContext'
import { signIn } from '../../../services/allAPIs'

function signin() {

    const [email,setEmail] = useState('')
    const [pswd,setPswd] = useState('')
    const router = useRouter();

    //const { token,setToken } = useContext(authContext)

    //const {user,setUser} = useContext(authContext)

    // useEffect(()=>{
    //     console.log(token);
    //     console.log(user);
    // },[token,user])

    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = {
            email:email,
            pswd:pswd
        }
        console.log(data);

        try {
            const response = await signIn(data)
            console.log(response);
            const token = response.token; 
            console.log(token);
            const user = response.preuser.name;
            console.log(user);
            localStorage.setItem('token',token)
            localStorage.setItem('user',user)
            //setToken(token)
            //setUser(user)
            window.location.reload()
            window.location.href = "/";
            //router.push("/")
        } catch (error) {
           console.log("Enter Valid Credentials"); 
        }
    }

  return (
    <div className={`${styles.signInContainer} row`}>
        <div className='col-lg-4 col-4'></div>
        <div className='col-lg-4 col-4 d-flex flex-column justify-content-center align-items-center'>
            <h3>Sign In</h3>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center mt-3">
                <div class="mb-3">
                    <label for="Email" class="form-label">Email address</label>
                    <input 
                        type="email" 
                        class="form-control" 
                        id="Email" 
                        value={email} 
                        required 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </div>
                <div class="mb-3">
                    <label for="pswd" class="form-label">Password</label>
                    <input 
                        type="password" 
                        class="form-control" 
                        id="pswd" 
                        value={pswd} 
                        required
                        onChange={(e) => setPswd(e.target.value)}
                    />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <p className='mt-5'><strong>Dont have an Account ? Please <Link href="/signup"><span className={styles.signupLink}>Sign Up</span></Link></strong></p>
        </div>
        <div className='col-lg-4 col-4'></div>
    </div>
  )
}

export default signin
