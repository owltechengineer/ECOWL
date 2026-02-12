import AdminGate from '@/components/admin/AdminGate';
import Sidebar from '@/components/admin/Sidebar';

export const metadata = {
  title: 'Admin — OWLTECH',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGate>
      <div className="admin-layout flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-3 md:p-8 overflow-y-auto min-h-screen">
          {children}
        </main>
      </div>
    </AdminGate>
  );
}
