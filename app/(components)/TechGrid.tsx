import Image from "next/image";
import Link from "next/link";
import tech from "../../backend/techs.json";

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
  )
}