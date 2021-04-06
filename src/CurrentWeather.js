import React, { useState, useEffect }from 'react'

export default function CurrentWeather() {
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [status, setStatus] = useState(null)
    const [data, setData] = useState(null)
    const MARSUPIAL = '26db1c8d52944d17bac192316210404&'
    let callLink = `https://api.weatherapi.com/v1/current.json?key=${MARSUPIAL}q=${lat},${lng}`

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser')
        } else {
            setStatus('Locating...')
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus('Position loaded');
                setLat(position.coords.latitude)
                setLng(position.coords.longitude);
            }, () => {
                setStatus('Unables to retrieve your location');
            });
        }
    }
    
    

    useEffect(() => {
        getLocation()
        
        return fetch(callLink)
            .then(res => res.json())
            .then(response => setData(response))
            .then(console.log(data))
    }, [])

    return (
        <div >
            
            <h1>Current Weather In {data.location.name}</h1>
            {status}
            {lat && <p>Latitude: {lat}</p>}
            {lng && <p>Longitude: {lng}</p>}
            {data.current.temp_f}
        </div>
    )
}
