import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <div>
    <Component {...pageProps} />
    <footer>
      <p>@Coffee Trademark 2022</p>
    </footer>
  </div>
}

export default MyApp
