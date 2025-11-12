import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"


function LogIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const { setIsLogin } = useAuth()
    const navigate = useNavigate()

    const submitHandle = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:3005/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password })
            })

           
            if (!response.ok) {
                setMessage("Gagal Login")
               
            }

            setMessage("Berhasil Login")

            setIsLogin(true)
            setTimeout(() => navigate("/lapangan"), 700)



        } catch (err) {
            console.log(err)
            setMessage("Error")
        }
    }

    return (
        <div>

            <div>
                <form action="" onSubmit={submitHandle}>

                    <label htmlFor="" className="block">Email/Username</label>
                    <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />

                    <label htmlFor="" className="block">Password</label>
                    <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <div>
                        <button>Masuk</button>
                    </div>

                </form>
            </div>
            {message && <p>{message}</p>}

        </div>
    )
}

export default LogIn