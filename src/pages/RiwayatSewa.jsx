import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Edit } from "lucide-react"

function RiwayatSewa() {
    const [riwayat, setRiwayat] = useState([])
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const riwayatSewa = async () => {
        try {
            const response = await fetch("http://localhost:3005/sewa/riwayat", {
                credentials: "include"
            })

            const data = await response.json()
            setRiwayat(data)

            if (!data) {

                setMessage("Anda Belum Memiliki Riwayat")
            }

            if (!response.ok) {
                setMessage("Gagal Menampilkan Riwayat")
            }

        } catch (error) {
            console.error(error)
            setMessage("Serve error")
        }
    }

    useEffect(() => {
        riwayatSewa()
    }, [])

    function ubahSewa(id) {
        navigate(`/ubahsewa/${id}`)
    }

    const batalPesanan = async (id) => {
        const deleteConfirm = window.confirm("Yakin ingin membatalkan pesanan?")
        if (!deleteConfirm) return

        try {
            const response = await fetch(`http://localhost:3005/sewa/batal/${id}`, {
                method: "DELETE",
                credentials: "include",
            })

            setRiwayat(data => data.filter(d => d.id !== id))
            setMessage("Pesanan dibatalkan")

            if (!response.ok) {
                setMessage("Gagal membatalkan pesanan")
            }

        } catch (error) {
            console.error(error)
            setMessage("server Error")
        }
    }

    return (
        <div>

            <div>
                {riwayat.map(r => (
                    <div key={r.id}>
                        <p>{r.lapangan}</p>
                        <p>{r.durasi}</p>
                        <p>{r.total}</p>
                        <div>
                            <button onClick={() => ubahSewa(r.id)}><Edit size={20}/></button>
                            <button onClick={() => batalPesanan(r.id)}>Batalkan Pesanan</button>
                        </div>
                    </div>
                ))}

                {message && <p>{message}</p>}
            </div>
        </div>

    )
}

export default RiwayatSewa