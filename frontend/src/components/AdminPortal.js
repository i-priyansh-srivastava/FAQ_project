import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserMd, faClipboardList, faFileAlt, faBell, faAmbulance, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import FaqManagement from "./FaqManagement";
import "../styles/AdminPortal.css";

const AdminPage = () => {
    const [isNavVisible, setNavVisible] = useState(window.innerWidth > 768);
    const [selectedBtn, setBtn] = useState("FAQ");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setNavVisible(false);
            } else {
                setNavVisible(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleNavigation = () => {
        setNavVisible((prev) => !prev);
    };

    const btnAction = (pressed) => {
        setBtn(pressed);
        if (window.innerWidth <= 768) setNavVisible(false);
    };

    return (
        <div className="DashboardContainer">
            <button className="hamburger" onClick={toggleNavigation}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            <div className={`navigation ${!isNavVisible ? "hiddenNavigation" : ""}`}>
                <button className="naviBtn" onClick={() => btnAction("Market")}>Market</button>
                <button className="naviBtn" onClick={() => btnAction("Users")}>Users</button>
                <button className="naviBtn" onClick={() => btnAction("FAQ")}>FAQ</button>
                <button className="naviBtn" onClick={() => btnAction("Revenue")}>Revenue</button>
                <button className="naviBtn" onClick={() => btnAction("Settings")}>Settings</button>
                <Link to="/">
                    <button className="naviBtn">Logout</button>
                </Link>
            </div>

            <div className="RHS">
                <div className="details">
                    {selectedBtn === "FAQ" && <FaqManagement />}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
