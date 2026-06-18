import type { SchemaTypeDefinition } from "sanity";
import { blogPost } from "./schemas/blogPost";
import { author } from "./schemas/author";
import { blockContent } from "./schemas/blockContent";
import { cabang } from "./schemas/cabang";
import { testimonial } from "./schemas/testimonial";
import { siteConfig } from "./schemas/siteConfig";

export const schema: SchemaTypeDefinition[] = [
  blogPost,
  author,
  blockContent,
  cabang,
  testimonial,
  siteConfig,
];
