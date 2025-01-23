import "./loginpage.css"
import Footer from "../Footer/Footer"
import { FaShuttleVan } from "react-icons/fa";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [registeremail, setRegisterEmail] = useState('');
    const [registername, setRegisterName] = useState('');
    const [registerpassword, setRegisterPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const[message, setMessage] = useState('');



    async function register(e){
        e.preventDefault()
        
        if(registerpassword === confirmpassword){
            const registerEndPoint = 'http://localhost:5000/api/users/register';
            
            try {
                const res = await fetch(registerEndPoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        email: registeremail.toLowerCase(),
                        name: registername,
                        password: registerpassword
                    
                    })

                });

                if(!res.ok){
                    throw new Error('Network response was not ok!');
                }
                
                const data = await res.json();
                setMessage(data.message);
                alert(data.message);
            } catch (error) {
                console.log('Error Submitting form:', error);
                setMessage('Error! Invalid Inputs or User is already Found!');
                alert('Error! Invalid Inputs or User is already Found!');
            }
            
            clearFields();
        }
        else{
            alert('Passwords do not match. Please ensure both fields are identical.');
        }
    
    }

    async function login(e) {
        e.preventDefault();

        const url = 'http://localhost:5000/api/users/login'
        try{
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.toLowerCase(), password: password }),
                credentials: 'include',
            });

            if(res.ok){
                console.log('LOGGED IN');
                navigate('/');
            }
            else{
                console.log('NO NO WAY');
                alert('Invalid Email or Password');
            }
        }
        
        catch(error){
            console.error('Error', error);
        }
    }


function clearFields(){
    setEmail('');
    setPassword('');
    setRegisterEmail('');
    setRegisterName('');
    setRegisterPassword('');
    setConfirmPassword('');
}


    //for login password
    const [isHiddenLogin, setisHiddenLogin] = useState<boolean>(true);
        const togglePasswordLogin = () =>{
                setisHiddenLogin(!isHiddenLogin);
            }

    // for signup password
    const [isHidden, setisHidden] = useState<boolean>(true);
        const togglePassword = () =>{
                setisHidden(!isHidden);
            }
    
    // for confirm signup password
    const [isHiddenConfirm, setisHiddenConfirm] = useState<boolean>(true);
        const togglePasswordConfirm = () =>{
            setisHiddenConfirm(!isHiddenConfirm);
        }


    const [isLogin, setisLogin] = useState<boolean>(true);

        const toggleLogin = (event: React.MouseEvent<HTMLAnchorElement>) =>{
            event.preventDefault();
            clearFields();
            setisLogin(!isLogin);
        }
    





  return (


    <>
        <div className="loginpage-container">
            <div className="form-container">
                {

                    isLogin ?

                <div className="login" key="login">
                    <div className="login-header">
                        <FaShuttleVan  className="login-header-icon"/>
                        <h3>Welcome Back to TourVan!</h3>
                        <p>Your journey begins here. Log in to access your personalized travel plans, manage your bookings, and discover new adventures.</p>
                    </div>
                    
                    <form action="" className="login-form">

                        <div className="input-box">
                            <input type="email" required className="email-input" placeholder="" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                            <span className="placeholder">EMAIL</span>
                        </div>

                        <div className="input-box">
                            <input type={isHiddenLogin ? "password" : "text"} required onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                            {
                                isHiddenLogin ? <FaEyeSlash className="peeker" onClick={togglePasswordLogin}/> : <FaEye className="peeker" onClick={togglePasswordLogin}/>
                            }
                            <span className="placeholder">PASSWORD</span>
                        </div>
                        
                        <button className="submit-button" onClick={(e)=>{login(e)}}>Continue</button>

                        <p>Don't have an account yet? <a href="/signup" target="_blank" className="loginsignup-link" onClick={toggleLogin}>Sign up here</a>.</p>


                    </form>

                    <div className="form-footer">
                        <p className="form-footer-header">By Logging in</p>

                        <p>By logging in, you confirm that you have read and agree to our <a href="" target="_blank" style={{color: '#008B8B'}}>Terms of Service</a> and <a href="" target="_blank" style={{color: '#008B8B'}}>Privacy Policy</a>, including any updates or amendments.</p>

                    </div>

                </div>

                            :

                <div className="signup" key="signup">

                <div className="signup-header">
                        <FaShuttleVan  className="login-header-icon"/>
                        <h3>Join the Journey to Discover Tacloban</h3>
                        <p>Sign up now to explore Tacloban’s hidden gems and create unforgettable memories with TourVan.</p>
                    </div>
                    
                    <form action="" className="signup-form">

                        <div className="input-box">
                            <input type="email" required className="email-input"  placeholder="" onChange={(e)=>{setRegisterEmail(e.target.value)}} value={registeremail}/>
                            <span className="placeholder">EMAIL</span>
                        </div>

                        <div className="input-box">
                            <input type="text" required onChange={(e)=>{setRegisterName(e.target.value)}} value={registername}/>
                            <span className="placeholder">NAME</span>
                        </div>

                        <div className="input-box">
                            <input type={isHidden ? "password" : "text"}  required onChange={(e)=>{setRegisterPassword(e.target.value)}} value={registerpassword}/>
                            {
                                isHidden ? <FaEyeSlash className="peeker" onClick={togglePassword}/> : <FaEye className="peeker" onClick={togglePassword}/>
                            }
                            <span className="placeholder">PASSWORD</span>
                        </div>

                        <div className="input-box">
                            <input type={isHiddenConfirm ? "password" : "text"}  required onChange={(e)=>{setConfirmPassword(e.target.value)}} value={confirmpassword}/>
                            {
                                isHiddenConfirm ? <FaEyeSlash className="peeker" onClick={togglePasswordConfirm}/> : <FaEye className="peeker" onClick={togglePasswordConfirm}/>
                            }
                            <span className="placeholder">CONFIRM PASSWORD</span>
                        </div>
                        
                        <button className="submit-button" onClick={(e)=>{register(e)}}>Continue</button>

                        <p>Already have an account? <a href="/login" target="_blank" className="loginsignup-link" onClick={toggleLogin}>Log in here</a>.</p>

                        

                    </form>
                    
                    <div className="form-footer">
                        <p className="form-footer-header">By Signing up</p>

                        <p>By creating an account, you acknowledge and agree to our <a href="" target="_blank" style={{color: '#008B8B'}}>Terms of Service</a> and <a href="" target="_blank" style={{color: '#008B8B'}}>Privacy Policy</a>, including any updates or amendments.</p>

                    </div>


                </div>

                }

            </div>

            

        </div>
        <Footer></Footer>
    </>
  )
}

export default LoginPage