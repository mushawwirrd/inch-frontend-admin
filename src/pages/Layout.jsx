import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, LucideLogOut } from "lucide-react";


export default function Layout() {
    const { isLogin, logOut } = useAuth()
    const navigate = useNavigate()

    const logOutHandle = async () => {
        await logOut()
        navigate("/admin")
    }

    return (

        <div >

            <nav className=" bg-primary  text-white px-8 py-5 ">

                <div className="flex items-center justify-between">

                    <p className="text-xl font-bold">SJY</p>

                    <ul >

                        {/* <li>
                            <Link to="/">Home</Link>
                        </li> */}

                        {isLogin ? (
                            <>

                                <div className="flex space-x-5 font-medium">

                                    <li>
                                        <Link to="/beranda-admin" className="hover:text-slate-200 duration-200">Beranda</Link>
                                    </li>

                                    <li>
                                        <Link to="/dokter" className="hover:text-slate-200 duration-200">Dokter</Link>
                                    </li>

                                    <button onClick={logOutHandle} className="flex items-center justify-center hover:text-slate-200 duration-200 gap-x-1"><LogOut size={20}/> Keluar </button>

                                </div>

                                {/* <div className="block lg:hidden">
                                    <button className="bg-white w-6 h-6">

                                    </button>
                                </div> */}

                            </>
                        ) : (
                            <>

                                {/* 
                                <li>
                                    <Link to="/daftar">Daftar</Link>
                                </li>
                                <li>
                                    <Link to="/masuk">Masuk</Link>
                                </li> */}
                            </>
                        )}



                    </ul>

                </div>

            </nav>
            <Outlet />
        </div>

    )
}