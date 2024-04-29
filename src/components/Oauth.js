import { useLocation,useNavigate } from "react-router-dom";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import {doc,setDoc,getDoc,serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg'
function Oauth() {
    const navigate=useNavigate();
    const location=useLocation(); 
    const onGoogleClick=async()=>{
        try {
            const auth=getAuth();
            const provider=new GoogleAuthProvider();
            const result =await signInWithRedirect(auth,provider);
            const user=result.user;

            // check for user 

            const docRef=doc(db,'users',user.id);
            const docSnap=await getDoc(docRef);

            // if user,doesn;t exist create user
            if(!docSnap.exists()){
                setDoc(doc(db,'users',user.uid),{
                    name:user.displayName,
                    email:user.email,
                    timestamp:serverTimestamp()
                })
            }
            navigate('/');
        } catch (error) {
            toast.error('Could not authorize with google');
        }
    }
    return (
        <div className="socialLogin">
            <p>Sign {location.pathname === '/signin' ? "in" : "up"} with</p>
            <button className="socialIconDiv" onClick={onGoogleClick} >
                <img className="socialIconImg" src={googleIcon} alt="google" />
            </button>
        </div>
    );
} 

export default Oauth
