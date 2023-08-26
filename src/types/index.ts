import { TypographyProps } from '@mui/material';

export interface Image {
    main?: string;
    card?: string;
    thumb?: string;
    home?: string;
    'heading-size'?: string;
}

export interface Media_urls {
    featured_images?: Image;
    headings?: Image;
    teacher_page?: Image;
    avatars?: Image;
}

export interface Instructor {
    id: number;
    first_name: string;
    last_name: string;
    media_urls: Media_urls;
    meta_data: {
        teacher_about: string;
        teacher_short_bio: string;
        teacher_evidence: string; // what the hell is this? evidence? really?
    };
}

export interface Category {
    id: number;
    title: string;
    slug: string;
    description: string;
    media: {
        featuredUri: null | string;
        coverUri: null | string;
    };
    createdAt: Date | null;
    updatedAt: Date | null;
    children?: Category[];
}

export interface Rating {
    id: number;
    rating: number;
    description: string;
    user: User;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface Rate {
    rating: number;
    total: number;
    percentage: number;
}

export interface UserRate {
    description: string | null;
    rating: number | null;
}

export interface Video {
    id: number;
    title: string;
    videoFile?: string;
    aparatIframe?: string | null;
    length: number;
    topic: number;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface DownloadItem {
    id: number;
    title: string;
    url: string;
    topic: number;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface Topic {
    id: number;
    title: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    videos: Video[];
    downloadItems: DownloadItem[];
    course: Course;
}

export type CourseStatus = {
    id: number;
    title: string;
    typographyColor: string;
    bgColor: string;
    iconSrc: string | null;
};

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    media: {
        avatarUri: string | null;
    };
    isVerified: boolean;
    createdAt: Date | null;
    updatedAt: Date | null;
    contributedCourses: Course[];
}

export interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: Category;
    media: {
        featuredUri: string | null;
        coverUri: string | null;
    };
    duration: number;
    videosCount: number;
    status: CourseStatus;
    createdAt: Date | null;
    updatedAt: Date | null;
    averageRating: number;
    instructors: User[];
    instructor: User | null;
    ratings?: Rating[];
    topics?: Topic[];
    ratingTable?: {
        '1': {
            total: number;
            percentage: number;
        };
        '2': {
            total: number;
            percentage: number;
        };
        '3': {
            total: number;
            percentage: number;
        };
        '4': {
            total: number;
            percentage: number;
        };
        '5': {
            total: number;
            percentage: number;
        };
    };
}

export interface ListProps<T> {
    data: T[];
    endpoint: string;
    dataComponent: React.ReactElement;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface TextBox {
    title?: string;
    titleProps?: TypographyProps;
    subtitle?: string;
    subtitleProps?: TypographyProps;
    body?: string;
    bodyProps?: TypographyProps;
}
