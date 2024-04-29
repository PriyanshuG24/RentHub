import { useState } from "react"
import {Link,useNavigate} from "react-router-dom"
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import {db} from "../firebase.config.js"
import {setDoc,doc,serverTimestamp} from "firebase/firestore"
import {toast } from 'react-toastify';
import Oauth from "../components/Oauth";

function SignUp() {
  const [showPassword,setShowPassword] = useState(false);
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    password:''
  })
  const {name,email,password}=formData
  const navigate=useNavigate()
  const onChange=(e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  }
  const onSubmit=async(e)=>{
    e.preventDefault();
    try {
      const auth=getAuth();
      const  userCredential=await createUserWithEmailAndPassword(auth,email,password)
      const user=userCredential.user
      updateProfile(auth.currentUser,{
        displayName:name
      })
      const formDataCopy={...formData};
      delete formDataCopy.password
      formDataCopy.timestamp=serverTimestamp()
      await setDoc(doc(db, "users", user.uid),formDataCopy);
      navigate('/');
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <>
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcom Back!</p>
      </header>
      <form onSubmit={onSubmit}>
      <input  type="text"
        className="nameInput"
        placeholder="Name"
        id="name"
        value={name}
        onChange={onChange}
        /> 
        <input  type="email"
        className="emailInput"
        placeholder="Email"
        id="email"
        value={email}
        onChange={onChange}
        /> 
        <div  className="passwordInputDiv">
          <input  type={showPassword?'text':'password'}
          className="passwordInput"
          placeholder="Password"
          id="password"
          value={password}
          onChange={onChange}
          />
          <img src={visibilityIcon} alt="show password" 
          className="showPassword"
          onClick={()=>setShowPassword((prevState)=>
            !prevState
          )}/>
        </div>
        <Link 
          to='/forget-password' 
          className="forgotPasswordLink">
          Forgot Password
        </Link>
        <div className="signUpBar">
          <p className="signUpText">
            SignUp
          </p>
          <button className="signInButton">
            <ArrowRightIcon fill='#ffffff' width='24px'
            height='24px'/>
          </button>
        </div>
      </form>
      <Link to='/signin' className="registerLink">
        Sign In Instead
      </Link>
      <Oauth/>
    </div>
    </>
  )
}

export default SignUp
