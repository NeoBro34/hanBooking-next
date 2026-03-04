import React from 'react';
import { useRouter } from 'next/router';
import { Box, Stack } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Member } from '../../types/member/member';

interface TopAgentProps {
	agent: Member;
}
const TopAgentCard = (props: TopAgentProps) => {
	const { agent } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const agentImage = agent?.memberImage
		? `${process.env.REACT_APP_API_URL}/${agent?.memberImage}`
		: '/img/profile/defaultUser.svg';

	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<div className="flex flex-nowrap lg:ml-5 md:ml-5 ml-5 mt-5 cursor-pointer">
                <Stack className="overflow-hidden hover:-translate-y-1 transition duration-300">
                    <Box className="w-65 flex justify-center ">
                        <div className="bg-black text-white rounded-2xl">
                            <div className="relative -mt-px overflow-hidden rounded-2xl">
                                <img src={agentImage} alt="" className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"/>
                                <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                            </div>
                            <div className="px-4 pb-6 text-center">
                                <p className="mt-4 text-lg">{agent.memberNick}</p>
                                <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#9938CA] to-[#E0724A] text-transparent bg-clip-text">{agent.memberType}</p>
                            </div>
                        </div>
                    </Box>
                </Stack>
            </div>
		);
	} else {
		return (
			<div className="flex flex-nowrap lg:ml-5 md:ml-5 ml-5 mt-5 cursor-pointer">
                <Stack className="overflow-hidden hover:-translate-y-1 transition duration-300">
                    <Box className="w-65 flex justify-center ">
                        <div className="bg-black text-white rounded-2xl">
                            <div className="relative -mt-px overflow-hidden rounded-2xl">
                                <img src={agentImage} alt="" className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"/>
                                <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
                            </div>
                            <div className="px-4 pb-6 text-center">
                                <p className="mt-4 text-lg">{agent.memberNick}</p>
                                <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#9938CA] to-[#E0724A] text-transparent bg-clip-text">{agent.memberType}</p>
                            </div>
                        </div>
                    </Box>
                </Stack>
            </div>
		);
	}
};

export default TopAgentCard;
