import Header from "../(components)/Header";

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex-shrink-0">
        <Header />
      </div>
      <div className="flex-1 bg-slate-800 border-t border-black">
        {children}
      </div>
    </>
  );
}
