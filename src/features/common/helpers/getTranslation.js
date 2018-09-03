import languages from "../../../i18n";

export default function getTranslation(key, lang = "eng") {
  const foundLanguage = languages.find(language => language.language === lang);
  return foundLanguage.data[key] || key;
}
