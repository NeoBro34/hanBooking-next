import { Box, Container, Stack } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from "@mui/material/Badge";
import { NextPage } from "next";
import { AgentsInquiry } from "@/libs/types/member/member.input";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Member } from "@/libs/types/member/member";
import { useQuery } from "@apollo/client";
import { GET_AGENTS } from "@/apollo/user/query";
import { T } from "@/libs/types/common";
import TopAgentCard from "../common/TopAgentCard";

interface TopAgentsProps {
	initialInput: AgentsInquiry;
}


const TopAgents = (props: TopAgentsProps) => {
    const { initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
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
            <div>Mobile</div>
        );
    } else {
        return (
            <div className="top-agents">
                <Stack 
                    style={{
                        display: "flex", 
                        flexDirection: "row", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        marginTop: "20px"
                    }}
                >
                    <Box>
                        <p
                        className="title text-3xl font-semibold"
                        >
                            Top Agents
                        </p>
                        <p
                            className="title-desc text-sm text-slate-500  mt-2"
                        >
                            Handpicked luxury accommodations for unforgettable experiences
                        </p>
                    </Box>
                    <Box>
                        <div className="flex items-center justify-end mt-6 text-sm">
                            <button
                                type="button"
                                className="group flex items-center gap-4 px-8 py-3 cursor-pointer font-medium   text-gray-500  transition active:scale-95"
                            >
                                <a href="/agent" className="group-hover:translate-x-1 transition-all">
                                    All Agents
                                </a>
                                <svg
                                    className="group-hover:translate-x-3 transition-all"
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
                        </div>
                    </Box>
                </Stack>
                <Stack className="scroll-box flex flex-col m-auto p-auto mt-20">
                        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                            {topAgents.map((agent: Member) => (
                                <TopAgentCard agent={agent} key={agent?.memberNick} />
                            ))}
                        </div>
                    </Stack>
            </div>
        );
    }
};

TopAgents.defaultProps = {
	initialInput: {
		page: 1,
		limit: 10,
		sort: 'memberRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopAgents;