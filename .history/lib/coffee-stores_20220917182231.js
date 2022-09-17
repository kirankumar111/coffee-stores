import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&open_now=true&limit=${limit}`;
}

const getListOfCoffeeStorePhotos = async () => {
    let photos = await unsplash.search.getPhotos({
        query: 'coffee',
        page: 1,
        perPage: 1,
    });
    console.log(111, photos, photos.response.results);
    return photos.response.results.map((photo) =>
        photo.urls["small"]
    )
}

export async function fetchCoffeeStores() {
    const unsplashResults = await getListOfCoffeeStorePhotos();
    console.log('unsplashResults', unsplashResults);
    let latLong = "12.932772688121572,77.60313216982671";
    let limit = 6;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.FOURSQUARE_API_KEY || "fsq3nhGmpeNi3gQk65Y0HLlk+XtRLWXef3es0EKghdAp9EQ="
        }
    };
    console.log('options', options);
    const response = await fetch(getUrlForCoffeeStores(latLong, "coffee", limit), options);
    const data = await response.json();
    return data.results.map(result => {
        return {
            ...result,
            imgUrl: photos[0]
        }
    })
}