import { hydrate } from "inferno-hydrate";
import { BrowserRouter } from "inferno-router";
import { App } from "../shared/components/app";
import { getLanguageFromCookie, initI18n } from "../shared/i18next";

async function startClient() {
  // Setting the language for js browsers
  // If query param is set, server updates cookie automatically,
  // so no need to check the query here
  const languageCookie = getLanguageFromCookie(document.cookie);
  const i18n = await initI18n();

  if (languageCookie !== undefined) {
    await i18n.changeLanguage(languageCookie);
  } else {
    await i18n.changeLanguage(navigator.language);
  }

  const wrapper = (
    <BrowserRouter>
      <App i18n={i18n} />
    </BrowserRouter>
  );

  const root = document.getElementById("root");

  if (root) {
    hydrate(wrapper, root);
  }
}

await startClient();
