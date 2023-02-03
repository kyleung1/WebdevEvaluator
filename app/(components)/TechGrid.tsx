import Image from "next/image";
import Link from "next/link";
import tech from "../../assets/techs.json";

interface Props {
  cat: string
}

export default function TechGrid({cat}: Props) {
  return (
    <div className="top-2/4 flex flex-wrap justify-center">
        {tech.map((tech) => {
          if (tech.type === cat)
            return (
              <Link
                key={tech.import as string}
                href={`/result/${tech.import}`}
              >
                <Image
                  className="m-4"
                  src={`/icons/${tech.import}.webp`}
                  alt={tech.import}
                  title={tech.import}
                  width={50}
                  height={50}
                />
              </Link>
            );
        })}
      </div>
  )
}