const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&open_now=true&limit=${limit}`;
}

export async function fetchCoffeeStores() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.FOURSQUARE_API_KEY
        }
    };
    console.log('options', options);
    const response = await fetch(getUrlForCoffeeStores("12.932772688121572,77.60313216982671", "coffee", 5), options);
    console.log('response', response);
    const data = await response.json();
    console.log('data', data);
    return data.results
}