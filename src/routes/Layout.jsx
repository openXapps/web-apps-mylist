import { Outlet } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Header from "../components/Header";
// import Footer from "../components/Footer";

export default function Layout() {
    return (
        <>
            <Header />
            <Toolbar />
            <Outlet />
            {/* <Footer /> */}
        </>
    );
};
