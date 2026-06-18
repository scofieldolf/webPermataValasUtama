const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Path ke aplikasi Next.js Anda untuk memuat next.config.js dan .env
  dir: "./",
});

// Konfigurasi Jest kustom
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    // Tangani alias path Next.js (@/* ke src/*)
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  collectCoverage: true,
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/tests/e2e/",
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/src/lib/sanity/", // CMS queries tidak perlu di-unit test langsung
  ],
};

module.exports = createJestConfig(customJestConfig);
