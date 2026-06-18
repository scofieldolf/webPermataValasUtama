import { defineCliConfig } from "sanity/cli";
import { SANITY_CONFIG } from "./sanity/config";

export default defineCliConfig({
  api: SANITY_CONFIG,
});
