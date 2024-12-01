import type { APIResponse, User } from '@/types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { api } from './api';

async function getUser(context: QueryFunctionContext<[string, number]>) {
  const { queryKey } = context;
  const [, id] = queryKey;
  const result = await api.get<APIResponse<User>>(`/users/${id}`);
  return result.data;
}

async function getUsers() {
  const result = await api.get<APIResponse<User[]>>('/users');
  return result.data;
}

export function useUser(id: number) {
  const query = useQuery({
    queryKey: ['user', id],
    queryFn: getUser,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
  return query;
}

export function useUsers() {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
  });
  return query;
}
