import React, { useState, useEffect }from 'react'
import WeatherContainer from './WeatherContainer'


export default function CurrentWeather() {
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [status, setStatus] = useState(null)
    const [data, setData] = useState(null)
    const MARSUPIAL = 'fb8b56e1681e560617d805dac216eb96'
    //let callLink = `https://api.weatherapi.com/v1/current.json?key=${MARSUPIAL}q=${lat},${lng}`

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
    
/*     const fetchCall = () => {
                return fetch(callLink)
                    .then(res => res.json())
                    .then(response => setData(response))
                    .then(console.log(data))
            } */
        
    useEffect(() => {
        getLocation()
        
    }, [])

    useEffect(() => {
        console.log(lat)
        console.log(lng)

        /* let callLink = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${MARSUPIAL}`  */
        let callLink = `https://api.openweathermap.org/data/2.5/weather?lat=40.8351153&lon=-73.909908399&mode=json&appid=${MARSUPIAL}` 

        if (lat && lng) {
            return fetch(callLink)
                .then((res) => res.json())
                .then((response) => setData(response));
      // fetchCall()
        }
    }, [lat, lng]);


    
    return (
        <div>
            <h1>Current Condition in is this rendering?</h1>

            {data}
        </div>
    )
}
