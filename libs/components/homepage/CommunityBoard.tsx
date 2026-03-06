import { GET_BOARD_ARTICLES } from "@/apollo/user/query";
import { BoardArticleCategory } from "@/libs/enums/board-article.enum";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import { T } from "@/libs/types/common";
import { useQuery } from "@apollo/client";
import { Box, Stack } from "@mui/material";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";
import CommunityCard from "./CommunityCard";

const CommunityBoard = () => {
	const device = useDeviceDetect();
	const [searchCommunity, setSearchCommunity] = useState({
		page: 1,
		sort: 'createdAt',
		direction: 'DESC',
	});
	const [freeArticles, setFreeArticles] = useState<BoardArticle[]>([]);
    const [page, setPage] = useState(1);

	/** APOLLO REQUESTS **/
	const {
		loading: getFreeArticlesLoading,
		data: getFreeArticlesData,
		error: getFreeArticlesError,
		refetch: getFreeArticlesRefetch,
	} = useQuery(
		GET_BOARD_ARTICLES, 
		{
			fetchPolicy: 'network-only',
			variables: { 
				input: {
					...searchCommunity, 
                    page: page,
					limit: 4, 
					search: {  } 
				}
			},
			notifyOnNetworkStatusChange: true,
			onCompleted: (data: T) => {
				setFreeArticles(data?.getBoardArticles?.list);
			}
		}
	);
    
    if (device === 'mobile') {
		return <div>BlogList PAGE MOBILE</div>;
	} else {
        return (
        <>
            <Stack 
                style={{
                    display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginTop: "150px"
                }}
            >
                <Box>
                    <p
                    className="title text-3xl font-semibold"
                    >
                        Our CommunityBlog
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
                            className="group flex items-center gap-4 px-8 py-3 cursor-pointer font-medium text-gray-500  transition active:scale-95"
                        >
                            <a href="/blog" className="group-hover:translate-x-1 transition-all">
                                Our Blog
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
            <Stack>
                <div className="flex items-center gap-6 h-[400px] w-full max-w-5xl mt-10 mx-auto mt-20 mb-15">
                    {freeArticles.map((article, index) => {
                        return <CommunityCard vertical={false} article={article} index={index} key={article?._id} />;
                    })}
                </div>
            </Stack>
        </>
        );
    }
};

export default CommunityBoard;