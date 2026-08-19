export const metadata = {
  title: 'SIMS - Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <header style={{padding:16, borderBottom:'1px solid #eee'}}>
          <a href="/">SIMS</a> | <a href="/dashboard">Dashboard</a> | <a href="/login">Login</a>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
