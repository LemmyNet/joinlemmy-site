import fs from "fs";
import path from "path";

const translationDir = "joinlemmy-translations/translations/";
const outDir = "src/shared/translations/";
const translatorsJsonFile = "lemmy-translations/translators.json";
const newsDir = "src/assets/news";

fs.mkdirSync(outDir, { recursive: true });

// Write the news file
try {
  let files = fs.readdirSync(newsDir);
  let data = `export const news_md = \n `;
  let arr = [];
  for (let file of files) {
    let p = `${newsDir}/${file}`;
    const title = path.parse(file).name;
    const markdown = fs.readFileSync(p, "utf8");
    let val = { title: title, markdown: markdown };
    arr.push(val);
  }
  data += JSON.stringify(arr, null, 2) + ";\n";
  const target = outDir + "news.ts";
  fs.writeFileSync(target, data);
} catch (err) {
  console.error(err);
}

// Write the translations
fs.readdir(translationDir, (_err, files) => {
  files.forEach(filename => {
    const lang = filename.split(".")[0];
    try {
      const json = JSON.parse(
        fs.readFileSync(translationDir + filename, "utf8")
      );
      let data = `export const ${lang} = {\n  translation: {`;
      for (const key in json) {
        if (key in json) {
          const value = json[key].replace(/"/g, '\\"');
          data += `\n    ${key}: "${value}",`;
        }
      }
      data += "\n  },\n};";
      const target = outDir + lang + ".ts";
      fs.writeFileSync(target, data);
    } catch (err) {
      console.error(err);
    }
  });
  // Add the translators.json file
  try {
    const json = JSON.parse(fs.readFileSync(translatorsJsonFile, "utf8"));
    let data = `export const translators = \n `;
    data += JSON.stringify(json, null, 2) + ";";
    const target = outDir + "translators.ts";
    fs.writeFileSync(target, data);
  } catch (err) {
    console.error(err);
  }
});

// generate types for i18n keys
const baseLanguage = "en";

fs.readFile(`${translationDir}${baseLanguage}.json`, "utf8", (_, fileStr) => {
  const keys = Object.keys(JSON.parse(fileStr));

  const data = `import { i18n } from "i18next";

declare module "i18next" {
  export type I18nKeys =
${keys.map(key => `    | "${key}"`).join("\n")};

  export interface TFunctionTyped {
    // basic usage
    <
      TResult extends TFunctionResult = string,
      TInterpolationMap extends Record<string, unknown> = StringMap
    >(
      key: I18nKeys | I18nKeys[],
      options?: TOptions<TInterpolationMap> | string
    ): TResult;
    // overloaded usage
    <
      TResult extends TFunctionResult = string,
      TInterpolationMap extends Record<string, unknown> = StringMap
    >(
      key: I18nKeys | I18nKeys[],
      defaultValue?: string,
      options?: TOptions<TInterpolationMap> | string
    ): TResult;
  }

  export interface i18nTyped extends i18n {
    t: TFunctionTyped;
  }
}
`;

  fs.writeFileSync(`${outDir}i18next.d.ts`, data);
});
