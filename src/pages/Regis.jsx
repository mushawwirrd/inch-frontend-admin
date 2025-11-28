import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button/Button"
import OutilneButton from "../components/Button/OutlineButton"


function Regis() {
    const [regis, setRegis] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [message, setmMessage] = useState("")
    const navigate = useNavigate()

    const inputRegis = (e) => {
        const { name, value } = e.target
        setRegis(data => {
            return { ...data, [name]: value }
        })
    }

    const submitHandle = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:3005/admin/regis", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(regis)
            })

            const data = await response.json()

            if (response.ok) {
                setmMessage("Berhasil Terdaftar")
                setTimeout(() => navigate("/masuk"), 700)
                console.log(" Result : ", data)
            } else {
                setmMessage("Gagal Terdaftar")
                console.log(" Result : ", data)
            }


        } catch (error) {
            console.error(error)
            setmMessage("Server Error")
        }
    }

    return (
        <div className="py-5 mx-5 lg:mx-20">
            <div className=" flex flex-col items-center justify-center">

            
                <div className="border rounded-xl p-5">
                    <form action="" onSubmit={submitHandle}>

                        <div className="mb-3">
                            <label className="block mb-1">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={regis.email}
                                onChange={inputRegis}
                                className=" rounded-xl border p-2" />
                        </div>

                        <div className="mb-3">
                            <label className="block mb-1">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={regis.username}
                                onChange={inputRegis}
                                className="rounded-xl border p-2" />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={regis.password}
                                onChange={inputRegis}
                                className="rounded-xl border p-2" />
                        </div>

                        <div className="flex flex-col items-center justify-center gap-y-2">
                            {/* <p >Sudah punya akun?</p>
                            <p>Silahkan <a href="/admin" className="text-blue-500">Masuk</a></p> */}
                            <OutilneButton type="button" lable="Masuk" click={() => navigate("/admin")} />
                            <Button lable="Daftar" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Regis