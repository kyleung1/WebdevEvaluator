import techcat from "../backend/techcat.json";
import Header from "./(components)/Header";
import Hero from "./(components)/Hero";
import Tech from "./(components)/Tech";

export default function Home() {
  return (
    <>
      <div className="flex-shrink-0">
        <Hero />
      </div>
      <div className="flex-1 bg-slate-800 border-t border-black">
        <div>
          <main className="flex flex-col items-center">
            <h2 className="font-bold mt-11 mb-4 text-white text-3xl">Technology</h2>
            <div className="grid mdd:grid-cols-2 lgg:grid-cols-3 mt-2 mb-8 gap-3 justify-center">
              {techcat.map((type) => {
                return <Tech key={type.h2} type={type} />;
              })}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
