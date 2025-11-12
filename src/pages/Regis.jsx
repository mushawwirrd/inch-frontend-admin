import { useState } from "react"
import { useNavigate } from "react-router-dom"


function Regis() {
    const [regis, setRegis] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [message, setmMessage] = useState("")
    const navigate = useNavigate()

    const inputRegis = (e) => {
        const {name, value} = e.target 
        setRegis(data => {
            return { ...data, [name] : value}
        })
    }

    const submitHandle = async (e) =>{
        e.preventDefault()

        try {
            const response = await fetch ("http://localhost:3005/admin/regis", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(regis)
            })

            const data = await response.json()

            if(response.ok){
                setmMessage("Berhasil Terdaftar")
                setTimeout(() => navigate("/masuk"), 700)
                console.log(" Result : ",data)
            }else{
                setmMessage("Gagal Terdaftar")
                console.log(" Result : ",data)
            }


        } catch (error) {
            console.error(error)
            setmMessage("Server Error")
        }
    }

    return (
        <div>
            <div>
                <form action="" onSubmit={submitHandle}>

                    <label htmlFor=""className="block">Email</label>
                    <input type="text" name="email" value={regis.email} onChange={inputRegis} />

                    <label htmlFor=""className="block">Username</label>
                    <input type="text" name="username" value={regis.username} onChange={inputRegis} />

                    <label htmlFor=""className="block">Password</label>
                    <input type="password" name="password" value={regis.password} onChange={inputRegis} />

                    <div>
                        <button>Daftar</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Regis