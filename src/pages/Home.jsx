
function Home() {

    function BuatProject(event) {
        event.preventDefault()
        alert("Bayar dulu")
    }

    function handel (e) {
       
    }

    return (
        <div className="flex items-center justify-center mt-6">
            <div className="blok text-center ">
                <h3 className="text-4xl font-semibold py-3 mb-2">Mari kita buat projectnya</h3>
                <button onClick={BuatProject} className="bg-sky-500 hover:shadow-lg focus:ring ring-sky-400 rounded-full px-6 py-3 text-lg font-medium text-white" >Buat Project</button>
            </div>
        </div>

    )
}

export default Home

