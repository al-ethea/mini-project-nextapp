import authStore from '@/zustand/store';

export default function useDisplayDashboard() {
  const email = authStore((state: any) => state.email);
  const role = authStore((state: any) => state.role);
  const token = authStore((state: any) => state.token);

  //useEffect

  return {
    email,
    role,
    token,
  };
}
