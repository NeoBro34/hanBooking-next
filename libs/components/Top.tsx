import { useState } from "react";
import { Box, Container, Stack } from "@mui/material"
import Link from "next/link";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
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
                            <img style={{marginLeft: "-70px", marginRight: "40px"}} src="/img/logo/logoWhite.png" alt="" />
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
                                <a href="/stays" className="relative overflow-hidden h-6 group">
                                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Stays</span>
                                    <span
                                        className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Stays</span>
                                </a>
                                <a href="/agent" className="relative overflow-hidden h-6 group">
                                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Agents</span>
                                    <span
                                        className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Agents</span>
                                </a>
                                <a href="/blog" className="relative overflow-hidden h-6 group">
                                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Blog</span>
                                    <span
                                        className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Blog</span>
                                </a>
                                <a href="/about" className="relative overflow-hidden h-6 group">
                                    <span className="block group-hover:-translate-y-full transition-transform duration-300">About</span>
                                    <span
                                        className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">About</span>
                                </a>
                                <a href="/cs" className="relative overflow-hidden h-6 group">
                                    <span className="block group-hover:-translate-y-full transition-transform duration-300">Support</span>
                                    <span
                                        className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">Support</span>
                                </a>
                            </div>

                            
                        </nav>
                    </Box>
                    <Box component={"div"} className={"user-box"}>
                        {true ? (
                            <button
                                className="border border-slate-100 hover:bg-slate-600 hover:text-slate-100 px-3 py-2 rounded-full text-sm text-slate-400 font-medium transition duration-200 cursor-pointer ">
                                <AccountCircleOutlinedIcon sx={{marginRight: "10px"}}/>Login / Apply
                            </button>
                        ) : (
                            <div className={"login-user"}>
                                <img src={"/img/profile/defaultUser.svg"} alt="" />
                            </div>
                        )}
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Top;