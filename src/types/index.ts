export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export type PostPayload = Partial<Omit<Post, 'id'>>;

export type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export type Pagination = {
  limit: number;
  links: {
    current: string;
    next: string | null;
    previous: string | null;
  };
  page: number;
  pages: number;
  total: number;
};

export type APIResponse<T> = {
  data: T;
  meta: {
    pagination: Pagination;
  };
};
