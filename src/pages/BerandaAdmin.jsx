import { useEffect, useState } from "react"
import Table from "../components/Table/Table"


export default function BerandaAdmin() {
    const [lisDr, setLisDr] = useState([])
    const [message, setMessage] = useState("")


    const listDokter = async () => {
        try {
            const response = await fetch("http://localhost:3005/dokter/lihat", {
                credentials: "include"
            })

            const data = await response.json()
            setLisDr(data)


            if (!response.ok) {
                setMessage("Gagal Menampilkan Dokter")
            }

        } catch (error) {
            console.error(error)
            setMessage("Serve error")
        }
    }

    useEffect(() => {
        listDokter()
    }, [])

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
        // { title: "Dokter", propertie: "nama" },
        { title: "Specialis", propertie: "specialis" },
        { title: "Jam", propertie: "jam" },
        { title: "Hari", propertie: "tanggal" }
    ]


    return (
        <div className="py-5 mx-10 lg:mx-20">

            <div className="relative overflow-hidden rounded-xl mb-8 lg:mx-20">

                <div className="flex flex-col justify-center object-cover md:h-72">
                    <img src="/rs.jpg" alt="sanjaya" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md  p-3">
                    <h2 className="font-medium text-white text-lg lg:text-xl">Selamat Datang Di RS. Sanjaya</h2>
                    <h2 className="text-white text-sm">Kecepatan adalah keutamaan kami</h2>
                </div>

            </div>
            
            <Table data={lisDr} columns={columns} />

            {message}
        </div>

    )
}
