import axios from '@/utils/axios';
import { dlBaseUrl } from '@/utils/config';
import { getToken } from '@/utils/token';
import { Category, Course, User, Video } from '@types';

export const Endpoints = {
    course: {
        get: 'course',
        rating: 'rating/course',
        checkAccess: 'user/course-access',
    },
    category: 'category',
    video: {
        get: 'video',
        src: 'video/src',
        checkAccess: 'user/video-access',
    },
    rating: { upsert: 'rating' },
    user: {
        get: 'user',
        register: 'user/sign-up',
        login: 'user/login',
        update: 'user',
        courses: 'user/courses',
        info: 'user/personal-info',
        subscribe: 'user/subscribe',
        logout: 'user/logout',
    },
};

type SliderResponse = {
    message: string;
    courses: Course[];
};

export type getOneCourseResponse = {
    message: string;
    course: Required<Course>;
};

export type getOneVideoResponse = {
    message: string;
    video: Video;
};
export type getVideoSrcResponse = {
    message: string;
    videoFile?: string;
    aparatIframe?: string | null;
};

type CourseListFilterQuery = {
    sort: 'most-wanted' | 'newest';
    pageSize?: string;
    page: string;
    title?: string;
    categoryId?: string;
    subcategoryId?: string;
};

export type CourseListResponse = {
    message: string;
    courses: {
        data: Course[];
        pageSize: number;
        page: number;
        pagesCount: number;
        total: number;
    };
};

type CategoriesResponse = {
    message: string;
    categories: Array<Required<Category>>;
};

type CheckAccessResponse = {
    hasAccess: boolean;
};

type LoginDto = {
    username: string;
    password: string;
};

type LoginResponse = {
    token: string;
};

type GetUserResponse = {
    message: string;
    user: User;
};

type UpdateUserDto = {
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
};
type AddRatingDto = {
    rating: number;
    comment: string;
    courseId: number;
};

type GetUserInfoResponse = {
    message: string;
    user: {
        username: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        email: string | null;
    };
};

export class Api {
    private static _instance: Api;
    private constructor() {}

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public async fetcher<T>(url: string, withAuth = false): Promise<T> {
        const token = getToken();
        if (withAuth && (token === '' || !token)) {
            throw new Error('token not provided');
        }
        try {
            const response = await axios(
                url,
                withAuth
                    ? {
                          headers: {
                              Authorization: token,
                          },
                      }
                    : {}
            );
            return response.data as T;
        } catch (err) {
            console.error(err);
            throw new Error(url + ' fetch failed');
        }
    }

    public getUrl(
        selector: (endpoints: typeof Endpoints) => string,
        params: {
            query?: Record<string, string>;
            slug?: string;
        }
    ) {
        const key = selector(Endpoints);
        const url = `/${key}${params.slug ? '/' + params.slug : ''}`;
        return url + `?${new URLSearchParams(params.query).toString()}`;
    }

    private userInterceptor(user: User): User {
        return {
            ...user,
            media: {
                avatarUri: user.media.avatarUri
                    ? dlBaseUrl + user.media.avatarUri
                    : null,
            },
        };
    }

    private courseInterceptor(
        data: Course | Required<Course>
    ): Course | Required<Course> {
        return {
            ...data,
            media: {
                coverUri: dlBaseUrl + data.media.coverUri,
                featuredUri: dlBaseUrl + data.media.featuredUri,
            },
            ...(data.status
                ? {
                      status: {
                          ...data.status,
                          iconSrc: dlBaseUrl + data.status.iconSrc,
                      },
                  }
                : {}),
            instructor: data.instructor
                ? this.userInterceptor(data.instructor)
                : null,
            ...(data.ratings
                ? {
                      ratings: data.ratings.map((r) => ({
                          ...r,
                          user: this.userInterceptor(r.user),
                      })),
                  }
                : {}),
        };
    }

    private courseListInterceptor(
        data: CourseListResponse
    ): CourseListResponse {
        return {
            ...data,
            courses: {
                ...data.courses,
                data: data.courses.data.map((c) => this.courseInterceptor(c)),
            },
        };
    }

    private categoryInterceptor(data: Category): Category {
        return {
            ...data,
            media: {
                coverUri: '/' + data.media.coverUri,
                featuredUri: '/' + data.media.featuredUri,
            },
            ...(data.children
                ? {
                      children: data.children.map((c) =>
                          this.categoryInterceptor(c)
                      ),
                  }
                : {}),
        };
    }

    async getCourseSlider(tag: 'newest' | 'most-wanted') {
        const url = this.getUrl((e) => e.course.get, {
            query: {
                sort: tag || 'newest',
                type: 'slider',
            },
        });
        return this.fetcher<SliderResponse>(url)
            .then((r) => r.courses.map((c) => this.courseInterceptor(c)))
            .catch(() => []);
    }

    async getCourseList(query: CourseListFilterQuery) {
        const url = this.getUrl((e) => e.course.get, {
            query: {
                ...query,
                type: 'list',
            },
        });
        return this.fetcher<CourseListResponse>(url)
            .then((r) => this.courseListInterceptor(r))
            .catch(() => null);
    }

    async getCourse(slug: string): Promise<Required<Course> | null> {
        const url = this.getUrl((e) => e.course.get, { slug });
        return this.fetcher<getOneCourseResponse>(url)
            .then((r) => this.courseInterceptor(r.course) as Required<Course>)
            .catch(() => null);
    }

    async getVideo(id: number) {
        const url = this.getUrl((e) => e.video.get, { slug: id.toString() });
        return this.fetcher<getOneVideoResponse>(url)
            .then((r) => r.video)
            .catch(() => null);
    }

    async getVideoSrc(id: number) {
        const url = this.getUrl((e) => e.video.src, { slug: id.toString() });
        return this.fetcher<getVideoSrcResponse>(url, true).catch(() => null);
    }

    async getCourseAccess(id: number) {
        const url = this.getUrl((e) => e.course.checkAccess, {
            slug: id.toString(),
        });
        return this.fetcher<CheckAccessResponse>(url, true).then(
            (r) => r.hasAccess
        );
    }

    async getVideoAccess(id: number) {
        const url = this.getUrl((e) => e.video.checkAccess, {
            slug: id.toString(),
        });
        return this.fetcher<CheckAccessResponse>(url, true).then(
            (r) => r.hasAccess
        );
    }

    async getCourseRatings(slug: string) {
        const url = this.getUrl((e) => e.course.rating, { slug });
    }

    async getCategories() {
        const url = this.getUrl((e) => e.category, {});
        return this.fetcher<CategoriesResponse>(url)
            .then((r) => r.categories.map((c) => this.categoryInterceptor(c)))
            .catch(() => []);
    }

    async getUser() {
        const url = this.getUrl((e) => e.user.get, {});
        return this.fetcher<GetUserResponse>(url, true)
            .then((r) => this.userInterceptor(r.user))
            .catch(() => null);
    }

    async getUserCourses() {
        const url = this.getUrl((e) => e.user.courses, {});
        return this.fetcher<{ message: string; courses: Course[] }>(url, true)
            .then((r) => r.courses.map((c) => this.courseInterceptor(c)))
            .catch(() => []);
    }

    async getUserInfo() {
        const url = this.getUrl((e) => e.user.info, {});
        return this.fetcher<GetUserInfoResponse>(url, true);
    }

    async subscribeToCourse(courseId: number) {
        const url = this.getUrl((e) => e.user.subscribe, {
            slug: courseId.toString(),
        });
        return axios(url, {
            method: 'POST',
            headers: {
                Authorization: getToken(),
            },
        });
    }

    async login(dto: LoginDto) {
        const url = this.getUrl((e) => e.user.login, {});
        return axios<LoginResponse>(url, {
            method: 'POST',
            data: dto,
        });
    }

    async singUp(dto: LoginDto) {
        const url = this.getUrl((e) => e.user.register, {});
        return axios<LoginResponse>(url, {
            method: 'POST',
            data: dto,
        });
    }

    async logout() {
        const url = this.getUrl((e) => e.user.logout, {});
        return axios(url, {
            method: 'DELETE',
            headers: {
                Authorization: getToken(),
            },
        });
    }

    async updateUser(data: UpdateUserDto) {
        const url = this.getUrl((e) => e.user.update, {});
        return axios(url, {
            method: 'POST',
            data,
            headers: {
                Authorization: getToken(),
            },
        });
    }

    async upsertRating(data: AddRatingDto) {
        const url = this.getUrl((e) => e.rating.upsert, {});
        return axios(url, {
            method: 'POST',
            data,
            headers: {
                Authorization: getToken(),
            },
        });
    }
}
