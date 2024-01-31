import { LateralBar } from "./components/LateralBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex">
        <LateralBar />
        {children}
      </main>
    </>
  );
}
