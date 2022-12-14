import { createApi } from 'unsplash-js';

// on your node server
const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`//&open_now=true;
}

const getListOfCoffeeStorePhotos = async () => {
    let photos = await unsplash.search.getPhotos({
        query: 'coffee shop',
        perPage: 30,
    });
    const unsplashResults = photos.response?.results || [];
    return unsplashResults.map((result) =>
        result.urls["small"]
    )
}

export const fetchCoffeeStores = async (latLong = "12.932772688121572,77.60313216982671", limit = 20) => {
    const photos = await getListOfCoffeeStorePhotos();
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
        }
    };
    const response = await fetch(getUrlForCoffeeStores(latLong, "coffee", limit), options);
    const data = await response.json();
    return data.results.map((result, index) => {
        const neighborhood = result.location.neighborhood;
        return {
            id: result.fsq_id.toString(),
            name: result.name,
            address: result.address ? result.address : result.location.formatted_address,
            neighborhood: neighborhood ? neighborhood.length > 0 ? neighborhood[0] : "" : "",
            imgUrl: photos.length > 0 ? photos[index] : null,
            ...result,
        }
    })
}