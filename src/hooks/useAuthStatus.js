import { useEffect,useState } from 'react'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
export const useAuthStatus = () => {
    const [loggedIn,setLoggdedIn]=useState(false);
    const [checkingStatus,setChekingStatus]=useState(true);

    useEffect(()=>{
        const auth=getAuth();
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setLoggdedIn(true)
            }
            setChekingStatus(false);
        })
    })
    return {loggedIn,checkingStatus}
}