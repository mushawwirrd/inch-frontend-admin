import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditLapangan() {
    const { id } = useParams()
    const [edit, setEdit] = useState({
        lapangan: "",
        harga: ""
    })
    const [file, setFile] = useState()
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    function inputEdit(e) {
        const { name, value } = e.target

        setEdit(prev => {
            return { ...prev, [name]: name === "harga" ? Number(value) : value }
        })
    }

    const getLapangan = async () => {
        try {
            const response = await fetch(`http://localhost:3005/lapangan/lihatsatu/${id}`, {
                credentials: "include",
            })

            const data = await response.json()

            setEdit(data)


        } catch (error) {
            console.error(error)
            setMessage("Error")
        }
    }

    useEffect(() => {
        getLapangan()
    }, [])

    function batal () {
        navigate("/lapangan")
    }

    const submitPerubahan = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append("lapangan", edit.lapangan)
        formData.append("harga", edit.harga)
        formData.append("file", file)

        try {
            const response = await fetch(`http://localhost:3005/lapangan/edit/${id}`, {
                method: "PUT",
                credentials: "include",
                body: formData
            })

            const data = await response.json()

            if (response.ok) {
                setMessage("Perubahan Disimpan")
                setTimeout(() => navigate("/lapangan"), 700)
            } else {
                setMessage("Gagal Merubah")
                console.log("Result : ", data)
            }

        } catch (error) {
            console.error(error)
            setMessage("Error Server")
        }
    }

    return (
        <div>
            <div>
                
                <form action="" onSubmit={submitPerubahan}>

                    <label htmlFor="" className="block">Foto Lapangan</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />

                    <label htmlFor="" className="block">Nama Lapangan</label>
                    <input type="text" name="lapangan" value={edit.lapangan} onChange={inputEdit} />

                    <label htmlFor="" className="block">Harga</label>
                    <input type="text" name="harga" value={edit.harga} onChange={inputEdit} />

                    <div>
                        <button>Simpan Perubahan</button>
                        <button type="button" onClick={batal}>Batal</button>
                    </div>

                </form>
            </div>
            {message && <p>{message}</p>}
        </div>
    )

}