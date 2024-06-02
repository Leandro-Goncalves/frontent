import { BlockAlert } from "./components/BlockAlert";
import { LateralBar } from "./components/LateralBar";
import { TokenVerify } from "./components/TokenVerify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex">
        <LateralBar />
        <TokenVerify />
        <div className="w-full h-[100vh] overflow-auto">
          <BlockAlert />
          {children}
        </div>
      </main>
    </>
  );
}
