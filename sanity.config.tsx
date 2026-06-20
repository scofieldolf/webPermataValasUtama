import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./sanity/schema";
import { SANITY_CONFIG } from "./src/lib/sanity/config";

export default defineConfig({
  basePath: "/studio",
  ...SANITY_CONFIG,
  title: "Permata Valas CMS",
  plugins: [structureTool(), visionTool()],
  schema: { types: schema },
  studio: {
    components: {
      logo: () => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #B8860B, #F5E6A3)" }} />
          <span style={{ fontWeight: 700, fontSize: 16, color: "#042C53" }}>Permata Valas</span>
        </div>
      ),
    },
  },
});
