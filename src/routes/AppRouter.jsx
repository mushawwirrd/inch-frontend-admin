import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "../pages/Home"
import NoPage from "../pages/NoPage"
import Regis from "../pages/Regis"
import LogIn from "../pages/LogIn"
import Layout from "../pages/Layout"
import { AuthProvider } from "../context/AuthContext"
import PrivateRoutes from "./PrivateRoutes"

import TambahDokter from "../pages/TambahDokter"
import Dokter from "../pages/Dokter"
import BerandaAdmin from "../pages/BerandaAdmin"
import EditDokter from "../pages/EditDokter"


function AppRouter() {
    return (
        <BrowserRouter>

            <AuthProvider>
                <Routes>

                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="daftar-admin" element={<Regis />} />
                        <Route path="admin" element={<LogIn />} />

                        <Route path="beranda-admin" element={<PrivateRoutes><BerandaAdmin /></PrivateRoutes>} />
                        <Route path="tambahdokter" element={<PrivateRoutes><TambahDokter /></PrivateRoutes>} />
                        <Route path="dokter" element={<PrivateRoutes><Dokter /></PrivateRoutes>} />
                        <Route path="edit/:id" element={<PrivateRoutes><EditDokter /></PrivateRoutes>} />

                        <Route path="*" element={<NoPage />} />
                    </Route>

                </Routes>
            </AuthProvider>

        </BrowserRouter>
    )
}

export default AppRouter