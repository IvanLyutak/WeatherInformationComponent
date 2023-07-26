import React, { Component } from 'react';
import "./WeatherInformation.css"

import { getCurrentWeather } from './services/api/weatherService';
import { FullVersion } from './components/fullVersion';


interface Props {
    tokenId: string;
}

interface State {
    show: boolean;
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
    } | null;
    errorMessage: string;
}

export default class WeatherInformation extends Component<Props, State> {

    private wrapperRef: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);
        this.state = {
            show: false,
            data: null,
            errorMessage: ""
        };

        this.wrapperRef = React.createRef();
    }


    handleClick() {
        const wrapper = this.wrapperRef.current;
        wrapper?.classList.toggle('is-view-open')
        console.log(wrapper)
    }

    async getMyLocation(): Promise<{lat: number, lon: number}>{        
        try {
            const location = window.navigator && window.navigator.geolocation
            return await new Promise((resolve, reject) => {
                location.getCurrentPosition((position) => {
                    resolve({
                        lat: position.coords.latitude, 
                        lon: position.coords.longitude
                    })
                  }, (error) => {
                    reject(error)
                  })
              })
        } catch(err) {
            throw Error(err)
        }
    }

    async getData(): Promise<void> {
        try {
            let answer = await getCurrentWeather(await this.getMyLocation(),  this.props.tokenId)

            this.setState({
                data: {
                    district: answer.name,
                    description: answer.weather[0].description,
                    temp: answer.main.temp > 0 ? `+${answer.main.temp.toFixed()}` : `-${answer.main.temp.toFixed()}`,
                    feelsLike: answer.main.feels_like > 0 ? `+${answer.main.feels_like.toFixed()}` : `-${answer.main.feels_like.toFixed()}`,
                    pressure: Number((answer.main.pressure / 1.33).toFixed()),
                    humidity: answer.main.humidity,
                    wind: answer.wind.speed,
                    date: new Date(answer.dt * 1000).toLocaleString("ru", {
                        hour: 'numeric',
                        minute: 'numeric'
                    }),
                    timeStartDay: new Date(answer.sys.sunrise * 1000).toLocaleString("ru", {
                        hour: 'numeric',
                        minute: 'numeric'
                    }),
                    timeEndDay: new Date(answer.sys.sunset * 1000).toLocaleString("ru", {
                        hour: 'numeric',
                        minute: 'numeric'
                    }),
                    daylightHours: `${Math.floor((answer.sys.sunset - answer.sys.sunrise)/3600)} ч. ${Math.floor((answer.sys.sunset - answer.sys.sunrise)/60)%60} мин.`
                }
            })
        } catch(err) {
            this.setState({
                errorMessage: err.message
            })
        }
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return(
            <div className='parent'>
                { this.state.data ?
                    <>
                        <FullVersion 
                            ref={this.wrapperRef}
                            data={this.state.data}
                            errorMessage={this.state.errorMessage}
                        />
                    <button className="buttonWeather" onClick={() => {this.getData(); this.setState({show: !this.state.show}); this.handleClick();}}>{this.state.data.temp}°</button>
                    </> : <button className="buttonWeather">...</button>
                }
            </div>
        )
    }
}