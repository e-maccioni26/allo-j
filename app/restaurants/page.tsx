import type { Metadata } from "next";
import RestaurantsView from "@/components/restaurants/RestaurantsView";

export const metadata: Metadata = { title: "Restaurants cacher à Paris · AlloJ", description: "Trouvez un restaurant cacher à Paris : certification, cuisine, ville, réservation en ligne." };

export default function Page() {
  return <RestaurantsView />;
}
