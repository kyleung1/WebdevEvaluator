import Link from 'next/link';

export default function Header () {
  return (
    <div className="h-[5vh] bg-indigo-500 flex justify-between items-center">
        <p className='p-4 text-white'>Web Development Evaluator</p>
        <div>
          <Link href="/">
            <button className="text-white mx-5 hover:border-2 border-white">Home</button>
          </Link>
          <Link href="/about">
            <button className="text-white mx-5 hover:border-2 border-white bg-">About</button>
          </Link>
        </div>
    </div>
  )
}