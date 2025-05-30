import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient, QueryFunctionContext } from "@tanstack/react-query";
import * as api from '../../api/admin/master';


interface MasterResponse<T = any> {
    code: number;
    data: {
        data: T[];
        total_data: number;
        limit: number;
        page: number;
        total_halaman: number;
    };
    message: string;
}


interface MasterParams {
    page?: number;
    limit?: number;
    search?: string;
    // tambahkan filter lainnya sesuai kebutuhan
}

export const useMaster = (
    jenis: 'kategori-tempat' | 'kategori-artikel' | string,
    params?: MasterParams
) => {
    const queryClient = useQueryClient();

    // GET
    const getQuery = useInfiniteQuery<MasterResponse, Error>({
        queryKey: ['master', jenis, params],
        queryFn: async ({ pageParam = params?.page || 1 }) => {
            return api.getMaster({
                jenis,
                params: {
                    page: pageParam,
                    limit: params?.limit || 10,
                    search: params?.search || '',
                },
            });
        },
        initialPageParam: params?.page || 1,
        getNextPageParam: (lastPage) => {
            const current = lastPage.data.page;
            const total = lastPage.data.total_halaman;
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
        mutationFn: ({ key, value }: { key: string, value: number | string }) =>
            api.deleteMaster(jenis, key, value),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['master', jenis] });
        },
        onError: (error) => {
            console.error('Delete error:', error);
        },
    });


    return {
        ...getQuery,
        isLoading: getQuery.isLoading,
        data: getQuery.data?.pages.flatMap(page => page.data.data) || [],
        pagination: {
            page: getQuery.data?.pages[0]?.data.page || 1,
            totalPages: getQuery.data?.pages[0]?.data.total_halaman || 1,
            totalData: getQuery.data?.pages[0]?.data.total_data || 0,
            limit: getQuery.data?.pages[0]?.data.limit || 10,
        },
        create: createMutation,
        update: updateMutation,
        remove: deleteMutation,
        refetchWithParams: (newParams: MasterParams) => {
            queryClient.invalidateQueries({
                queryKey: ['master', jenis, newParams]
            });
        },
    };
};
