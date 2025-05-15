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

interface Items {
    kategori_tempat_id: number;
    nama: string;
    icon: string;
}

interface MasterParams {
    page?: number;
    limit?: number;
    search?: string;
    // tambahkan filter lainnya sesuai kebutuhan
}

export const useMaster = <T extends Items = Items>(
    jenis: 'kategori-tempat' | 'kategori-artikel' | string,
    params?: MasterParams
) => {
    const queryClient = useQueryClient();
    // GET

    const getQuery = useInfiniteQuery<MasterResponse<{ data: any[] }>, Error>({
        queryKey: ['master', jenis, params],
        queryFn: async ({ pageParam = 1, queryKey }) => {
            const [, jenisParam, paramsParam] = queryKey as [string, string, MasterParams?];
            return api.getMaster({
                jenis: jenisParam,
                params: {
                    page: pageParam,
                    limit: paramsParam?.limit || 10,
                    search: paramsParam?.search || '',
                },
            });
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const current = lastPage.data.page;
            const total = lastPage.data.total_halaman;
            return current < total ? current + 1 : undefined;
        },
        select: (data) => ({
            ...data,
            // Flatten pages untuk akses mudah
            flatData: data.pages.flatMap(page => page.data.data),
            totalData: data.pages[0]?.data.total_data || 0,
        }),
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
        onError: (error) => {
            console.error('Delete error:', error);
        },
    });

    return {
        ...getQuery,
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
        // tambahkan refetch untuk memudahkan refresh dengan parameter baru
        refetchWithParams: (newParams: MasterParams) => {
            queryClient.invalidateQueries({
                queryKey: ['master', jenis, newParams]
            });
        },
    };
};
