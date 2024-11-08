import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/libs/axios";

export type CardInfo = {
  id: number;
  name: string;
  pack: string;
  image: string;
};

const fetchPacks = async (packName: string): Promise<CardInfo[]> => {
  const response = await axiosInstance.get(`/pokemon-card/pack/${packName}`, {
    method: "GET",
  });
  return response.data;
};

export const usePokemonCardPacks = (packName: string) => {
  const { data, isFetched, refetch } = useQuery<CardInfo[], Error>({
    queryKey: ["youtubeInfo", packName],
    queryFn: () => fetchPacks(packName), // queryFn 지정
    retry: false,
  });

  return { data, isFetched, refetch };
};
