import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/libs/axios";

type VideoInfo = {
  likeCount: number;
  comments: { author: string; text: string; likeCount: number }[];
};

const fetchVideoInfo = async (videoId: string): Promise<VideoInfo> => {
  console.log("fetching:", process.env.NEXT_PUBLIC_SERVER_URL);
  const response = await axiosInstance.get(`/youtube/video/${videoId}`, {
    method: "GET",
  });
  console.log("response", response);
  return response.data;
};

export const useYouTubeVideoInfo = (videoId: string) => {
  const { data, isFetched, refetch } = useQuery<VideoInfo, Error>({
    queryKey: ["youtubeInfo", videoId],
    queryFn: () => fetchVideoInfo(videoId), // queryFn 지정
    retry: false,
  });

  return { data, isFetched, refetch };
};
