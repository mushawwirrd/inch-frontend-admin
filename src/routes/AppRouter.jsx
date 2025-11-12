import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "../pages/Home"
import NoPage from "../pages/NoPage"
import Regis from "../pages/Regis"
import LogIn from "../pages/LogIn"
import Layout from "../pages/Layout"
import { AuthProvider } from "../context/AuthContext"
import TambahLapangan from "../pages/TambahLapangan"
import PrivateRoutes from "./PrivateRoutes"
import Lapangan from "../pages/Lapangan"
import EditLapangan from "../pages/EditLapangan"


function AppRouter() {
    return (
        <BrowserRouter>

            <AuthProvider>
                <Routes>

                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="daftar" element={<Regis />} />
                        <Route path="masuk" element={<LogIn />} />
                        <Route path="tambahlapangan" element={<PrivateRoutes><TambahLapangan /></PrivateRoutes>} />
                        <Route path="lapangan" element={<PrivateRoutes><Lapangan /></PrivateRoutes>} />
                        <Route path="edit/:id" element={<PrivateRoutes><EditLapangan /></PrivateRoutes>} />

                        <Route path="*" element={<NoPage />} />
                    </Route>

                </Routes>
            </AuthProvider>

        </BrowserRouter>
    )
}

export default AppRouter