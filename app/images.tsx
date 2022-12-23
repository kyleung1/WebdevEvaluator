import { StaticImageData } from 'next/image'
type techs = Array<Array<StaticImageData | string>>

import vsc from './/../public/icons/vsc.png'
import intellij from './/../public/icons/intellij.png'
import neovim from './/../public/icons/neovim.png'
import phpstorm from './/../public/icons/phpstorm.png'
import pycharm from './/../public/icons/pycharm.png'
import docker from './/../public/icons/docker.png'
import kubernetes from './/../public/icons/kubernetes.png'
import git from './/../public/icons/git.png'
import github from './/../public/icons/github.png'
import powershell from './/../public/icons/powershell.png'
import firebase from './/../public/icons/firebase.png'
import aws from './/../public/icons/aws.png'
import azure from './/../public/icons/azure.png'
import digitalocean from './/../public/icons/digitalocean.png'
import googlecloud from './/../public/icons/googlecloud.png'
import mongodb from './/../public/icons/mongodb.png'
import redisinc from './/../public/icons/redisinc.jpg'
import mysql from './/../public/icons/mysql.png'
import postgresql from './/../public/icons/postgresql.png'
import mariadb from './/../public/icons/mariadb.png'
import sqlserver from './/../public/icons/sqlserver.png'
import sqlite from './/../public/icons/sqlite.png'
import html from './/../public/icons/html.png'
import markdown from './/../public/icons/markdown.png'
import css from './/../public/icons/css.png'
import sass from './/../public/icons/sass.png'
import bootstrap from './/../public/icons/bootstrap.png'
import tailwind from './/../public/icons/tailwind.png'
import javascript from './/../public/icons/javascript.png'
import typescript from './/../public/icons/typescript.png'
import nodejs from './/../public/icons/nodejs.png'
import deno from './/../public/icons/deno.png'
import vitejs from './/../public/icons/vitejs.png'
import jquery from './/../public/icons/jquery.png'
import express from './/../public/icons/express.jpg'
import react from './/../public/icons/react.png'
import next from './/../public/icons/next.png'
import remix from './/../public/icons/remix.png'
import vuejs from './/../public/icons/vuejs.png'
import nuxt from './/../public/icons/nuxt.png'
import angular from './/../public/icons/angular.png'
import nestjs from './/../public/icons/nestjs.png'
import svelte from './/../public/icons/svelte.png'
import alpine from './/../public/icons/alpine.png'
import solidjs from './/../public/icons/solidjs.png'
import qwik from './/../public/icons/qwik.png'
import lit from './/../public/icons/lit.png'
import astro from './/../public/icons/astro.png'
import fastify from './/../public/icons/fastify.png'
import strapi from './/../public/icons/strapi.png'
import php from './/../public/icons/php.png'
import dart from './/../public/icons/flutterdev.png'
import java from './/../public/icons/java.png'
import elixir from './/../public/icons/elixir.png'
import go from './/../public/icons/go.png'
import rust from './/../public/icons/rust.png'
import python from './/../public/icons/python.png'
import swift from './/../public/icons/swift.png'
import asp from './/../public/icons/asp.png'
import blazor from './/../public/icons/blazor.png'
import phoenix from './/../public/icons/elixirphoenix.png'
import spring from './/../public/icons/spring.png'
import laravel from './/../public/icons/laravel.png'
import django from './/../public/icons/django.png'
import fastapi from './/../public/icons/fastapi.jpg'
import flask from './/../public/icons/flask.jpg'
import vapor from './/../public/icons/vapor.png'
import rubyonrails from './/../public/icons/rubyonrails.png'

const ide: techs = [[vsc, 'visual studio code'], [intellij, 'intellij'], [phpstorm, 'phpstorm'], [pycharm, 'pycharm'], [neovim, 'neovim']]

const other = [[docker, 'docker'], [kubernetes, 'kubernetes'], [git, 'git'], [github, 'github'], [powershell, 'powershell']]
const cloud = [[aws, 'Amazon Web Services'], [azure, 'Microsoft Azure'], [googlecloud, 'Google Cloud Platform'],
[digitalocean, 'Digital Ocean'], [firebase, 'Firebase']]
const nosql = [[mongodb, 'MongoDB'], [redisinc, 'Redis']]
const sql = [[mysql, 'mysql'], [postgresql, 'postgresql'], [mariadb, 'mariadb'], [sqlserver, 'sqlserver'], [sqlite, 'sqlite']]
const htmlcss = [[html, 'html'], [markdown, 'markdown'], [css, 'css'], [sass, 'sass'], [bootstrap, 'bootstrap'], [tailwind, 'tailwind']]
const javascripts = [[javascript, 'javascript'], [typescript, 'typescript'], [nodejs, 'nodejs'], [deno, 'deno'], [vitejs, 'vitejs']]
const frameworks = [[jquery, 'jquery'], [express, 'express'], [react, 'react'], [next, 'next'], [remix, 'remix'], [vuejs, 'vuejs'],
[nuxt, 'nuxt'], [angular, 'angular'], [nestjs, 'nestjs'], [svelte, 'svelte'], [alpine, 'alpine'], [solidjs, 'solidjs'], [qwik, 'qwik'], [lit, 'lit'],
[astro, 'astro'], [fastify,' fastify'], [strapi, 'strapi']]
const backendlang = [[php, 'php'], [dart, 'dart'], [java, 'java'], [go, 'go'], [elixir, 'elixir'], [rust, 'rust'], [python, 'python'], [swift, 'swift']]
const backendframe = [[asp, 'asp.net'], [blazor, 'blazor'], [phoenix, 'phoenix'], [spring, 'spring'], [laravel, 'laravel'], [django, 'django'],
[fastapi, 'fastapi'], [flask, 'flask'], [vapor, 'vapor'], [rubyonrails, 'rubyonrails']]

export const images = [ide, other, cloud, nosql, sql, htmlcss, javascripts, frameworks, backendlang, backendframe]