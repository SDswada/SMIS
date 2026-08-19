import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions as any);
  if (!session) {
    redirect('/login');
  }
  return (
    <div style={{padding:32}}>
      <h1>Dashboard</h1>
      <p>Signed in as: {session?.user?.email}</p>
    </div>
  );
}
