import Link from "next/link";
import Image from "next/image";
import { images } from "./images";

export default function Home() {

  function searchBtn() {

  }

  return (
    <div>
      <main className="flex flex-col items-center">
        <h2 className='text-3xl'>See how twitter users are feeling about your favorite web development technologies.</h2>
        {/* <p className='text-xl  mt-52'>Enter a Language, Database, Cloud.</p>
        <div className='flex justify-center items-stretch'>
          <input className="border-2 border-indigo-500 rounded-md m-0.5" type="text"/>
          <Link href="/result">
            <button className="border-2 border-indigo-500 rounded-md p-1 m-0.5">Search</button>
          </Link>
        </div> */}
        <div className="flex flex-wrap justify-center">
        {images.map(tech => {
            return(
                <div key={tech.toString()} className="border-2 border-indigo-500 h-[48rem] w-[36rem] relative flex flex-wrap items-center justify-around
                space-x-6 lg:space-x-12 m-5 bg-slate-50">
                {tech.map((tech) => {
                    return(
                        <Link key={(tech.alt as string)} href={`/result/${tech.import}`}>
                            <Image src={tech.image} alt={tech.alt} width={50} height={50}/>
                        </Link>
                    )
                })}
                </div>
            )
        })}
        </div>
      </main>
    </div>
  )
}
