import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OutilneButton from "../components/Button/OutlineButton";
import { label } from "framer-motion/client";
import Button from "../components/Button/Button";

export default function EditDokter() {
    const { id } = useParams()
    const [edit, setEdit] = useState({
        nama: "",
        specialis: "",
        jam: "",
        tanggal: ""
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

    const getDokter = async () => {
        try {
            const response = await fetch(`http://localhost:3005/dokter/lihatsatu/${id}`, {
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
        getDokter()
    }, [])



    const submitPerubahan = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append("nama", edit.nama)
        formData.append("specialis", edit.specialis)
        formData.append("jam", edit.jam)
        formData.append("tanggal", edit.tanggal)
        formData.append("file", file)

        try {
            const response = await fetch(`http://localhost:3005/dokter/edit/${id}`, {
                method: "PUT",
                credentials: "include",
                body: formData
            })

            const data = await response.json()

            if (response.ok) {
                setMessage("Perubahan Disimpan")
                setTimeout(() => navigate("/dokter"), 700)
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
        <div className="py-6 mx-8">
            <div className="flex flex-col justify-start">

                <div className="rounded-xl w-full py-6 px-6 lg:px-12 shadow-xl border">

                    <form onSubmit={submitPerubahan}>

                        <div className="mb-3 ">
                            <label className="block">Foto Dokter</label>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])} />
                        </div>

                        <div className="mb-3 ">
                            <label className="block">Nama Dokter</label>
                            <input
                                type="text"
                                name="nama"
                                value={edit.nama}
                                onChange={inputEdit}
                                className="rounded-xl border p-2" />
                        </div>

                        <div className="mb-3 ">
                            <label className="block">Specialis</label>
                            <input
                                type="text"
                                name="specialis"
                                value={edit.specialis}
                                onChange={inputEdit}
                                className="rounded-xl border p-2" />
                        </div>

                        <div className="flex flex-col justify-start">

                            <div className="mb-1">
                                <p>Jadwal</p>
                            </div>

                            <div className="flex flex-col lg:flex-row justify-start gap-x-3">
                                
                                <div className="mb-3">
                                    <label className="block text-sm mb-1">Hari</label>
                                    <input
                                        type="date"
                                        name="tanggal"
                                        value={edit.tanggal}
                                        onChange={inputEdit}
                                        className="rounded-xl border p-2" />
                                </div>

                                <div className="mb-3 " >
                                    <label className="block text-sm mb-1">Jam</label>
                                    <input
                                        type="time"
                                        name="jam"
                                        value={edit.jam}
                                        onChange={inputEdit}
                                        className="rounded-xl border p-2" />
                                </div>



                            </div>

                        </div>

                        <div className="flex justify-end gap-x-2">

                            <OutilneButton type="Button" click={() => navigate("/dokter")} lable="Batal" />
                            <Button lable="Simpan" />

                        </div>

                    </form>
                </div>
            </div>
            {message && <p>{message}</p>}
        </div>
    )

}