import fs from "fs";
import path from "path";

const targetDir = "./src/apiClient";

// String to replace
const before = `localVarRequestOptions.headers['Content-Type'] === 'application/json'`;
const after = `(localVarRequestOptions.headers && localVarRequestOptions.headers['Content-Type'] === 'application/json')`;

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (filePath.endsWith(".ts") || filePath.endsWith(".js")) {
      fixFile(filePath);
    }
  });
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  if (content.includes(before)) {
    const fixed = content.split(before).join(after); // <-- avoids regex
    fs.writeFileSync(filePath, fixed, "utf-8");
    console.log(`✔ Fixed: ${filePath}`);
  }
}

walkDir(targetDir);
