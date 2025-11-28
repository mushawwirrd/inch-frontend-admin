import { useEffect, useState } from "react"

function Home() {
    const [dokter, setDokter] = useState([])
    const [message, setMessage] = useState("")

    const getDokter = async () => {

        try {
            const res = await fetch("http://localhost:3005/dokter/lihat-public", {
                credentials: "include"
            })

            const data = await res.json()

            setDokter(data)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getDokter()
    }, [])

    return (
        <div className=" py-8 mx-10 lg:mx-20">
            {/* // <div> */}

            <div className="relative overflow-hidden rounded-xl mb-12">

                <div className="flex flex-col justify-center object-cover  md:h-96">
                    <img src="/rs.jpg" alt="sanjaya" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md  p-4">
                    <h2 className="font-medium text-white text-lg lg:text-2xl">Selamat Datang Di RS. Sanjaya</h2>
                    <h2 className="text-white text-md">Kecepatan adalah keutamaan kami</h2>
                </div>
            </div>

            <div>

                <div className="mb-4 text-center">
                    <h1 className="text-xl lg:text-2xl font-semibold">Jadwal Prkatik Dokter RS. Sanjaya</h1>
                </div>

                <div className="rounded-lg overflow-x-auto ">

                    <table className="w-full">

                        <thead >
                            <tr>

                                <th className="px-12 py-3 rounded-tl-lg">Dokter</th>
                                <th className="px-10">Specialis</th>
                                <th className="px-14">Jam </th>
                                <th className="px-12 rounded-tr-lg">Tanggal </th>

                            </tr>
                        </thead>

                        <tbody>
                            {dokter.map(dr => {
                                return (

                                    <tr key={dr.id}  >

                                        <td className=" p-2 whitespace-nowrap border">
                                            <div className="flex flex-col items-center justify-center">

                                                <div className="relative overflow-hidden rounded-xl">

                                                    <div className="flex items-center justify-center object-cover w-32">
                                                        <img src={`http://localhost:3005${dr.filePath}`} alt={dr.nama} />
                                                    </div>

                                                    <div className="absolute bottom-0 right-0 left-0 bg-black/30 backdrop-blur-xl p-1">
                                                        <p>{dr.nama}</p>
                                                    </div>

                                                </div>
                                            </div>


                                        </td>

                                        <td className="text-center whitespace-nowrap border ">{dr.specialis}</td>
                                        <td className="text-center whitespace-nowrap border">{dr.jam}</td>
                                        <td className="text-center whitespace-nowrap border">{dr.tanggal}</td>

                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>

                </div>
            </div>

        </div>

    )
}

export default Home

