
export default async function AnnonceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen ">{children}</main>
  );
}