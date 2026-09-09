import { getWeather } from "@/lib/server/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  try {
    const weather = await getWeather(city);

    return Response.json(weather, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Weather API failed";

    return Response.json(
      {
        error: message,
      },
      {
        status: 502,
      },
    );
  }
}
