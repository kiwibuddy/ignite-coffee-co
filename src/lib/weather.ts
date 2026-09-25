const OPEN_METEO =
  "https://api.open-meteo.com/v1/forecast?latitude=54.44&longitude=-124.25&current=temperature_2m&timezone=America%2FVancouver";

export type WeatherSnapshot = {
  tempC: number;
};

export async function fetchWeather(): Promise<WeatherSnapshot> {
  try {
    const res = await fetch(OPEN_METEO);
    if (!res.ok) return { tempC: 9 };
    const data = (await res.json()) as {
      current?: { temperature_2m?: number };
    };
    const temp = data.current?.temperature_2m;
    if (typeof temp !== "number" || Number.isNaN(temp)) {
      return { tempC: 9 };
    }
    return { tempC: Math.round(temp * 10) / 10 };
  } catch {
    return { tempC: 9 };
  }
}
