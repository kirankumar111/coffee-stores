const useTrackLocation = () => {
    const success = () => {

    }

    const error = () => {

    }

    const handleTrackLocation = () => {
        if (!navigator.geolocation) {
            status.textContent = 'Geo'
        }
    }
}