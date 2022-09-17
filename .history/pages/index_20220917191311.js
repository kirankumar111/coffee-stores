import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Card from '../components/card';
// import coffeeStoresData from '../data/coffee-stores.json';
import { fetchCoffeeStores } from '../lib/coffee-stores';
import useTrackLocation from '../hooks/use-track-location';
import { useEffect } from 'react';


export async function getStaticProps(context) {
  //const data = coffeeStores;
  const coffeeStoresData = await fetchCoffeeStores();
  return {
    props: {
      coffeeStores: coffeeStoresData,
    }
  }
}

export default function Home(props) {
  console.log('Home props', props);
  const handleOnBannerClick = () => {
    console.log('Hi Banner Click');
    const { handleTrackLocation, latlong, locationErrorMsg, isFindingLocation } = useTrackLocation();
    const [coffeeStores, setCoffeeStores] = useState("");
    const [coffeeStoresError, setCoffeeStoresError] = useState(null)
    console.log({ latlong, locationErrorMsg })
    useEffect(async () => {
      async function setCoffeeStoresByLocation() {
        if (latlong) {
          try {
            const fetchCoffeeStores = await fetchCoffeeStores(latlong, 6);
            console.log({ fetchCoffeeStores });
            setCoffeeStores(fetchCoffeeStores)
          } catch (error) {
            console.log({ error });
            setCoffeeStoresError(error.meesage);
          }
        }
      }
      setCoffeeStoresByLocation();
    }, [latlong]);
  }
  return (
    <div className={ styles.container }>
      <Head>
        <title>Coffee Lovers!</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="allows you to discover your favorite coffee stores" />
      </Head>
      <main className={ styles.main }>
        <Banner buttonText={ setIsFindingLocation ? "Location..." : "View shops near by" } handleOnClick={ handleOnBannerClick } />
        { locationErrorMsg ? <p>Something went wrong.</p> : "" }
        <div className={ styles.heroImage }>
          <Image src="/static/hero-image.png" alt="HeroImage" width={ 700 } height={ 400 }></Image>
        </div>
        { props.coffeeStores.length > 0 && (
          <div className={ styles.sectionWrapper }>
            <h2 className={ styles.heading2 }>Stores Near Me</h2>
            <div className={ styles.cardLayout }>
              { props.coffeeStores.map(store => {
                return (
                  <Card
                    key={ store.fsq_id }
                    href={ `/coffee-stores/${store.fsq_id}` }
                    name={ store.name }
                    imgUrl={ store.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" }
                    className={ styles.card }
                    height={ 250 }
                    width={ 300 }
                  />
                )
              }) }
            </div>
          </div>
        ) }
      </main>
    </div>
  )
}
