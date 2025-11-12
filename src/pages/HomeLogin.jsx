import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function HomeLogin() {
    const [lisLap, setLisLap] = useState([])
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const listLapangan = async () => {
        try {
            const response = await fetch("http://localhost:3005/sewa/listlapangan", {
                credentials: "include"
            })

            const data = await response.json()
            setLisLap(data)


            if (!response.ok) {
                setMessage("Gagal Menampilkan Lapangan")
            }

        } catch (error) {
            console.error(error)
            setMessage("Serve error")
        }
    }

    useEffect(() => {
        listLapangan()
    }, [])


    return (
        <div className="flex items-center justify-center mt-6">
            <div className="blok text-center ">
                {lisLap.map(l => (
                    <div key={l.id}>
                        <img src={`http://localhost:3005${l.filePath}`} alt={l.lapangan} />
                        <p>{l.lapangan}</p>
                        <p>{l.harga}</p>
                        <div>
                            <button
                                onClick={() => navigate("/sewa")}
                                className="bg-sky-500 hover:shadow-lg focus:ring ring-sky-400 rounded-full px-6 py-3 text-lg font-medium text-white"
                            >
                                Sewa
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {message}
        </div>

    )
}

export default HomeLogin