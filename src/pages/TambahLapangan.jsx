import { useState } from "react"
import { useNavigate } from "react-router-dom"

function TambahLapangan() {
  const [lapangan, setLapangan] = useState({
    lapangan: "",
    harga: ""
  })
  const [file, setFile] = useState()
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const inputLapangan = (e) => {
    const { name, value } = e.target

    setLapangan(prev => {
      return { ...prev, [name]: name === "harga" ? Number(value) : value }
    })
  }

  const submitHandle = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append("lapangan", lapangan.lapangan)
    formData.append("harga", lapangan.harga)
    formData.append("file", file)

    try {
      const response = await fetch("http://localhost:3005/lapangan/tambah", {
        method: "POST",
        credentials: "include",
        body: formData,
      })

      if (response.ok) {
        setMessage("Lapangan Berhasil Ditambahkan")
        setTimeout(() => navigate("/lapangan"), 700)
      } else {
        setMessage("Lapanagan Belum Ditambahkan")
      }

    } catch (err) {
      console.error(err)
      setMessage("Server error")
    }
  }

  return (

    <div>

      <div>
        <form action="" onSubmit={submitHandle}>

          <label htmlFor="" className="block">Foto Lapangan</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <label htmlFor="" className="block">Nama Lapangan</label>
          <input type="text" name="lapangan" value={lapangan.lapangan} onChange={inputLapangan} />

          <label htmlFor="" className="block">Harga</label>
          <input type="text" name="harga" value={lapangan.harga} onChange={inputLapangan} />

          <div>
            <button>Tambahkan Lapangan</button>
          </div>

        </form>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export default TambahLapangan