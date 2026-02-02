import { useState } from "react";
import { Box, Stack } from "@mui/material"
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Logout } from "@mui/icons-material";


const Top = () => {
	const [colorChange, setColorChange] = useState(false);
	const [bgColor, setBgColor] = useState<boolean>(false);


    const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};

    if (typeof window !== 'undefined') {
		window.addEventListener('scroll', changeNavbarColor);
	}
    return (
        <Stack className={"navbar"}>
            <Stack className={`navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''}`}>
                <Stack className={"container"}>
                    <Box component={"div"} className={"logo-box"}>
                        <Link href={"/"}>
                            <img src="/img/logo/logoWhite.png" alt="" />
                        </Link>
                    </Box>
                    <Box component={"div"} className={"router-box"}>
                        <nav className="flex items-center  max-md:w-full max-md:justify-between border-slate-700 px-6 py-4 rounded-full text-white text-sm">
                            <div className="hidden md:flex items-center gap-6 ml-7">
                                <a href="/" className="relative overflow-hidden h-6 group">
                                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Home</span>
                                    <span
                                        className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Home</span>
                                </a>
                                <a href="#" className="relative overflow-hidden h-6 group">
                                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Hotels</span>
                                    <span
                                        className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Hotels</span>
                                </a>
                                <a href="#" className="relative overflow-hidden h-6 group">
                                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Agents</span>
                                    <span
                                        className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Agents</span>
                                </a>
                                <a href="#" className="relative overflow-hidden h-6 group">
                                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Community</span>
                                    <span
                                        className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Community</span>
                                </a>
                            </div>

                            <div className="hidden ml-14 md:flex items-center gap-4">
                                <button
                                    className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition">
                                    Contact
                                </button>
                                <button
                                    className="border border-slate-600 hover:bg-slate-800 px-10 py-2 rounded-full text-sm font-medium transition duration-300">
                                    Login
                                </button>
                            </div>
                            <button id="menuToggle" className="md:hidden text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </nav>
                    </Box>
                    <Box component={"div"} className={"user-box"}>
                        <div className={"login-user"}>
                            <img src={"/img/profile/defaultUser.svg"} alt="" />
                        </div>
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Top;