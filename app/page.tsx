import Link from "next/link";
import Image from "next/image";
import tech from "../backend/techs.json";
import techcat from "../backend/techcat.json";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center">
        <div className="grid mdd:grid-cols-2 lgg:grid-cols-3 mt-2 mb-8 gap-3 justify-center">
          {techcat.map((type) => {
            return (
              <div
                key={type.toString()}
                className="rounded-md h-[36rem] w-[24rem] flex flex-col items-center relative bg-slate-50"
                style={{background: `linear-gradient(to bottom right, ${type.color}`}}
              >
                <h2 className="text-center font-bold text-2xl p-4">{type.h2}</h2>
                <p className="p-4 text-lg">{type.p}</p>
                <div className="absolute top-2/4 flex flex-wrap justify-center">
                  {tech.map((tech) => {
                    if (tech.type === type.arr)
                    return (
                      <Link
                        key={tech.alt as string}
                        href={`/result/${tech.import}-${tech.alt}`}
                      >
                        <Image
                          className="m-4"
                          src={tech.image}
                          alt={tech.alt}
                          width={50}
                          height={50}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
