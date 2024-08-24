export const getWeatherData = async (localityId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WEATHER_API_URL}/get_locality_weather_data?locality_id=${localityId}`,
    {
      headers: {
        "X-Zomato-Api-Key": `${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
      },
    },
  );

  const data = await response.json();

  if (data.status !== "200") {
    return { message: "Error fetching weather data", data: [] };
  }

  return { message: "Success", data: data };
};
