import type { APIResponse, Post, PostPayload } from '@/types';
import { getToken } from '@/utils/getToken';
import { QueryFunctionContext, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './api';

type Token = string | undefined;

async function getPosts(
  context: QueryFunctionContext<[string, Token, number, number, string | undefined]>
) {
  const { queryKey } = context;
  const [, token, page, limit, title] = queryKey;
  const result = await api.get<APIResponse<Post[]>>('/posts', {
    params: {
      page,
      per_page: limit,
      title,
    },
    ...(token && {
      headers: { Authorization: `Bearer ${token}` },
    }),
  });
  return result.data;
}

async function getPost(context: QueryFunctionContext<[string, string]>) {
  const { queryKey } = context;
  const [, id] = queryKey;
  const token = getToken();
  const result = await api.get<APIResponse<Post>>(`/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
}

async function createPost(payload: PostPayload) {
  const token = getToken();
  const result = await api.post<APIResponse<Post>>(`/users/${payload.user_id}/posts`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
}

async function updatePost({ id, payload }: { id: string; payload: Omit<PostPayload, 'user_id'> }) {
  const token = getToken();
  const result = await api.patch<APIResponse<Post>>(`/posts/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
}

function deletePost(id: string) {
  const token = getToken();
  return api.delete(`/posts/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

export function useGetPosts(token?: string, page = 1, limit = 10, title?: string) {
  const query = useQuery({
    queryKey: ['posts', token, page, limit, title],
    queryFn: getPosts,
    enabled: !!token,
    retry: 1,
  });
  return query;
}

export function useGetPost(id: string) {
  const query = useQuery({
    queryKey: ['post', id],
    queryFn: getPost,
    refetchOnWindowFocus: false,
  });
  return query;
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
  return mutation;
}
