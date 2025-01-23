import "./usermodal.css";
import { CiUser } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserModal = () => {
  const navigate = useNavigate();
  //log out function destroys the session
async function logout(e){
  e.preventDefault();
  const url = 'http://localhost:5000/api/users/logout';

  try {
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if(res.ok){
      console.log('Logged out Success');
      Cookies.remove('name');
      window.location.reload();

    }else{
      console.log('Log out Failed: ', data.message)
    }
  } catch (error) {
    console.log('Error during logout: ', error)
  }
}


  return (
    <>
      <div className="usermodal-container">
        <div className="usermodal-body">
          <div className="login-signup">
            
            
            <a href="">
            <CiUser className="modal-icons" />

              <p>Profile</p>
            </a>
            
            <Link to={"/Login"}>
            <CiLogin className="modal-icons" />
              

              <p>Log in / Sign up</p>
            </Link>
            
          </div>

          <div className="logout-container">
            <button onClick={(e)=>{logout(e)}} className="logoutbutton">
              <CiLogout className="modal-icons" />

              <p>Log out</p>
              
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModal;
