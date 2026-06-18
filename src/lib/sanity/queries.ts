import { groq } from "next-sanity";

// Query untuk mengambil artikel blog / insight valas
export const ALL_POSTS_QUERY = groq`
  *[_type == "blogPost" && publishedAt < now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author-> {
      name,
      image
    }
  }
`;

// Query untuk detail satu artikel blog berdasarkan slug
export const POST_DETAIL_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    body,
    mainImage,
    publishedAt,
    author-> {
      name,
      image
    },
    metaTitle,
    metaDescription
  }
`;

// Query untuk mengambil testimonial dari Sanity
export const ALL_TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && active == true] | order(orderRank asc) {
    _id,
    name,
    role,
    company,
    content,
    rating
  }
`;

// Query untuk mengambil daftar gerai cabang dari Sanity
export const ALL_BRANCHES_QUERY = groq`
  *[_type == "branch" && active == true] | order(orderRank asc) {
    _id,
    name,
    address,
    phone,
    whatsapp,
    mapsUrl,
    mapsEmbedUrl,
    openingHours
  }
`;
