import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Sewa() {
    const [sewa, setSewa] = useState({
        lapangan: "",
        durasi: "",
    })
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    function inputSewa(e) {
        const { name, value } = e.target

        setSewa(prev => {
            return { ...prev, [name]: name === "durasi" ? Number(value) : value }
        })
    }

    const submitHandle = async (e) => {
        e.preventDefault()

         try {
            const response = await fetch("http://localhost:3005/sewa", {
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                credentials : "include",
                body : JSON.stringify(sewa)
            })

            if (response.ok) {
                setMessage("Berhasil Menyewa")
                setTimeout(() => navigate("/riwayat"), 700)
            }else{
                setMessage("Gagal Menyewa")
            }

        } catch (error) {
            console.error(error)
            setMessage("Serv Error")
        }

    }

    return (
        <div>
            <div>
                <form action="" onSubmit={submitHandle}>
                    <label htmlFor="" className="block">Lapangan</label>
                    <input type="text" name="lapangan" value={sewa.lapangan} onChange={inputSewa} />

                    <label htmlFor="" className="block">Durasi</label>
                    <input type="text" name="durasi" value={sewa.durasi} onChange={inputSewa} />

                    <div>
                        <button>Sewa</button>
                    </div>
                </form>
            </div>
            {message && <p>{message}</p>}
        </div>
    )
}

export default Sewa