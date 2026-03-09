import { GET_AGENTS } from "@/apollo/user/query";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { T } from "@/libs/types/common";
import { Member } from "@/libs/types/member/member";
import { AgentsInquiry } from "@/libs/types/member/member.input";
import { useQuery } from "@apollo/client";
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

interface TopAgentsProps {
	initialInput: AgentsInquiry;
}

const TopUsers = (props: TopAgentsProps) => {
    const { initialInput } = props;
	const device = useDeviceDetect();
    const { t } = useTranslation('common');
	const [topAgents, setTopAgents] = useState<Member[]>([]);

	/** APOLLO REQUESTS **/
        const {
        loading: getAgentsLoading,
        data: getAgentsData,
        error: getAgentsError,
        refetch: getAgentsRefetch,
    } = useQuery(
        GET_AGENTS, 
        {
            fetchPolicy: 'cache-and-network',
            variables: { input: initialInput },
            notifyOnNetworkStatusChange: true,
        }
    );

    useEffect(() => {
        if (getAgentsData) {
            setTopAgents(getAgentsData?.getAgents?.list);
        }
    }, [getAgentsData]);
    
	/** HANDLERS **/
	if (device === 'mobile') {
		return (
			<div>{t('Mobile')}</div>
		);
	} else {
        return (
            <div className="flex items-center divide-x divide-gray-300 mt-15">
                <div className="flex -space-x-3 pr-3">
                    {topAgents.map((member,  index) => {
                        return (
                            <Stack key={index} className="group relative">
                                <Stack className="absolute border border-gray-200 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 -top-17 group-hover:mr-2 right-0 transition-all duration-400 pl-2 pr-2 py-1 rounded text-nowrap">
                                    <Stack className="flex flex-col">
                                        <Box className="flex items-center gap-1">
                                            <p className="font-medium">{member.memberNick}</p>
                                            <svg className="mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" fill="#2196F3" />
                                            </svg>
                                        </Box>
                                        <span className="text-xs text-slate-500">{member.memberFullName}</span>
                                    </Stack>
                                    <div className="size-3 border-r border-b border-gray-300/90 bg-white rotate-45 absolute right-4 -bottom-[7px]"></div>
                                </Stack>
                                <img src={member?.memberImage
                                    ? `${process.env.REACT_APP_API_URL}/${member?.memberImage}`
                                    : '/img/profile/defaultUser.svg'}
                                    alt="image"
                                    className="size-12 rounded-full border-2 border-white group-hover:-translate-x-2 transition-all duration-400 z-2" />
                            </Stack>
                        )
                    })}
                    <Stack className="group relative">
                        <Box className="flex justify-center items-center size-12 rounded-full border-2 border-white group-hover:transition-all duration-400 z-2 bg-gradient-to-r from-yellow-600 to-[#4e4b4b]">200+</Box>
                    </Stack>
                </div>
                <div className="pl-3">
                    <Box className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
                        </svg>
                        <p className="text-gray-100 font-medium ml-2 text-gray-600">5.0</p>
                    </Box>
                    <p className="flex items-center gap-2 text-slate-50 text-xs md:text-base py-3 rounded-lg transition text-gray-600">
                        <span className="relative flex size-3.5 items-center justify-center">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300"></span>
                            <span className="relative inline-flex size-2 rounded-full bg-green-600"></span>
                        </span>
                        <span className="text-gray-500">{t('Trusted by')}</span> 
                        <span className="font-medium text-yellow-800">
                            100,000+
                        </span> 
                        <span className="text-gray-500">{t('users')}</span> 
                    </p>
                </div>
            </div>
        );
    }
};

TopUsers.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'memberRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopUsers;
