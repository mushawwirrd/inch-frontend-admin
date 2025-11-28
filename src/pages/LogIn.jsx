import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Button from "../components/Button/Button"
import OutilneButton from "../components/Button/OutlineButton"


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
            setTimeout(() => navigate("/beranda-admin"), 700)



        } catch (err) {
            console.log(err)
            setMessage("Error")
        }
    }

    return (
        <div className="py-5 mx-5 lg:mx-20">

            

            <div className="flex justify-center">

                <div className="border rounded-xl p-5">
                    <form onSubmit={submitHandle}>

                        <div>
                            <label className="block mb-3">Email/Username</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="border rounded-xl p-2" />
                        </div>

                        <div className="mb-3">
                            <label className="block">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="border rounded-xl p-2" />
                        </div>

                        <div className="flex flex-col items-center gap-y-3">
                            <OutilneButton type="button" lable="Daftar" click={() => navigate("/daftar-admin")} />
                            <Button lable="Masuk" />

                        </div>
                    </form>

                </div>
                {message && <p>{message}</p>}
            </div>

        </div>
    )
}

export default LogIn