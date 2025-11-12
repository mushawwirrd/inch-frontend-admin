import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Layout() {
    const { isLogin, logOut } = useAuth()
    const navigate = useNavigate()

    const logOutHandle = async () => {
        await logOut()
        navigate("/masuk")
    }

    return (

        <div>

            <nav className="bg-purple-500 text-white px-8 py-6">

                <div className="flex items-center justify-between">

                    <p className="text-lg font-medium">VAMOS!</p>

                    <ul className="flex space-x-6">

                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        {isLogin ? (
                            <>
                                
                                {/* <li>
                                    <Link to="/tambahlapangan">Tambah Lapangan</Link>
                                </li> */}
                                <li>
                                    <Link to="/lapangan">Lapangan</Link>
                                </li>
                                <button onClick={logOutHandle}>Keluar</button>

                            </>
                        ) : (
                            <>

                                <li>
                                    <Link to="/daftar">Daftar</Link>
                                </li>
                                <li>
                                    <Link to="/masuk">Masuk</Link>
                                </li>
                            </>
                        )}



                    </ul>

                </div>

            </nav>
            <Outlet />
        </div>

    )
}