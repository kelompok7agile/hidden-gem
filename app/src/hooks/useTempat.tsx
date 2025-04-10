import { useInfiniteQuery } from "@tanstack/react-query";
import * as api from '../api/tempat';

export const useTempat = () =>
    useInfiniteQuery({
        queryKey: ['tempat'],
        queryFn: api.getTempat,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const current = lastPage.data.halaman_sekarang;
            const total = lastPage.data.total_halaman;
            return current < total ? current + 1 : undefined;
        },
    });
