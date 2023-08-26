import {
    Box,
    Button,
    CircularProgress,
    Skeleton,
    Typography,
} from '@mui/material';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import { CourseProps } from '../../../../pages/course/[course-slug]';
import usePost from '../../../hooks/usePost';
import { Course, UserRate, Video } from '../../../types';
import axios from '../../../utils/axios';
import { separateDigit } from '../../../utils/convertDigits';
import { getCookie } from '../../../utils/cookie';
import PriceIcon from '../../icons/PriceIcon';
import { setCart } from '../../user/context/action';
import { AddToCartApiBody, AddToCartApiResult } from '../../user/context/types';
import { useUser } from '../../user/context/UserContext';
import getConfig from 'next/config';
import TikIcon from '../../icons/TikIcon';
import Link from '../../link/Link';
import { useSnackbar } from 'notistack';
import { Api } from '@/api/index';

const { publicRuntimeConfig } = getConfig();

const fetcher = async (url: string): Promise<AuthCourseApiResult> => {
    const token = getCookie('shenovid-token', document.cookie);
    if (token === '') {
        throw Error('No token found');
    }
    try {
        const response: AxiosResponse<AuthCourseApiResult> = await axios(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (e) {
        throw e;
    }
};

const AddToCartBox: React.FC<Props> = ({
    cartButtonText,
    currency,
    course,
    fixed = false,
}) => {
    const { enqueueSnackbar } = useSnackbar();
    const { store, dispatch } = useUser();
    const { isLoading: authLoading, isLoggedIn } = store;
    const router = useRouter();
    const accessUrl = Api.Instance.getUrl((e) => e.course.checkAccess, {
        slug: course.id.toString(),
    });
    const {
        data: hasAccess,
        error,
        isLoading,
    } = useSWR<boolean>(accessUrl, () =>
        Api.Instance.getCourseAccess(course.id)
    );
    const [loading, setLoading] = useState(false);
    const userCourseStatus: 'owns' | 'unknown' | 'not_owns' = useMemo(() => {
        if (error) {
            return 'not_owns';
        }
        if (isLoading) {
            return 'unknown';
        }
        return hasAccess ? 'owns' : 'not_owns';
    }, [hasAccess, error, isLoading]);

    return (
        <Box
            sx={[
                {
                    backgroundColor: 'secondary.lightest',
                    height: 138,
                    mt: 2,
                    p: '12px',
                    pt: '19px',
                    borderRadius: 2,
                },
                fixed && {
                    display: {
                        xs: 'flex',
                        sm: 'none',
                    },
                    borderRadius: 0,
                    height: 118,
                    width: '100%',
                    p: 2,
                    pt: 2,
                    zIndex: 1000,
                },
            ]}
            position={fixed ? 'fixed' : undefined}
            display={'flex'}
            bottom={0}
            left={0}
            right={0}
            flexDirection={'column'}
            justifyContent={'space-between'}>
            {userCourseStatus === 'unknown' && (
                <Skeleton
                    width={190}
                    height={15}
                    sx={{ m: 'auto' }}
                    variant={'rectangular'}
                />
            )}
            {userCourseStatus === 'owns' && (
                <Box
                    display={'flex'}
                    alignSelf={'center'}
                    alignItems={'center'}>
                    <TikIcon />
                    <Typography
                        sx={{ mr: 2 }}
                        variant={'body2'}
                        color={'text.secondary'}>
                        {`شما عضو این دوره هستید`}
                    </Typography>
                </Box>
            )}
            {userCourseStatus === 'not_owns' && (
                <Box
                    display={'flex'}
                    alignSelf={'center'}
                    alignItems={'center'}>
                    <Typography
                        sx={{ mr: 2 }}
                        variant={'body2'}
                        color={'text.secondary'}>
                        {`رایگان عضو دوره شوید`}
                    </Typography>
                </Box>
            )}
            {userCourseStatus === 'unknown' && (
                <Skeleton
                    width={'100%'}
                    height={61}
                    variant={'rectangular'}
                    sx={{ borderRadius: 2 }}
                />
            )}
            {userCourseStatus === 'owns' && (
                <Link
                    href={`/video/${course.topics[0]?.videos[0].id || 'null'}`}>
                    <Button
                        fullWidth
                        color={'secondary'}
                        variant='outlined'
                        sx={{
                            height: fixed ? 48 : 61,
                            borderRadius: 2,
                            backgroundColor: 'white',
                            borderColor: 'secondary.main',
                        }}>
                        {cartButtonText.owned}
                    </Button>
                </Link>
            )}
            {userCourseStatus === 'not_owns' && (
                <Button
                    // onClick={}
                    color={'secondary'}
                    variant='contained'
                    disabled={loading || authLoading}
                    sx={{ height: fixed ? 48 : 61 }}>
                    {loading ? (
                        <CircularProgress color='secondary' size={36} />
                    ) : (
                        'عضویت در دوره'
                    )}
                </Button>
            )}
        </Box>
    );
};

interface Props {
    cartButtonText: CourseProps['staticContent']['cartButtonText'];
    currency: CourseProps['staticContent']['currency'];
    course: Required<Course>;
    fixed?: boolean;
}

export interface AuthCourseApiResult {
    course: Course & { last_authenticated_user_video: Video };
    user_rate: UserRate | null;
}

export default AddToCartBox;
