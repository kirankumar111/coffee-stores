import { useEffect, useState, useContext } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/banner';
import Card from '../components/card';

import styles from '../styles/Home.module.css';

import { fetchCoffeeStores } from '../lib/coffee-stores';
import useTrackLocation from '../hooks/use-track-location';
import { ACTION_TYPES, StoreContext } from "../store/store-context";


export async function getStaticProps(context) {
  if (!process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY && !process.env.AIRTABLE_API_KEY && !process.env.AIRTABLE_BASE_KEY && !process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY) {
    return {
      redirect: {
        destination: "/problem",
        permanent: false
      }
    }
  }
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStores,
    }//will be passed to the page component as props
  }
}

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } = useTrackLocation();

  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  const { dispatch, state } = useContext(StoreContext);

  const { coffeeStores, latLong } = state;

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          let limit = 20;
          const response = await fetch(`/api/coffeeStores?latLong=${latLong}&limit=${limit}`);
          const coffeeStores = await response.json();
          // setCoffeeStores(fetchedCoffeeStores);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores,
            },
          });
          setCoffeeStoresError("");
          // set coffeeStores
        } catch (error) {
          setCoffeeStoresError(error.meesage);
        }
      }
    }
    setCoffeeStoresByLocation();
  }, [latLong, dispatch]);


  const handleOnBannerClick = () => {
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
              <h2 className={ styles.heading2 }>Stores Near MediBuddy..</h2>
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
