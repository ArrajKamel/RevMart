import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

type LayoutProps = {
    isAuthenticated: boolean;
};

const Layout: React.FC<LayoutProps> = ({ isAuthenticated }) => {
    return (
        <div>
            <NavBar isAuthenticated={isAuthenticated} />
            <div style={{ padding: "20px" }}>
                <Outlet /> {/* This renders the child route */}
            </div>
        </div>
    );
};

export default Layout;
