import './login.css'

const Login = () => {
  return (
    <>
      <div className='login-container'>
          <form action="" className='login-form'>
            <div className='login-labels'>
              <h2>Login</h2>
              <p>Welcome to our website.</p>
            </div>

            <div className='login-inputs'>

              <div className='username'>
                <input type="text" />
                <span>USERNAME</span>
              </div>
              
              <div className='password'>
                <input type="text" />
                <span>PASSWORD</span>
              </div>

              <div className='remember'>
                <input type="checkbox" name='rememberme' id='rememberme'/>
                <label htmlFor="rememberme">Remember me</label>
              </div>
              
              <button>LOGIN</button>

              <p className='signup-anchor'>Don't have an account? <a href="">Sign Up</a></p>
            </div>
          


          </form>
      </div>

      

    </>
    
  )
}

export default Login