import type { MetadataRoute } from "next";
import { collections } from "@/lib/collections";
import { kadrajinOtesiPosts } from "@/lib/kadrajinOtesi";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const absolute = (path: string) => new URL(path, site.url).href;
  return [
    ...["/", "/kadraj-yansimalari", "/kadrajin-otesi", "/mavi-kadraj-kimdir"].map((path) => ({ url: absolute(path) })),
    ...collections.map((collection) => ({ url: absolute(`/${collection.slug}`), images: collection.images.map((image) => absolute(image.src)) })),
    ...kadrajinOtesiPosts.map((post) => ({ url: absolute(`/kadrajin-otesi/${post.slug}`) })),
  ];
}
