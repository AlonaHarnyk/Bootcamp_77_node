import path from "node:path";
import fs from "node:fs/promises";

const filePath = path.join(process.cwd(), "folder", "test", "example1.txt");

try {
  const data = await fs.readFile(filePath, "utf-8");

  console.log(data);
} catch (error) {}

await fs.writeFile(filePath, "TEST!!!", "utf-8");
