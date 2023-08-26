import { AxiosRequestConfig } from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from '../utils/axios';

export interface PostApiArgs<ResponseResult, Error> {
    url: string;
    body: unknown;
    config?: AxiosRequestConfig;
    onSuccess: (data: ResponseResult) => void;
    onError: (error: Error | undefined) => void;
}

export interface PostApiReturn {
    post: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
}

const usePost = <ResponseResult, Error>(
    args: PostApiArgs<ResponseResult, Error>
): PostApiReturn => {
    const { url, body, onSuccess, onError, config } = args;
    const [post, setPost] = useState(false);
    const [loading, setLoading] = useState(false);

    const postApi = async () => {
        setLoading(true);
        try {
            const response = await axios.post(url, body, config);
            onSuccess(response.data as ResponseResult);
        } catch (error) {
            onError((error as any).response?.data as Error);
        }
        setPost(false);
        setLoading(false);
    };

    useEffect(() => {
        if (post) {
            postApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post]);

    return {
        post: setPost,
        loading,
    };
};

export default usePost;
