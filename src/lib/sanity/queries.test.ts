jest.mock("next-sanity", () => ({
  groq: (strings: TemplateStringsArray, ...values: any[]) => String.raw({ raw: strings }, ...values),
}));

import { ALL_POSTS_QUERY, POST_DETAIL_QUERY } from "./queries";

describe("Sanity Queries", () => {
  it("should query blogPost type instead of post type in ALL_POSTS_QUERY", () => {
    expect(ALL_POSTS_QUERY).toContain('_type == "blogPost"');
  });

  it("should query blogPost type instead of post type in POST_DETAIL_QUERY", () => {
    expect(POST_DETAIL_QUERY).toContain('_type == "blogPost"');
  });
});
