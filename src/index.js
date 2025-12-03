import path from "node:path";
const filePath = path.join(process.cwd(), "folder", "test", "test.txt");
console.log(123, filePath);

const filePath1 = path.resolve("folder", "test", "test.txt");
console.log(456, filePath1);
