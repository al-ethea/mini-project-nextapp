'use client';
import useDisplayDashboard from '../features/dashboard/hooks/useDisplayDashboard';

export default function DashboardPage() {
  const { email, role, token } = useDisplayDashboard();

  return (
    <main>
      <section className="py-5">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <h1 className="text-4xl text-black">
          {email ? email : 'No email found'}
        </h1>
        <p className="bg-red-500 text-white p-2 rounded-md w-fit">
          {role ? role : 'No role found'}
        </p>
        <h1 className="text-md py-5">Tes </h1>
      </section>
    </main>
  );
}
