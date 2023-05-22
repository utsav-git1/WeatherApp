import { useState } from "react";
import "./App.css";
import { styled } from "styled-components";
import axios from "axios";
import { ImDroplet } from "react-icons/im";
import { RiWindyFill } from "react-icons/ri";
import { BiSun } from "react-icons/bi";
import { HiMoon } from "react-icons/hi";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, darkTheme, lightTheme } from "./theme";
import ToggleSwitch from "./ToggleSwitch";

const api = {
  key: import.meta.env.VITE_REACT_WEATHER_KEY,
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const Container = styled.div`
  height: 90vh;
  width: 30vw;
  left: 0;
  top: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Header = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-style: italic;
  margin: 5% 0 5% 0;
`;

const Panel = styled.div`
  border: 2px solid lightgrey;
  border-radius: 5px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 800px) {
    width: 250px;
  }
`;

const SearchBar = styled.input`
  width: 60%;
  height: 5%;
  margin: 2em;
  border-radius: 5px;

  &:hover {
    border: 2px solid;
    border-color: purple;
  }
`;

const Location = styled.div`
  border: 2px solid;
  border-radius: 5px;
  height: 8%;
  width: 50%;
  margin: 3% 0 3% 0;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Temperature = styled.div`
  border: 2px solid;
  border-radius: 5px;
  height: 8%;
  margin: 7% 0 3% 0;
  width: 20%;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2%;
  font-weight: bold;
`;

const WeatherContainer = styled.div`
  border: 2px solid;
  border-radius: 5px;
  height: 8%;
  margin: 3% 0 3% 0;
  width: 25%;
  font-size: 1.4em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  margin: auto;
  border: 2px solid;
  border-radius: 5px;
  padding: 3%;
  width: 25%;
`;

const Element = styled.div`
  margin: 3%;
`;

const Message = styled.div``;

const Button = styled.button`
  width: 50%;
  height: 8%;
  margin: 5%;
  border-radius: 5px;
  cursor: pointer;
`;

const Mode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2%;
`;

interface Weather {
  name: string;
  main: {
    temp: number | null;
    humidity: number | null;
  };
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];
  wind: {
    speed: number | null;
  };
  sys: {
    country: string;
  };
}

const weatherObj: Weather = {
  name: "",
  main: {
    temp: null,
    humidity: null,
  },
  weather: [
    {
      main: "",
      description: "",
      icon: "",
    },
  ],
  wind: {
    speed: null,
  },
  sys: {
    country: "",
  },
};

const getData = async (
  location: string,
  setWeather: React.Dispatch<React.SetStateAction<Weather>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const res = await axios.get(
      `${api.baseUrl}weather?q=${location}&units=metric&APPID=${api.key}`
    );
    setWeather(res.data);
    setMessage("");
  } catch (err: any) {
    console.log(err);
    setWeather(weatherObj);
    setMessage(err.response.data.message);
  }
};

const getUserlocation = (
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  setWeather: React.Dispatch<React.SetStateAction<Weather>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  const successCallback = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const getlocation = async () => {
      try {
        const res = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        setQuery(res.data.city);
        getData(res.data.city, setWeather, setMessage);
      } catch (err) {
        console.log(err);
      }
    };
    getlocation();
  };

  const errorCallback = (error: any) => {
    console.log(error);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};

function App() {
  const [query, setQuery] = useState<string>("");
  const [weather, setWeather] = useState<Weather>(weatherObj);
  const [message, setMessage] = useState<string>("");
  const tempUnit: string = "°C";
  const [theme, setTheme] = useState("light");

  const handleClick = () => {
    getUserlocation(setQuery, setWeather, setMessage);
  };

  const search = (event: React.KeyboardEvent) => {
    if (event.key == "Enter") getData(query, setWeather, setMessage);
  };

  return (
    <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Container>
        <Header>Weather App</Header>
        <Panel>
          <SearchBar
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            onKeyPress={(e: React.KeyboardEvent) => search(e)}
          />
          {message && <Message>{message}</Message>}
          <Location>
            {weather.name} {weather.name && ', '}
            {new Intl.DisplayNames(["en"], { type: "region" }).of(weather.sys.country)}
          </Location>
          <Temperature>
            {weather.main.temp?.toFixed(1)}
            {weather.main.temp && tempUnit}
          </Temperature>
          <WeatherContainer>{weather.weather[0].main}</WeatherContainer>
          <Details>
            <Element>
              <ImDroplet /> {weather.main.humidity}
              {weather.main.humidity && "%"}
            </Element>
            <Element>
              <RiWindyFill /> {weather.wind.speed?.toFixed(1)}
              {weather.wind.speed && "Kmph"}
            </Element>
          </Details>
          <Mode>
            <BiSun />
            <ToggleSwitch setTheme={setTheme} />
            <HiMoon />
          </Mode>
        </Panel>
        <Button onClick={handleClick}>Your location</Button>
      </Container>
    </ThemeProvider>
  );
}

export default App;
