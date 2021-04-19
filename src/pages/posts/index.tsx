import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Iniciando com ReactJS: Navegação e Autenticação com JWT</strong>
            <p>Esse post é a oitava parte da série de posts “Clone AirBnB com AdonisJS, React Native e ReactJS” onde iremos construir do zero uma aplicação web com ReactJS e também uma aplicação mobile com React Native com dados servidos através de uma API REST feita com NodeJS utilizando o framework AdonisJS.</p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Iniciando com ReactJS: Navegação e Autenticação com JWT</strong>
            <p>Esse post é a oitava parte da série de posts “Clone AirBnB com AdonisJS, React Native e ReactJS” onde iremos construir do zero uma aplicação web com ReactJS e também uma aplicação mobile com React Native com dados servidos através de uma API REST feita com NodeJS utilizando o framework AdonisJS.</p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Iniciando com ReactJS: Navegação e Autenticação com JWT</strong>
            <p>Esse post é a oitava parte da série de posts “Clone AirBnB com AdonisJS, React Native e ReactJS” onde iremos construir do zero uma aplicação web com ReactJS e também uma aplicação mobile com React Native com dados servidos através de uma API REST feita com NodeJS utilizando o framework AdonisJS.</p>
          </a>
        </div>

      </main>
    </>
  )
}
