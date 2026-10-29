import type { Metadata } from "next";
import VoyagesView from "@/components/voyages/VoyagesView";

export const metadata: Metadata = { title: "Voyage cacher · Pessah, Souccot, été, ski · AlloJ", description: "Comparez les séjours cacher des organisateurs partenaires et demandez votre devis en un clic." };

export default function Page() {
  return <VoyagesView />;
}
