import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function UbahSewa() {
    const { id } = useParams()
    const [sewa, setSewa] = useState({
        lapangan: "",
        durasi: ""
    })
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const dataSewa = async () => {

        try {
            const response = await fetch(`http://localhost:3005/sewa/satu/${id}`,{
                credentials : "include"
            })

            const data = await response.json()

            setSewa(data)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        dataSewa()
    }, [])

    function inputUbah (e) {
        const {name, value} = e.target 

        setSewa(prev => {
            return { ...prev, [name] : name === "harga" ? Number(value) : value}
        })
        
    }

    function batal() {
        navigate("/riwayat")
    }

    const submitPerubahan = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:3005/sewa/ubah/${id}`, {
                method : "PUT",
                headers : {"Content-Type" : "application/json"},
                credentials : "include",
                body : JSON.stringify(sewa)
            })

            const data = await response.json()

            if (response.ok) {
                setMessage("Berhasil mengubah sewa")
                setTimeout(() => navigate("/riwayat"), 700)
                console.log("Sukses : ", data)
            } else {
                setMessage("Gagal mengubah sewa")
                console.log("Gagal : ", data)
            }

        } catch (error) {
            console.error(error)
            setMessage("Server Error")
        }
    }

    return (
        <div>
            <div>
                <form action="" onSubmit={submitPerubahan}>
                    <label htmlFor="" className="block">Lapangan</label>
                    <input type="text" name="lapangan" value={sewa.lapangan} onChange={inputUbah} />

                    <label htmlFor="" className="block">Durasi</label>
                    <input type="text" name="durasi" value={sewa.durasi} onChange={inputUbah} />

                    <div>
                        <button>Simpan</button>
                        <button type="button" onClick={batal}>Batal</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default UbahSewa