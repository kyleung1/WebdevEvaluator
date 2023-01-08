import Image from "next/image"
import hero from "../../public/Hero.jpg"

export default function Hero () {
  return (

<div className="mt-12 sm:px-4 py-5 bg-hero-pattern w-full hero">
	<div className="flex flex-wrap  mb-4 items-center lg:flex-col-reverse text-center">
		<div className="md:w-1/2 pr-4 pl-4 xl:w-3/5 pr-4 pl-4 mb-4 lg:mb-0 ">
			<div className="relative">

				<a className="" href="https://www.youtube.com/watch?v=1L2hrG-7i2Y">
				<Image className="w-auto h-auto m-auto rounded shadow" src={hero} sizes="(max-width: 1200px) 100vw, 1200px" alt="Photo by Richard Horvath" width={1200} height={600} />
        </a>
			</div>
		</div>
		<div className="md:w-1/2 pr-4 pl-4 xl:w-2/5">
			<div className="mb-3">
				<div>
					<h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center text-white">Web Dev Evaluator</h1>
				</div>
			</div>
			<div className="mb-4">
				<p className="mt-6 text-lg text-zinc-200 text-center max-w-3xl mx-auto">
        Aatrox can activate The Darkin Blade three times before the ability goes on cooldown, with a 1 second static cooldown between casts. If Aatrox does not recast the ability within 4 seconds of the previous cast, it goes on cooldown.
        </p>
			</div>
		</div>
	</div>
</div>

  )
}