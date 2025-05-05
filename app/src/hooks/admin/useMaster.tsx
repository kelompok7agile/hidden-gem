import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from '../../api/admin/master';

export const useMaster = (jenis: 'kategori-tempat' | 'kategori-artikel' | string) => {
    const queryClient = useQueryClient();

    // GET
    const getQuery = useInfiniteQuery({
        queryKey: ['master', jenis],
        queryFn: ({ pageParam = 1 }) =>
            api.getMaster({
                jenis,
                params: { page: pageParam, limit: 10 },
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const current = lastPage.halaman_sekarang;
            const total = lastPage.total_halaman;
            return current < total ? current + 1 : undefined;
        },
    });

    // CREATE
    const createMutation = useMutation({
        mutationFn: (payload: any) => api.createMaster(jenis, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['master', jenis] });
        },
    });

    // UPDATE
    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: any }) =>
            api.updateMaster(jenis, id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['master', jenis] });
        },
    });

    // DELETE
    const deleteMutation = useMutation({
        mutationFn: (id: number) => api.deleteMaster(jenis, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['master', jenis] });
        },
    });

    return {
        ...getQuery,
        create: createMutation.mutate,
        update: updateMutation.mutate,
        remove: deleteMutation.mutate,
        createStatus: createMutation.status,
        updateStatus: updateMutation.status,
        removeStatus: deleteMutation.status,
    };
};
