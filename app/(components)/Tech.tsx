import TechGrid from "./TechGrid";

interface Props {
  type: {
    arr: string;
    h2: string;
    p: string;
    color: string;
  }
}

export default function Tech({type}: Props) {
  return (
    <div
      key={type.h2}
      className="rounded-md h-[36rem] w-[24rem] flex flex-col items-center relative bg-slate-50"
      style={{ background: `linear-gradient(to bottom right, ${type.color}` }}
    >
      <h2 className="text-center font-bold text-2xl p-4">{type.h2}</h2>
      <p className="p-4 text-lg">{type.p}</p>
      <TechGrid cat={type.arr} />
    </div>
  );
}
