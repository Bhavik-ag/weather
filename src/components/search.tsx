"use client";

import { useState } from "react";
import Select from "react-select";
import { Cloud, Search } from "lucide-react";
import options from "@/data/locality_data.json";
import { getWeatherData } from "@/utils/getWeatherData";

interface WeatherData {
  humidity: number;
  temperature: number;
  wind_speed: number;
  wind_direction: number;
  rain_intensity: number;
  rain_accumulation: number;
}

export default function SearchPage() {
  const [selectedLocality, setSelectedLocality] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setWeatherData(null);

    getWeatherData(selectedLocality?.value || "")
      .then((data) => {
        console.log(data);
        setWeatherData(data.data.locality_weather_data);
      })
      .catch(() => {
        console.error("Error fetching weather data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full max-w-xl mx-auto text-center p-4">
      <div className="mb-8 flex items-center justify-center">
        <Cloud className="h-16 w-16 text-blue-500 mr-2" />
        <h1 className="text-4xl font-bold text-blue-700">Weather Search</h1>
      </div>

      <form className=" flex gap-3 items-center" onSubmit={handleSubmit}>
        <Select
          instanceId="locality"
          options={options}
          className="text-left w-full"
          defaultValue={selectedLocality}
          onChange={(value) => {
            setSelectedLocality(value);
            setWeatherData(null);
          }}
          placeholder="Select a city"
        />
        <button className="bg-blue-500 h-full p-3 rounded-lg">
          <Search className="h-5 w-5 text-white" />
        </button>
      </form>

      <div className="flex flex-col mt-8">
        {isLoading && <p className="mt-8">Loading...</p>}
        {weatherData && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Weather Data</h2>
            {selectedLocality && (
              <p className="text-lg font-semibold">{selectedLocality.label}</p>
            )}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div>
                <h3 className="text-lg font-semibold">Temperature</h3>
                {weatherData.temperature ? (
                  <p>{weatherData.temperature}°C</p>
                ) : (
                  <p> Not available</p>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">Humidity</h3>
                {weatherData.humidity ? (
                  <p>{weatherData.humidity}%</p>
                ) : (
                  <p> Not available</p>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">Wind Speed</h3>
                {weatherData.wind_speed ? (
                  <p>{weatherData.wind_speed} km/h</p>
                ) : (
                  <p> Not available</p>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">Wind Direction</h3>
                {weatherData.wind_direction ? (
                  <p>{weatherData.wind_direction}°</p>
                ) : (
                  <p> Not available</p>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">Rain Intensity</h3>
                {weatherData.rain_intensity ? (
                  <p>{weatherData.rain_intensity} mm/h</p>
                ) : (
                  <p> Not available</p>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">Rain Accumulation</h3>
                {weatherData.rain_accumulation ? (
                  <p>{weatherData.rain_accumulation} mm</p>
                ) : (
                  <p> Not available</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
