import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import OutilneButton from "../components/Button/OutlineButton";
import Table from "../components/Table/Table";

export default function Dokter() {
    const [data, setData] = useState([])
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const getDokter = async () => {
        try {
            const response = await fetch("http://localhost:3005/dokter/lihat", {
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
        getDokter()
    }, [])

    function tambah() {
        navigate("/tambahDokter")
    }

    function halamanEdit(id) {
        navigate(`/edit/${id}`)
    }

    const hapusDokter = async (id) => {
        try {
            const response = await fetch(`http://localhost:3005/dokter/hapus/${id}`, {
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

    const columns = [
        {
            title: "Dokter",
            propertie: "nama",
            render: (dr) => (
                <div className="p-2">

                    <div className="flex flex-col items-center justify-center ">

                        <div className=" overflow-hidden rounded-lg flex items-start object-cover h-24 w-24">
                            <img src={`http://localhost:3005${dr.filePath}`} alt={dr.nama} />
                        </div>

                        <div className="mt-1">
                            <p className="text-sm font-medium"> {dr.nama}</p>
                        </div>

                    </div>

                    {/* <div className="  bg-white/20 backdrop-blur-sm p-1">
                    </div> */}

                </div>
            )
        },
        { title: "Specialis", propertie: "specialis" },
        { title: "Jam", propertie: "jam" },
        { title: "Hari", propertie: "tanggal" },
        {
            title: "Action",
            render: (dr) => (
                <div className="flex justify-center gap-x-2">
                    <OutilneButton click={() => hapusDokter(dr.id)} lable="Hapus" />
                    <Button click={() => halamanEdit(dr.id)} lable="Edit" />
                </div>
            )
        }
    ]

    return (
        <div className="py-5 mx-10">

            <div >

                <div className=" flex justify-end mb-3">
                    <Button click={tambah} lable="Tambah" />
                </div>

                <Table data={data} columns={columns} />

                {message && <p>{message}</p>}

            </div>
        </div>
    )

}