import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Card from '../components/card';
// import coffeeStoresData from '../data/coffee-stores.json';
import { fetchCoffeeStores } from '../lib/coffee-stores';
import useTrackLocation from '../hooks/use-track-location';
import { useEffect, useState } from 'react';


export async function getStaticProps(context) {
  //const data = coffeeStores;
  const coffeeStoresData = await fetchCoffeeStores();
  console.log('coffeeStoresData', coffeeStoresData);
  return {
    props: {
      coffeeStores: coffeeStoresData,
    }
  }
}

export default function Home(props) {
  console.log('Home props', props);
  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } = useTrackLocation();
  console.log({ handleTrackLocation, latLong, locationErrorMsg, isFindingLocation });

  const [coffeeStores, setCoffeeStores] = useState("");
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 20);
          console.log({ fetchedCoffeeStores });
          setCoffeeStores(fetchedCoffeeStores)
        } catch (error) {
          console.log({ error });
          setCoffeeStoresError(error.meesage);
        }
      }
    }
    setCoffeeStoresByLocation();
  }, [latLong]);


  const handleOnBannerClick = () => {
    console.log('Hi Banner Click');
    handleTrackLocation();
  }
  return (
    <div className={ styles.container }>
      <Head>
        <title>Coffee Lovers!</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="allows you to discover your favorite coffee stores" />
      </Head>
      <main className={ styles.main }>
        <Banner buttonText={ isFindingLocation ? "Locating..." : "View shops near by" } handleOnClick={ handleOnBannerClick } />
        { locationErrorMsg && <p>Something went wrong: { locationErrorMsg }</p> }
        { coffeeStoresError && <p>Something went wrong:{ coffeeStoresError }</p> }
        <div className={ styles.heroImage }>
          <Image src="/static/hero-image.png" alt="HeroImage" width={ 700 } height={ 400 }></Image>
        </div>
        { coffeeStores.length > 0 && (
          <div className={ styles.sectionWrapper }>
            <h2 className={ styles.heading2 }>Stores Near Me</h2>
            <div className={ styles.cardLayout }>
              { coffeeStores.map(store => {
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
        <div className={ styles.sectionWrapper }>
          { props.coffeeStores.length > 0 && (
            <>
              <h2 className={ styles.heading2 }>Stores Near IBC Knowledge Park..</h2>
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
            </>
          ) }
        </div>
      </main>
    </div >
  )
}
