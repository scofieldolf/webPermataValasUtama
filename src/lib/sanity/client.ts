import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SANITY_CONFIG } from "./config";

export const client = createClient({
  ...SANITY_CONFIG,
  useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
