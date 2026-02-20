import { Box, Button, CardMedia, Stack, Typography } from "@mui/material";
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import VerifiedIcon from '@mui/icons-material/Verified';

const AgentCard = () => {
    return (
        <Stack className={`agentCard fade-in-up`} style={{ animationDelay: `6s` }}>
            <Stack className="cardImageWrapper">
                 <Box className='top-icon'>
                        <Typography style={{fontSize: "22px", fontWeight: "bold"}}>Agent</Typography>
                        <Box><VerifiedIcon style={{fontSize:"20px", color: "green"}}/></Box>
                    </Box>
                <CardMedia
                    component="img"
                    image='/img/profile/agent2.png'
                    className="cardImage"
                />
            </Stack>
            <Stack className="cardContent">
                <Box className="agent-name">Simon</Box>
                <Box className="agent-location"><PersonPinCircleIcon style={{color: "gray"}}/>Seoul</Box>
                <Box className='border'></Box>
            </Stack>
            <Stack className="card-footer">
                <button
                    type="button"
                    className="group flex items-center gap-2 px-5 py-2 cursor-pointer font-medium   text-gray-400  transition active:scale-95 bg-gradient-to-r from-yellow-600 to-[#4e4b4b] py-1 px-3 rounded-full text-white hover:translate-x-0.5 transition"
                >
                    <p className="group-hover:translate-x-0.5 transition-all">
                        View Profile
                    </p>
                    <svg
                        className="group-hover:translate-x-1 transition-all"
                        width="15"
                        height="11"
                        viewBox="0 0 15 11"
                        fill="none"
                    >
                        <path
                            d="M1 5.5h13.092M8.949 1l5.143 4.5L8.949 10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <Stack className="card-statistics">
                    <Box>
                        {true ? (
                            <FavoriteIcon sx={{ marginRight:"5px", color: '#ef4444' }} />
                        ) : (
                            <FavoriteIcon sx={{ marginRight:"5px", color: 'gray' }} />
                        )}
                            15
                    </Box>
                    <Box><RemoveRedEyeIcon className="icon"/>21</Box>
                    <Box><ContentPasteIcon className="icon"/>16</Box>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default AgentCard;