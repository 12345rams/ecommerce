import React, { Fragment, useRef, useState } from "react";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import profile from '../Images/profileimageofman.jpg'
import "./loginSignup.css";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { Link } from "react-router-dom";
function LoginSignup() {
  let loading = false;
  const location=useLocation();
  const navigate = useNavigate();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
 
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
 const dispatch=useDispatch();
 const alert=useAlert();
  const { name, email, password } = user;
  const { error,  isAuthentication } = useSelector(
    (state) => state.user
  );
  const [avatar, setAvatar] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState(profile);
  const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if ( isAuthentication) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, navigate, isAuthentication]);

  const loginSubmit =(e)=>{
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));

  }
  const registerSubmit =(e)=>{
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
   
  }
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="loginSignupContainer">
            <div className="loginSignupBox">
              <div>
                <div className="loginSignup-toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                  <p onClick={(e) => switchTabs(e, "register")}>SignUp</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="email">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    id=""
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="password">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    id=""
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
    
    <Link to="/forgetPassword">forgetPassword ?</Link>
       
                <input type="submit" value="login" />
              </form>
        <form className="signUpForm" ref={registerTab} 
            encType="multipart/form-data"
            onSubmit={registerSubmit}>
            <div className="name">
            <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  /></div>
     
              <div className="email">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    onChange={registerDataChange}
                  />
                </div>
                <div className="password">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    id=""
                    onChange={registerDataChange}
                  />
                </div>
            <div className="userimage">
       
            <Avatar src={avatarPreview} alt="Avatar Preview" />
                <input type="file" name="avatar" id="" 
                 onChange={registerDataChange}/>
            </div>
                <input type="submit" value="signUp" className="signUpSubmitbutton"/>

              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default LoginSignup;
