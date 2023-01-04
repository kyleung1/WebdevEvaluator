import techcat from "../backend/techcat.json";
import Tech from "./(components)/Tech";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center">
        <div className="grid mdd:grid-cols-2 lgg:grid-cols-3 mt-2 mb-8 gap-3 justify-center">
          {techcat.map((type) => {
            return (
              <Tech key={type.h2} type={type} />
            );
          })}
        </div>
      </main>
    </div>
  );
}
