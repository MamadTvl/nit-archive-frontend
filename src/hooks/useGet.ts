import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from '../utils/axios';
import { AxiosRequestConfig } from 'axios';

export interface GetApiArgs<ResponseResult, Error> {
    url: string;
    config?: AxiosRequestConfig;
    onSuccess: (data: ResponseResult) => void;
    onError: (error: Error | undefined) => void;
    fetchOnMount: boolean | false;
}

export interface GetApiReturn {
    fetch: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
}

const useGet = <ResponseResult, Error>(
    args: GetApiArgs<ResponseResult, Error>
): GetApiReturn => {
    const { url, config = {}, fetchOnMount = false, onSuccess, onError } = args;
    const [fetch, setFetch] = useState(fetchOnMount);
    const [loading, setLoading] = useState(false);

    const fetchApi = async () => {
        setLoading(true);
        try {
            const response = await axios(url, config);
            onSuccess(response.data as ResponseResult);
        } catch (error) {
            onError((error as any).response?.data as Error);
        }
        setFetch(false);
        setLoading(false);
    };

    useEffect(() => {
        if (fetch) {
            fetchApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetch]);

    return {
        fetch: setFetch,
        loading,
    };
};

export default useGet;
