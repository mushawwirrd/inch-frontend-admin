import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false)
    const [loading, setLoading] = useState(true)

    const authCheck = async () => {

        try {
            const response = await fetch("http://localhost:3005/auth/check", {
                method: "GET",
                credentials: "include",
            })

            if (response.ok) {
                setIsLogin(true)
            }else{
                setIsLogin(false)
            }

        } catch (err) {
            console.err(err)
            setIsLogin(false)
        } finally {
            setLoading(false)
        }

    }


    const logOut = async () => {
        try {
            const response = await fetch("http://localhost:3005/logout", {
                method: "POST",
                credentials: "include",
            })

            setIsLogin(false)

        } catch (error) {
            console.error(err)
        }
    }

    useEffect(() => {
        authCheck()
    }, [])

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, logOut, authCheck, loading }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
   return useContext(AuthContext)
}