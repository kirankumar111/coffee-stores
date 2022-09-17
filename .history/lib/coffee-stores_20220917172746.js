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

    const response = await fetch(getUrlForCoffeeStores("12.932772688121572-77.60313216982671", "coffee", 10), options);
    const data = await response.json();
    return data.results
}