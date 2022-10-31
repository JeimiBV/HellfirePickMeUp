import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../fb'

export const authContext = createContext()


export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('No hay un auth provider')
    return context
}

export function AuthProvider({ children }) {
    //const signup = (correo,contraseña) => createUserWithEmailAndPassword(auth, correo, contraseña)
    const login = (correo, contraseña) => signInWithEmailAndPassword(auth, correo, contraseña)

    return (
        <authContext.Provider value={{ login }}>
            {children}
        </authContext.Provider>
    )
}