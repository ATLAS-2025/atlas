import { readFile, mkdirSync, writeFile } from "fs";
import { resolve, dirname } from "path";

const translationFilePath = resolve("./locales/en/translation.json");
const outputPath = resolve("./generated/types.d.ts");
const outputPath2 = resolve("./generated/namespaces.ts");
function generateNamespaceTranslationKeys(obj, parent = "", result = {}) {
  const stringKeys = [];

  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "string") {
      stringKeys.push(key);
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      generateNamespaceTranslationKeys(
        value,
        parent ? `${parent}.${key}` : key,
        result
      );
    }
  }

  if (stringKeys.length > 0) {
    result[parent] = stringKeys;
  }

  return result;
}

function generateTranslationKeys(obj, currentPath = "") {
  let keys = [];
  for (const key in obj) {
    const newPath = currentPath ? `${currentPath}.${key}` : key;
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      keys = keys.concat(generateTranslationKeys(obj[key], newPath));
    } else {
      keys.push(newPath);
    }
  }
  return keys;
}

function generateNamespaces(obj, parent = [], namespaces = new Set()) {
  const currentPath = parent.join(".");

  if (
    currentPath &&
    Object.values(obj).every(
      value =>
        typeof value === "object" && value !== null && !Array.isArray(value)
    )
  ) {
    namespaces.add(currentPath);
  }

  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      generateNamespaces(value, [...parent, key], namespaces);
    }
  }

  return namespaces;
}

readFile(translationFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("❌ Error reading translation file:", err);
    return;
  }

  try {
    const translation = JSON.parse(data);

    const topLevelNamespaces = Object.keys(translation); // ✅ dynamic
    const allTranslationKeys = generateTranslationKeys(translation);
    const groupedKeys = generateNamespaceTranslationKeys(translation);
    const allNamespaces = Object.keys(groupedKeys);

    const namespaceTranslationKeys = `export type TNamespaceTranslationKeys = {\n${Object.entries(
      groupedKeys
    )
      .map(
        ([ns, keys]) =>
          `  '${ns}':\n    | ${keys.map(k => `"${k}"`).join("\n    | ")};`
      )
      .join("\n")}\n}`;
    const translationKeysType = `export type TAllTranslationKeys =\n  | ${allTranslationKeys.map(key => `'${key}'`).join("\n  | ")};`;

    const namespaceType = `export type TNamespace =\n  | ${allNamespaces.map(ns => `'${ns}'`).join("\n  | ")};`;

    const content = `/* eslint-disable */
// This file is auto-generated.
// Do not edit manually.


${namespaceTranslationKeys}

${namespaceType}

${translationKeysType}

`;

    const namespaceConst = `export const NAMESPACES = [${allNamespaces.map((ns, i) => `'${ns}'${i == allNamespaces.length - 1 ? "" : ","}`).join("\n")}];`;

    // Ensure output directory exists
    mkdirSync(dirname(outputPath), { recursive: true });
    mkdirSync(dirname(outputPath2), { recursive: true });

    writeFile(outputPath, content, err => {
      if (err) {
        console.error("❌ Error writing types file:", err);
        return;
      }
      console.log("✅ i18n types generated successfully at:", outputPath);
    });
    writeFile(outputPath2, namespaceConst, err => {
      if (err) {
        console.error("❌ Error writing types file:", err);
        return;
      }
      console.log("✅ i18n types generated successfully at:", outputPath);
    });
  } catch (parseError) {
    console.error("❌ Error parsing JSON:", parseError);
  }
});
