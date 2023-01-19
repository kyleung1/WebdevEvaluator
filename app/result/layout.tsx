export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col items-center flex-1 bg-slate-800 border-t border-black">
        {children}
      </div>
    </>
  );
}
