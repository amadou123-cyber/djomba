import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";


const LoginContext = createContext();
const LoginProvider = ({children}) => {
    const  [isLoggedIn,setIsLoggedIn ] = useState(false);
    const [token,setToken] = useState( '')
    const [lastmessage ,setLastMessage] = useState('')
    const [userprofile,setUserProfile] = useState({ })
    const [notification,setNotification] = useState(0)
    const [message,setMessage] = useState(0)
   
 
    return <LoginContext.Provider value={{message,setMessage, notification,setNotification,isLoggedIn,setIsLoggedIn,token,setToken,userprofile,setUserProfile,lastmessage,setLastMessage }}>
        {children}
    </LoginContext.Provider>
    }
export const useLogin = () =>  useContext(LoginContext);
export default LoginProvider;