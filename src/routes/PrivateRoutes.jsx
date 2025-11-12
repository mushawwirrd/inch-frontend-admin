import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


export default function PrivateRoutes({ children }) {
    const [isAuth, setIsAuth] = useState(null)
    const [loading, setLoading] = useState(true)

    const authCheck = async () => {
        try {
            const response = await fetch("http://localhost:3005/auth/check", {
                method: "GET",
                credentials: "include",
            })


            if (response.ok) {
                setIsAuth(true)
            } else {
                setIsAuth(false)

            }

        } catch (err) {
            console.error(err)
            setIsAuth(false)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        authCheck()
    }, [])

    if (loading) return <p className="px-8 text-center">Loading...</p>
    if (!isAuth) return <Navigate to="/masuk" replace />

    return children
}