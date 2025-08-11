import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../authContext'

import { PageHeader } from '@primer/react'
import { Box, Button} from "@primer/react"
import "./auth.css"

import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
   const { setCurrentUser } = useAuth();
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });
if(res.data.token && res.data.userId ) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      setLoading(false);
} else {
  alert("Invalid response from server.")
}
      // window.location.href = "/";
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login Failed!");

      setLoading(false);
    }
  };


  return (
    <div className='login-wrapper'>
      <div className='login-logo-container'>
        <img className='logo-login' src='/github-mark-white.svg'/>
        </div> 

        <div className='login-box-wrapper'>
          <div className='login-heading'>
            <Box sx={{ padding: 1 }}>
              <PageHeader>
                <PageHeader.TitleArea variant="large">
                  <PageHeader.Title>Sign In</PageHeader.Title>
                </PageHeader.TitleArea>
              </PageHeader>
            </Box>
          </div>
          <div className='login-box'>
            <form onSubmit={handleLogin}>
            <div>
              <label className='label'>Email address</label>
              <input
              autoComplete='off'
              name='Email'
              id='Email'
              className='input'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className='label'>Password</label>
              <input
              autoComplete='off'
              name='Password'
              id='Password'
              className='input'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          
            <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            type= "submit"
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            </form>
          </div>
          <div className='pass-box'>
            <p>
              New to Github? <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </div>

    </div>
  );
};

export default Login