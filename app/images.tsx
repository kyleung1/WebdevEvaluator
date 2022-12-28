import { StaticImageData } from "next/image";
type techs = Array<{
  "image": StaticImageData,
  "alt": string,
  "import": string
}>;

import vsc from ".//../public/icons/vsc.png";
import visualstudio from ".//../public/icons/visualstudio.png";
import intellij from ".//../public/icons/intellij.png";
import neovim from ".//../public/icons/neovim.png";
import phpstorm from ".//../public/icons/phpstorm.png";
import pycharm from ".//../public/icons/pycharm.png";
import docker from ".//../public/icons/docker.png";
import kubernetes from ".//../public/icons/kubernetes.png";
import git from ".//../public/icons/git.png";
import github from ".//../public/icons/github.png";
import powershell from ".//../public/icons/powershell.png";
import firebase from ".//../public/icons/firebase.png";
import aws from ".//../public/icons/aws.png";
import azure from ".//../public/icons/azure.png";
import heroku from ".//../public/icons/heroku.png";
import digitalocean from ".//../public/icons/digitalocean.png";
import googlecloud from ".//../public/icons/googlecloud.png";
import mongodb from ".//../public/icons/mongodb.png";
import redisinc from ".//../public/icons/redisinc.jpg";
import mysql from ".//../public/icons/mysql.png";
import postgresql from ".//../public/icons/postgresql.png";
import mariadb from ".//../public/icons/mariadb.png";
import sqlserver from ".//../public/icons/sqlserver.png";
import sqlite from ".//../public/icons/sqlite.png";
import html from ".//../public/icons/html.png";
import markdown from ".//../public/icons/markdown.png";
import css from ".//../public/icons/css.png";
import sass from ".//../public/icons/sass.png";
import bootstrap from ".//../public/icons/bootstrap.png";
import tailwind from ".//../public/icons/tailwind.png";
import javascript from ".//../public/icons/javascript.png";
import typescript from ".//../public/icons/typescript.png";
import nodejs from ".//../public/icons/nodejs.png";
import deno from ".//../public/icons/deno.png";
import vitejs from ".//../public/icons/vitejs.png";
import jquery from ".//../public/icons/jquery.png";
import express from ".//../public/icons/express.jpg";
import react from ".//../public/icons/react.png";
import next from ".//../public/icons/next.png";
import remix from ".//../public/icons/remix.png";
import vuejs from ".//../public/icons/vuejs.png";
import nuxt from ".//../public/icons/nuxt.png";
import angular from ".//../public/icons/angular.png";
import nestjs from ".//../public/icons/nestjs.png";
import svelte from ".//../public/icons/svelte.png";
import alpine from ".//../public/icons/alpine.png";
import solidjs from ".//../public/icons/solidjs.png";
import qwik from ".//../public/icons/qwik.png";
import lit from ".//../public/icons/lit.png";
import astro from ".//../public/icons/astro.png";
import fastify from ".//../public/icons/fastify.png";
import strapi from ".//../public/icons/strapi.png";
import php from ".//../public/icons/php.png";
import dart from ".//../public/icons/flutterdev.png";
import java from ".//../public/icons/java.png";
import elixir from ".//../public/icons/elixir.png";
import go from ".//../public/icons/go.png";
import rust from ".//../public/icons/rust.png";
import python from ".//../public/icons/python.png";
import swift from ".//../public/icons/swift.png";
import asp from ".//../public/icons/asp.png";
import blazor from ".//../public/icons/blazor.png";
import phoenix from ".//../public/icons/elixirphoenix.png";
import spring from ".//../public/icons/spring.png";
import laravel from ".//../public/icons/laravel.png";
import django from ".//../public/icons/django.png";
import fastapi from ".//../public/icons/fastapi.jpg";
import flask from ".//../public/icons/flask.jpg";
import vapor from ".//../public/icons/vapor.png";
import rubyonrails from ".//../public/icons/rubyonrails.png";

const ide: techs = [
  {
    "image": vsc,
    "alt": "Visual Studio Code",
    "import": "@code"
  },
  {
    "image": visualstudio,
    "alt": "Visual Studio",
    "import": "VisualStudio"
  },
  {
    "image": intellij,
    "alt": "IntelliJ IDEA",
    "import": "intellijidea"
  },
  {
    "image": phpstorm,
    "alt": "PHPStorm",
    "import": "phpstorm"
  },
  {
    "image": pycharm,
    "alt": "PyCharm",
    "import": "pycharm"
  },
  {
    "image": neovim,
    "alt": "Neovim",
    "import": "neovim"
  },
];

const other: techs = [
  {
    "image": docker,
    "alt": "Docker",
    "import": "@Docker"
  },
  {
    "image": kubernetes,
    "alt": "Kubernetes",
    "import": "kubernetesio"
  },
  {
    "image": git,
    "alt": "Git",
    "import": "Git"
  },
  {
    "image": github,
    "alt": "GitHub",
    "import": "github"
  },
  {
    "image": powershell,
    "alt": "Powershell",
    "import": "powershell"
  }
];
const cloud: techs = [
  {
    "image": aws,
    "alt": "Amazon Web Services",
    "import": "awscloud"
  },
  {
    "image": azure,
    "alt": "Microsoft Azure",
    "import": "azure"
  },
  {
    "image": googlecloud,
    "alt": "Google Cloud Platform",
    "import": "googlecloud"
  },
  {
    "image": digitalocean,
    "alt": "Digital Ocean",
    "import": "digitalocean"
  },
  {
    "image": firebase,
    "alt": "Firebase",
    "import": "Firebase"
  },
  {
    "image": heroku,
    "alt": "Heroku",
    "import": "heroku"
  }
];
const nosql: techs = [
  {
    "image": mongodb,
    "alt": "MongoDB",
    "import": "MongoDB"
  },
  {
    "image": redisinc,
    "alt": "Redis",
    "import": "Redisinc"
  }
];
const sql: techs = [
  {
    "image": mysql,
    "alt": "MySQL",
    "import": "mysql"
  },
  {
    "image": postgresql,
    "alt": "PostgreSQL",
    "import": "PostgreSQL"
  },
  {
    "image": mariadb,
    "alt": "MariaDB",
    "import": "mariadb"
  },
  {
    "image": sqlserver,
    "alt": "SQLServer",
    "import": "SQLServer"
  },
  {
    "image": sqlite,
    "alt": "SQLite",
    "import": "SQLite"
  }
];
const htmlcss: techs = [
  {
    "image": html,
    "alt": "HTML",
    "import": "html5"
  },
  {
    "image": markdown,
    "alt": "Markdown",
    "import": "markdown"
  },
  {
    "image": css,
    "alt": "CSS",
    "import": "css"
  },
  {
    "image": sass,
    "alt": "Sass",
    "import": "SassCSS"
  },
  {
    "image": bootstrap,
    "alt": "Boostrap",
    "import": "getbootstrap"
  },
  {
    "image": tailwind,
    "alt": "Tailwind",
    "import": "tailwindcss"
  }
];
const javascripts: techs = [
  {
    "image": javascript,
    "alt": "JavaScript",
    "import": "javascript"
  },
  {
    "image": typescript,
    "alt": "TypeScript",
    "import": "typescript"
  },
  {
    "image": nodejs,
    "alt": "Node.js",
    "import": "nodejs"
  },
  {
    "image": deno,
    "alt": "Deno",
    "import": "deno_land"
  },
];
const frameworks: techs = [
  {
    "image": jquery,
    "alt": "JQuery",
    "import": "jquery"
  },
  {
    "image": express,
    "alt": "ExpressJS",
    "import": "express js"
  },
  {
    "image": vitejs,
    "alt": "Vite",
    "import": "vite_js"
  },
  {
    "image": react,
    "alt": "React",
    "import": "react js"
  },
  {
    "image": next,
    "alt": "Next.js",
    "import": "next js"
  },
  {
    "image": remix,
    "alt": "Remix",
    "import": "remix js"
  },
  {
    "image": vuejs,
    "alt": "Vue",
    "import": "vue"
  },
  {
    "image": nuxt,
    "alt": "Nuxt",
    "import": "nuxt_js"
  },
  {
    "image": angular,
    "alt": "Angular",
    "import": "angular js"
  },
  {
    "image": nestjs,
    "alt": "NestJS",
    "import": "nestframework"
  },
  {
    "image": svelte,
    "alt": "Svelte",
    "import": "svelte"
  },
  {
    "image": alpine,
    "alt": "Alpine.js",
    "import": "alpine js"
  },
  {
    "image": solidjs,
    "alt": "SolidJS",
    "import": "solid js"
  },
  {
    "image": qwik,
    "alt": "Qwik",
    "import": "qwik"
  },
  {
    "image": lit,
    "alt": "Lit",
    "import": "lit js"
  },
  {
    "image": astro,
    "alt": "Astro",
    "import": "astrodotbuild"
  },
  {
    "image": fastify,
    "alt": "Fastify",
    "import": "fastify"
  },
  {
    "image": strapi,
    "alt": "Strapi",
    "import": "strapijs"
  }
];
const backendlang: techs = [
  {
    "image": php,
    "alt": "PHP",
    "import": "official_php"
  },
  {
    "image": dart,
    "alt": "Dart",
    "import": "dart_lang"
  },
  {
    "image": java,
    "alt": "Java",
    "import": "@java"
  },
  {
    "image": go,
    "alt": "Go",
    "import": "golang"
  },
  {
    "image": elixir,
    "alt": "Elixir",
    "import": "elixirlang"
  },
  {
    "image": rust,
    "alt": "Rust",
    "import": "rustlang"
  },
  {
    "image": python,
    "alt": "Python",
    "import": "python"
  },
  {
    "image": swift,
    "alt": "Swift",
    "import": "SwiftLang"
  }
];
const backendframe: techs = [
  {
    "image": asp,
    "alt": "ASP.NET",
    "import": "aspnet"
  },
  {
    "image": blazor,
    "alt": "Blazor",
    "import": "Blazor"
  },
  {
    "image": phoenix,
    "alt": "Phoenix",
    "import": "elixirphoenix"
  },
  {
    "image": spring,
    "alt": "Spring",
    "import": "springframework"
  },
  {
    "image": laravel,
    "alt": "Laravel",
    "import": "laravelphp"
  },
  {
    "image": django,
    "alt": "Django",
    "import": "djangoproject"
  },
  {
    "image": fastapi,
    "alt": "FastAPI",
    "import": "fastapi"
  },
  {
    "image": flask,
    "alt": "Flask",
    "import": "pythonflask"
  },
  {
    "image": vapor,
    "alt": "Vapor",
    "import": "codevapor"
  },
  {
    "image": rubyonrails,
    "alt": "Ruby on Rails",
    "import": "@rails"
  }
];

export const images = [
  ide,
  other,
  cloud,
  nosql,
  sql,
  htmlcss,
  javascripts,
  frameworks,
  backendlang,
  backendframe,
];
