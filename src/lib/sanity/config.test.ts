describe("Sanity Configuration Sanitization", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should strip double quotes, single quotes, and whitespace from projectId", () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = ' "my-project-id" ';

    // Require config secara dinamis agar membaca env terbaru
    const { SANITY_CONFIG: dynamicConfig } = require("./config");
    expect(dynamicConfig.projectId).toBe("my-project-id");
  });

  it("should fallback to mock-project-id if projectId is empty or invalid format", () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "invalid_project_id_with_@_special_char";

    const { SANITY_CONFIG: dynamicConfig } = require("./config");
    expect(dynamicConfig.projectId).toBe("mock-project-id");
  });

  it("should accept valid projectId formats (a-z, 0-9 and dashes)", () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "project-123-abc";

    const { SANITY_CONFIG: dynamicConfig } = require("./config");
    expect(dynamicConfig.projectId).toBe("project-123-abc");
  });
});
