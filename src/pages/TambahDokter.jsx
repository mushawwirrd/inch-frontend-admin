import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button/Button"

function TambahDokter() {
  const [dokter, setDokter] = useState({
    nama: "",
    specialis: "",
    jam: "",
    tanggal: ""
  })
  const [file, setFile] = useState()
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const inputDokter = (e) => {
    const { name, value } = e.target

    setDokter(prev => {
      return { ...prev, [name]: value }
    })
  }

  const submitHandle = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append("nama", dokter.nama)
    formData.append("specialis", dokter.specialis)
    formData.append("jam", dokter.jam)
    formData.append("tanggal", dokter.tanggal)
    formData.append("file", file)

    try {
      const response = await fetch("http://localhost:3005/dokter/tambah", {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      if (response.ok) {
        setMessage("Dokter Berhasil Ditambahkan")
        setTimeout(() => navigate("/dokter"), 700)
      } else {
        setMessage("Daktar Gagal Ditambahkan")
      }

    } catch (err) {
      console.error(err)
      setMessage("Server error")
    }
  }

  return (

    <div className="py-6 mx-8">
      <div className="flex flex-col justify-start">

        {/* <div className=" relative overflow-hidden rounded-xl mb-3 lg:mx-40">

          <div className="flex items-center justify-center object-cover lg:h-60 ">
            <img src="/rs.jpg" alt="sanjaya" />
          </div>

          <div className="absolute bottom-0 right-0 left-0 bg-black/30 backdrop-blur-xl py-2 px-4">
            <h1 className="font-medium text-sm lg:text-base text-white">RS. Sanjaya</h1>
            <h2 className="text-white text-xs lg:text-sm">Kecepatan adalah prioritas kami</h2>
          </div>

        </div>

        <div className="flex justify-start mb-3">
          <h1 className="text-xl font-medium">Jadwal Praktik Dokter RS. Sanjaya</h1>
        </div> */}

        <div className="rounded-xl w-full px-6 py-6 lg:px-12 shadow-xl border">
          <form onSubmit={submitHandle}>

            <div className="mb-3 ">
              <label className="block mb-1">Foto Dokter</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Nama Dokter</label>
              <input
                type="text"
                name="nama"
                value={dokter.nama} onChange={inputDokter}
                className="rounded-xl border p-2 w-full" />
            </div>

            <div className="mb-3">
              <label className="block mb-1">Specialis</label>
              <input
                type="text"
                name="specialis"
                value={dokter.specialis}
                onChange={inputDokter}
                className="rounded-xl border p-2 w-full" />
            </div>

            <div className="flex flex-col justify-start gap-x-3">

              <div className="mb-1">
                <p >Jadwal</p>
              </div>

              <div className="flex flex-col lg:flex-row justify-start gap-x-3">

                <div className="mb-3">
                  <label className="block text-sm mb-1">Hari</label>
                  <input
                    type="date"
                    name="tanggal"
                    value={dokter.tanggal}
                    onChange={inputDokter}
                    className="rounded-xl border p-2" />
                </div>

                <div className="mb-3">
                  <label className="block text-sm mb-1">Jam</label>
                  <input
                    type="time"
                    name="jam" v
                    alue={dokter.jam}
                    onChange={inputDokter}
                    className="rounded-xl border p-2 " />
                </div>

              </div>

            </div>


            <div className="flex justify-end">
              <Button lable="Tambah" />
            </div>

          </form>
        </div>

      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export default TambahDokter