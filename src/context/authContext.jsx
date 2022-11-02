import { createContext, useContext, useState } from "react";
import { createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         onAuthStateChanged,
         signOut  } from "firebase/auth";
import { auth } from '../fb'
import { useEffect } from "react";

export const authContext = createContext()


export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('No hay un auth provider')
    return context
}

export function AuthProvider({ children }) {
    const[user, setUser]=useState(null)
    const[loading, setLoading]=useState(true)

    //const signup = (correo,contraseña) => createUserWithEmailAndPassword(auth, correo, contraseña)
    const login = (correo, contraseña) => signInWithEmailAndPassword(auth, correo, contraseña)
    
     const logout=()=>signOut(auth )
    
     useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        });
        return () => unsuscribe ();
    }, [])

        

    return (
        <authContext.Provider value={{ login,user, logout, loading }}>
            {children}
        </authContext.Provider>
    )
}