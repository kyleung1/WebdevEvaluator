import techcat from "../assets/techcat.json";
import Hero from "./(components)/Hero";
import Tech from "./(components)/Tech";

export default function Home() {
  return (
    <>
      <div className="flex-shrink-0 flex items-center justify-center">
        <Hero />
      </div>
      <div className="flex-1 bg-slate-800 border-t border-black">
        <div>
          <main className="flex flex-col items-center">
             <div className="my-20 flex flex-col items-center">
              <h2 className="font-bold mt-11 mb-4 text-white text-2xl md:text-4xl text-center">Evaluating Sentiments through Twitter</h2>
              <p className="text-white w-[1050px] max-w-xs p-4 tiny:max-w-sm text-base sm:text-lg sm:max-w-lg md:max-w-2xl lg:max-w-4xl text-left">
                The world of web development is changing rapidly. Javascript, WebAssembly, and other tooling have
                caused rapid development and change in the ecosystem. There are many notable surveys, like the ones
                from Stack Overflow or State of Javascript/CSS/etc. We wanted to look at Twitter data to draw other conclusions.
                As we know, Twitter is the home of hot takes and even hotter takes. Through sentiment analysis, we illustrate
                how Twitter feels about our favorite web technologies.
              </p>
            </div>
            <h2 className="font-bold mb-4 text-white text-3xl mt-20">Technology</h2>
              <div className="grid mdd:grid-cols-2 lgg:grid-cols-3 mt-2 mb-20 gap-16 justify-center">
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
