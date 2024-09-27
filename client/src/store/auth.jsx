import { createContext, useContext, useState, useEffect  } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const[token, setToken] = useState(localStorage.getItem("token"));
    const[user, setUser] = useState("");
    const [isloading, setIsLoading] =useState(true);
    const  authorizationToken = `Bearer ${token}`;

    const API = import.meta.env.VITE_APP_URI_API;

    const storeTokenInLs = (serverToken) =>{
      setToken(serverToken);
    return localStorage.setItem('token', serverToken);
};

    let isLoggedIn = !!token;
    console.log("isLoggedIn", isLoggedIn);

    //logout functionality
    const LogoutUser = ()=>{
        setToken("");
        return localStorage.removeItem("token");
    };

    //authentication jwt - currently logged in usedr data
    const userAuthentication = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`${API}/api/auth/user`, 
            {
            method: "GET",
            headers: {
                Authorization: authorizationToken ,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("user data", data.userData);
            // our main goal is to get the user data 👇
            setUser(data.userData);
            setIsLoading(false);
          } else {
            console.log("Error fetching user data");
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching user data");
        }
      };
    
      useEffect(() => {
        userAuthentication();
      }, []);


    return (
    <AuthContext.Provider value={{isLoggedIn, storeTokenInLs, LogoutUser, user, authorizationToken, isloading, API}}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = ()=>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the provider.") // means in main.js wrap the <app> in <authProvider>
    }
    return authContextValue;
} 