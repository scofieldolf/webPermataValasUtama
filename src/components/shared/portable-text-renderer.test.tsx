import React from "react";
import { render, screen } from "@testing-library/react";

// Mock next/image agar me-render tag img standar tanpa atribut non-HTML
jest.mock("next/image", () => {
  return {
    __esModule: true,
    default: ({ src, alt, fill, sizes, ...props }: any) => {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} {...props} />;
    },
  };
});

// Mock next-sanity dan client
jest.mock("next-sanity", () => ({
  createClient: jest.fn(),
  groq: (strings: TemplateStringsArray, ...values: any[]) => String.raw({ raw: strings }, ...values),
}));

jest.mock("@/lib/sanity/client", () => ({
  client: {},
  urlFor: () => ({
    url: () => "http://mock-image-url.com",
  }),
}));

// Mock @portabletext/react
jest.mock("@portabletext/react", () => {
  return {
    PortableText: ({ value, components }: any) => {
      return (
        <div>
          {value.map((block: any, idx: number) => {
            if (block._type === "block") {
              if (block.style === "h2") {
                const H2 = components.block.h2;
                return <H2 key={idx}>{block.children[0].text}</H2>;
              }

              if (block.style === "h3") {
                const H3 = components.block.h3;
                return <H3 key={idx}>{block.children[0].text}</H3>;
              }

              if (block.style === "blockquote") {
                const Blockquote = components.block.blockquote;
                return <Blockquote key={idx}>{block.children[0].text}</Blockquote>;
              }

              if (block.listItem === "bullet") {
                const BulletComponent = components.listItem.bullet;
                return <BulletComponent key={idx}>{block.children[0].text}</BulletComponent>;
              }

              if (block.listItem === "number") {
                const NumberComponent = components.listItem.number;
                return <NumberComponent key={idx}>{block.children[0].text}</NumberComponent>;
              }

              // Normal text rendering with marks mapping
              const Normal = components.block.normal;
              return (
                <Normal key={idx}>
                  {block.children.map((c: any, cIdx: number) => {
                    let text = c.text;
                    if (c.marks && c.marks.includes("strong")) {
                      const Strong = components.marks.strong;
                      text = <Strong key={cIdx}>{text}</Strong>;
                    }
                    if (c.marks && c.marks.includes("em")) {
                      const Em = components.marks.em;
                      text = <Em key={cIdx}>{text}</Em>;
                    }
                    // Handle link mark if present
                    if (block.markDefs) {
                      const linkDef = block.markDefs.find((d: any) => c.marks?.includes(d._key));
                      if (linkDef) {
                        const LinkComponent = components.marks.link;
                        return (
                          <LinkComponent key={cIdx} value={linkDef}>
                            {text}
                          </LinkComponent>
                        );
                      }
                    }
                    return <React.Fragment key={cIdx}>{text}</React.Fragment>;
                  })}
                </Normal>
              );
            }

            if (block._type === "image") {
              const ImageComponent = components.types.image;
              return <ImageComponent key={idx} value={block} />;
            }
            return null;
          })}
        </div>
      );
    },
  };
});

import { PortableTextRenderer } from "./portable-text-renderer";

describe("PortableTextRenderer", () => {
  it("should render normal paragraphs correctly", () => {
    const value = [
      {
        _type: "block",
        _key: "block-1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span-1",
            text: "Ini adalah paragraf berita valas.",
            marks: [],
          },
        ],
      },
    ];

    render(<PortableTextRenderer value={value} />);
    const paragraph = screen.getByText("Ini adalah paragraf berita valas.");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe("P");
    expect(paragraph).toHaveClass("text-xs", "sm:text-sm", "text-gray-600");
  });

  it("should render h2 and h3 headings with correct styling", () => {
    const value = [
      {
        _type: "block",
        _key: "block-2",
        style: "h2",
        children: [{ _type: "span", text: "Judul Seksi H2" }],
      },
      {
        _type: "block",
        _key: "block-3",
        style: "h3",
        children: [{ _type: "span", text: "Subjudul H3" }],
      },
    ];

    render(<PortableTextRenderer value={value} />);
    const h2 = screen.getByText("Judul Seksi H2");
    expect(h2).toBeInTheDocument();
    expect(h2.tagName).toBe("H2");
    expect(h2).toHaveClass("font-serif", "text-pv-navy-deep");

    const h3 = screen.getByText("Subjudul H3");
    expect(h3).toBeInTheDocument();
    expect(h3.tagName).toBe("H3");
    expect(h3).toHaveClass("font-serif", "text-pv-navy-deep");
  });

  it("should render blockquotes correctly", () => {
    const value = [
      {
        _type: "block",
        _key: "block-4",
        style: "blockquote",
        children: [{ _type: "span", text: "Kutipan Berita" }],
      },
    ];

    render(<PortableTextRenderer value={value} />);
    const blockquote = screen.getByText("Kutipan Berita");
    expect(blockquote).toBeInTheDocument();
    expect(blockquote.tagName).toBe("BLOCKQUOTE");
    expect(blockquote).toHaveClass("border-l-4", "border-pv-gold-primary");
  });

  it("should render bullet and number lists correctly", () => {
    const value = [
      {
        _type: "block",
        _key: "block-5",
        style: "normal",
        listItem: "bullet",
        level: 1,
        children: [{ _type: "span", text: "Item Bullet" }],
      },
      {
        _type: "block",
        _key: "block-6",
        style: "normal",
        listItem: "number",
        level: 1,
        children: [{ _type: "span", text: "Item Number" }],
      },
    ];

    render(<PortableTextRenderer value={value} />);
    const bullet = screen.getByText("Item Bullet");
    expect(bullet).toBeInTheDocument();
    expect(bullet.tagName).toBe("LI");

    const number = screen.getByText("Item Number");
    expect(number).toBeInTheDocument();
    expect(number.tagName).toBe("LI");
  });

  it("should render images correctly with all branches covered", () => {
    const value = [
      {
        _type: "image",
        _key: "block-7",
        asset: {
          _ref: "image-123",
          _type: "reference",
        },
        alt: "Deskripsi Gambar",
      },
      // Image without alt
      {
        _type: "image",
        _key: "block-7-no-alt",
        asset: {
          _ref: "image-456",
          _type: "reference",
        },
      },
      // Invalid image (no asset ref) - should render null
      {
        _type: "image",
        _key: "block-7-invalid",
      },
    ];

    render(<PortableTextRenderer value={value} />);
    const imgText = screen.getByText("Deskripsi Gambar");
    expect(imgText).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(2);
    expect(images[0]).toHaveAttribute("src", "http://mock-image-url.com");
    expect(images[1]).toHaveAttribute("alt", "Gambar artikel"); // Fallback alt text
  });

  it("should render links and styled text inside blocks correctly", () => {
    const value = [
      {
        _type: "block",
        _key: "block-8",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Kunjungi website ",
            marks: [],
          },
          {
            _type: "span",
            text: "resmi kami",
            marks: ["link-key"],
          },
          {
            _type: "span",
            text: " dan baca juga link kosong",
            marks: ["link-empty"],
          },
          {
            _type: "span",
            text: " tebal",
            marks: ["strong"],
          },
          {
            _type: "span",
            text: " miring",
            marks: ["em"],
          },
        ],
        markDefs: [
          {
            _type: "link",
            _key: "link-key",
            href: "https://permata-valas.com",
          },
          {
            _type: "link",
            _key: "link-empty",
          },
        ],
      },
    ];

    render(<PortableTextRenderer value={value} />);
    const linkElement1 = screen.getByRole("link", { name: "resmi kami" });
    expect(linkElement1).toBeInTheDocument();
    expect(linkElement1).toHaveAttribute("href", "https://permata-valas.com");

    const linkElement2 = screen.getByRole("link", { name: "dan baca juga link kosong" });
    expect(linkElement2).toBeInTheDocument();
    expect(linkElement2).toHaveAttribute("href", "#"); // Fallback href
  });

  it("should return null for empty/invalid values", () => {
    const { container: container1 } = render(<PortableTextRenderer value={null as any} />);
    expect(container1.firstChild).toBeNull();

    const { container: container2 } = render(<PortableTextRenderer value={"invalid" as any} />);
    expect(container2.firstChild).toBeNull();
  });
});
