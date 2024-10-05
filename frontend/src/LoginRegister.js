import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginRegister() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [values, setValues] = useState({ email: '', password: '' });
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    // Function to validate the password
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/; // Regex for password validation
        return regex.test(password);
    };

    // Register function
    function register(event) {
        event.preventDefault();
        if (!validatePassword(password)) {
            window.alert('Password must be at least 6 characters long, contains at least one uppercase letter, one lowercase letter, and one special character.');
            return;
        } else {
            setPasswordError('');
        }

        axios.post("http://localhost:8081/register", { username, email, password })
            .then(res => {
                alert("Successfully Registered!");
                setUsername('');
                setEmail('');
                setPassword('');
            })
            .catch(err => {
                console.log(err);
                alert("Registration failed. Please try again.");
            });
    }

    // Login function with JWT handling
    function login(event) {
        event.preventDefault();
        axios.post("http://localhost:8081/login", values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    // Save the JWT token to localStorage
                    localStorage.setItem('token', res.data.token);
                    navigate("/task-dashboard");
                } else {
                    alert(res.data.Error);
                }
            })
            .catch(err => {
                console.log(err);
                alert('Login failed. Please try again.');
            });
    }

    function SwitchContent() {
        const content = document.getElementById('content');
        const registerBtn = document.getElementById('register');
        const logInBtn = document.getElementById('login');

        registerBtn.addEventListener('click', () => {
            content.classList.add("active");
        });

        logInBtn.addEventListener('click', () => {
            content.classList.remove("active");
        });
    }

    return (
        <div className='content justify-content-center align-items-center d-flex shadow-lg' id='content'>
            {/*-------------------RegisterForm-------------*/}
            <div className='col-md-6 d-flex justify-content-center'>
                <form onSubmit={register}>
                    <div className='header-text mb-4'>
                        <h1>Create Account</h1>
                    </div>
                    <div className='input-group mb-3'>
                        <input type='text' placeholder='Name' className='form-control form-control-lg bg-light fs-6'
                            onChange={e => setUsername(e.target.value)} value={username} />
                    </div>
                    <div className='input-group mb-3'>
                        <input type='email' placeholder='Email' className='form-control form-control-lg bg-light fs-6'
                            onChange={e => setEmail(e.target.value)} value={email} />
                    </div>
                    <div className='input-group mb-3'>
                        <input type='password' placeholder='Password' className='form-control form-control-lg bg-light fs-6'
                            onChange={e => setPassword(e.target.value)} value={password} />
                        {passwordError && <div className='text-danger'>{passwordError}</div>} {/* Display password error */}
                    </div>
                    <div className='input-group mb-3 justify-content-center'>
                        <button className='btn border-white text-black w-50 fs-6'>Register</button>
                    </div>
                </form>
            </div>

            {/*-------------------LogInForm-------------*/}
            <div className='col-md-6 right-box'>
                <form onSubmit={login}>
                    <div className='header-text mb-4'>
                        <h1>Log In</h1>
                    </div>
                    <div className='input-group mb-3'>
                        <input type='email' placeholder='Email' className='form-control form-control-lg bg-light fs-6'
                            onChange={e => setValues({ ...values, email: e.target.value })} value={values.email} />
                    </div>
                    <div className='input-group mb-3'>
                        <input type='password' placeholder='Password' className='form-control form-control-lg bg-light fs-6'
                            onChange={e => setValues({ ...values, password: e.target.value })} value={values.password} />
                    </div>
                    <div className='input-group mb-3 justify-content-center'>
                        <button className='btn text-black w-50 fs-6'>LogIn</button>
                    </div>
                </form>
            </div>

            {/*---------------switch panel---------------*/}
            <div className='switch-content'>
                <div className='switch'>
                    <div className='switch-panel switch-left'>
                        <h1>Hello Again!</h1>
                        <p>We are happy to see you back!</p>
                        <button className='hidden btn border-white text-white w-50 fs-6' id='login' onClick={SwitchContent}>LogIn</button>
                    </div>
                    <div className='switch-panel switch-right'>
                        <h1>Welcome</h1>
                        <p>Join Our Unique Platform, Explore a New Experience</p>
                        <button className='hidden btn border-white text-white w-50 fs-6' id='register' onClick={SwitchContent}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginRegister;


