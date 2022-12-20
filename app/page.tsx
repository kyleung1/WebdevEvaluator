import Link from "next/link";

export default function Home() {

  function searchBtn() {

  }

  return (
    <div>
      <main>
        <h2 className='text-3xl text-center'>See how twitter users are feeling about your favorite web development technologies.</h2>
        <p className='text-xl text-center mt-52'>Enter a Language, Database, Cloud.</p>
        <div className='flex items-stretch justify-center'>
          <input className="border-2 border-indigo-500 rounded-md m-0.5" type="text"/>
          <Link href="/result">
            <button className="border-2 border-indigo-500 rounded-md p-1 m-0.5">Search</button>
          </Link>
        </div>
      </main>
    </div>
  )
}
