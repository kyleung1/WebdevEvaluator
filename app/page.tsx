import Link from "next/link";
import Image from "next/image";

export default function Home() {

  function searchBtn() {

  }

  return (
    <div>
      <main className="flex flex-col items-center">
        <h2 className='text-3xl'>See how twitter users are feeling about your favorite web development technologies.</h2>
        <p className='text-xl  mt-52'>Enter a Language, Database, Cloud.</p>
        <div className='flex items-stretch'>
          <input className="border-2 border-indigo-500 rounded-md m-0.5" type="text"/>
          <Link href="/result">
            <button className="border-2 border-indigo-500 rounded-md p-1 m-0.5">Search</button>
          </Link>
        </div>
        <div className="border-2 border-indigo-500 h-1/2 w-10/12 relative flex flex-wrap items-center justify-around
          space-x-6 lg:space-x-12 my-5">
          <Link href="">
              <Image src="/../public/icons/vsc.png" alt="vsc" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/intellij.png" alt="intellij" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/neovim.png" alt="neovim" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/phpstorm.png" alt="phpstorm" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/pycharm.png" alt="pycharm" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/docker.png" alt="docker" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/git.png" alt="git" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/github.png" alt="github" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/kubernetes.png" alt="kubernetes" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/powershell.png" alt="powershell" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/firebase.png" alt="firebase" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/aws.png" alt="aws" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/azure.png" alt="azure" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/digitalocean.png" alt="digitalocean" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/googlecloud.png" alt="googlecloud" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/heroku.png" alt="heroku" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/mongodb.png" alt="mongodb" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/redisinc.jpg" alt="redisinc" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/postgresql.png" alt="postgresql" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/sqlserver.png" alt="sqlserver" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/sqlite.png" alt="sqlite" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/mariadb.png" alt="mariadb" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/mysql.png" alt="mysql" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/sass.png" alt="sass" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/css.png" alt="css" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/bootstrap.png" alt="bootstrap" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/html.png" alt="html" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/markdown.png" alt="markdown" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/tailwind.png" alt="tailwind" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/javascript.png" alt="js" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/typescript.png" alt="typescript" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/alpine.png" alt="alpinejs" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/angular.png" alt="angularjs" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/astro.png" alt="astro" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/deno.png" alt="denoland" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/express.jpg" alt="expressjs" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/fastify.png" alt="fastify" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/jquery.png" alt="jquery" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/lit.png" alt="litjs" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/nestjs.png" alt="nestjs" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/next.png" alt="nextjs" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/nodejs.png" alt="nodejs" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/nuxt.png" alt="nuxtjs" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/qwik.png" alt="qwik" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/react.png" alt="reactjs" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/remix.png" alt="remixjs" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/solidjs.png" alt="solidjs" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/strapi.png" alt="strapijs" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/svelte.png" alt="svelte" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/vitejs.png" alt="vitejs" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/vuejs.png" alt="vuejs" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/blazor.png" alt="blazor" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/asp.png" alt="aspnet" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/dart.png" alt="dart" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/flutterdev.png" alt="flutterdev" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/elixir.png" alt="elixir" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/elixirphoenix.png" alt="elixirphoenix" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/java.png" alt="java" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/spring.png" alt="spring" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/go.png" alt="go" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/rust.png" alt="rust" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/php.png" alt="php" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/laravel.png" alt="laravel" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/python.png" alt="python" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/django.png" alt="django" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/fastapi.jpg" alt="fastapi" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/flask.jpg" alt="flask" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/swift.png" alt="swift" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/vapor.png" alt="vapor" width={50} height={50}/>
          </Link>
          <Link href="">
              <Image src="/../public/icons/rubyrails.png" alt="rubyonrails" width={50} height={50}/>
          </Link>
        </div>
      </main>
    </div>
  )
}
