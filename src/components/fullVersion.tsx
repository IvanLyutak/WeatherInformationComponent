import "./fullVersion.css"

import React from "react"

import partlyCloudy from '../images/partly_cloudy.svg'
import wind from '../images/wind.svg'
import humidity from '../images/humidity.svg'
import barometer from '../images/barometer.svg'
import earth from '../images/earth.svg'

interface Props {
    data: {
        district: string,
        date: string,
        temp: string,
        description: string,
        feelsLike: string,
        wind: number,
        humidity: number,
        pressure: number,
        daylightHours: string,
        timeStartDay: string,
        timeEndDay: string
    } | null,
    errorMessage: string,
    ref: React.RefObject<HTMLDivElement>
}

export const FullVersion = React.forwardRef<HTMLDivElement, Props>(({data, errorMessage}: Props, ref) => {

    return (
        <div className='view' ref={ref}>
        <div className='weather'><div> Погода </div></div>
        <div className='line'></div>
        { data ?
        <>
            <div className='district'><div>Район {data.district}</div></div>
            <div className='date'><div>Данные от {data.date}</div></div>
            <div className='mainInformation'>
                <div className='temp'><div className='tempInner'><div>{data.temp}°</div></div></div>
                <img className='imgWeather' src={partlyCloudy} alt="imageWeather"/>
                <div className='container'>
                    <div className='description'><div>{data.description}</div></div>
                    <div className='feels_like'> Ощущается как {data.feelsLike}° </div>
                </div>
            </div>
            <div className='additionalInformation'>
                <div className='wind'>
                    <img src={wind} alt="wind"/>
                    <div className='text'><div>{data.wind} м/с</div> </div>
                </div>
                <div className='humidity'>
                    <img src={humidity} alt="humidity"/>
                    <div className='text'><div>{data.humidity}%</div></div>
                </div>
                <div className='pressure'>
                    <img src={barometer} alt="pressure"/>
                    <div className='text'><div>{data.pressure} мм рт.ст.</div></div>
                </div>
            </div>
            <div className='sunTimes'>
                <div className='daylightHours'>
                    <div className='title'>Световой день</div>
                    <div className='text'>{data.daylightHours}</div>
                </div>
                <div className='data'>
                    <div className='time'>{data.timeStartDay}</div>
                    <img src={earth} alt="earth"/>
                    <div className='time'>{data.timeEndDay}</div>
                </div>
            </div>
        </> : <div className='errorMessage'> {errorMessage}</div>
        }
    </div>
    )
})