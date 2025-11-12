import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Lapangan() {
    const [data, setData] = useState([])
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const getLapangan = async () => {
        try {
            const response = await fetch("http://localhost:3005/lapangan/lihat", {
                credentials: "include",
            })

            const data = await response.json()

            setData(data)

            if (!response.ok) {
                setMessage("Gagal Mengambil Data")
                console.log(" Result : ", data)
            }

        } catch (err) {
            console.log(err)
            setMessage("Server Error!")
        }
    }

    useEffect(() => {
        getLapangan()
    }, [])

    function tambah () {
        navigate("/tambahlapangan")
    }

    function halamanEdit(id) {
        navigate(`/edit/${id}`)
    }

    const hapusLapangan = async (id) => {
        try {
            const response = await fetch(`http://localhost:3005/lapangan/hapus/${id}`, {
                method: "DELETE",
                credentials: "include",
            })

            if (!response.ok) {
                setMessage("Gagal Menghapus")
            }

            setData(prev => prev.filter(d => d.id !== id))
            setMessage("Berhasil Dihapus")


        } catch (error) {
            console.error(error)
            setMessage("Server Error!")
        }
    }

    return (
        <div>
            <div>
                {message && <p>{message}</p>}
                <button onClick={tambah}>Tambah</button>
            </div>
            <div>
                {data.map(d => (
                    <div key={d.id}>
                        <img src={`http://localhost:3005${d.filePath}`} alt={d.lapangan} />
                        <p>{d.lapangan}</p>
                        <p>{d.harga}</p>
                        <div>
                            <button onClick={() => halamanEdit(d.id)}>Edit</button>
                            <button onClick={() => hapusLapangan(d.id)}>Hapus</button>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )

}