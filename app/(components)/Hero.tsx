import { srcDoc } from "./longString";

export default function Hero () {
  return (
		<div className="relative bg-cover bg-center sm:px-4 py-5 bg-[url('/Hero.webp')] w-full hero min-h-[75vh]">
			<div className="absolute inset-0 z-0" style={{backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"}}>
			<div className="px-4 max-w-[1000px] mx-auto h-[850px] flex flex-wrap justifyend items-start pb-[100px] z-1 relative mb-4 flex-col-reverse text-center">
				<div className="pr-4 pl-4">
					<h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-left text-white">Web Dev Evaluator</h1>
					<p className="mt-6 text-lg text-zinc-200 text-left max-w-3xl mx-auto">
						Aatrox can activate The Darkin Blade three times before the ability goes on cooldown, with a 1 second static cooldown between casts. If Aatrox does not recast the ability within 4 seconds of the previous cast, it goes on cooldown.
					</p>
					<iframe className="mt-6 w-[280px] h-[158px] md:w-[560px] md:h-[315px]" srcDoc={srcDoc("vdiYtiKD8eI")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
					<button className="bg-[#4F311C] mr-4 border-none text-white font-bold py-4 px-6 text-center rounded-md float-left mt-6 transition duration-500 hover:bg-[#5C3E2A]">
						<a target="_blank" rel="noreferrer" href="https://survey.stackoverflow.co/2022/">Stack Overflow</a>
					</button>
					<button className="bg-[#E0A526] mr-4 border-none text-white font-bold py-4 px-6 text-center rounded-md float-left mt-6 transition duration-500 hover:bg-[#ecb53d]">
					<a target="_blank" rel="noreferrer" href="https://2022.stateofjs.com/en-US/">State of JS</a>
					</button>
				</div>
			</div>
			</div>
		</div>
  )
}