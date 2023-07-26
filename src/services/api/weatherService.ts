import axios from "axios"

type responseWeatherType = {
    name: string,
    main: {
        feels_like: number,
        humidity: number,
        pressure: number,
        temp: number
    },
    weather: [{
        description: string
    }],
    wind: {
        deg: number,
        speed: number
    },
    dt: number,
    sys: {
        sunrise: number,
        sunset: number
    }
}

let urlAPI = "https://api.openweathermap.org/data/2.5/weather"

export async function getCurrentWeather({lat, lon}: {lat: number, lon: number}, keyAPI: string): Promise<responseWeatherType> {
    try {
        let response = await axios.get(`${urlAPI}?lat=${lat}&lon=${lon}&appid=${keyAPI}&lang=ru&units=metric`)
        return response.data
    } catch(error) {
        throw new Error(error.message) 
    }
}