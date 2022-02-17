import { hydrate } from "inferno-hydrate";
import { BrowserRouter } from "inferno-router";
import { App } from "../shared/components/app";
import { getLanguageFromCookie, i18n } from "../shared/i18next";

// Setting the language for js browsers
// If query param is set, server updates cookie automatically,
// so no need to check the query here
const languageCookie = getLanguageFromCookie(document.cookie);
if (languageCookie != null) {
  i18n.changeLanguage(languageCookie);
} else {
  i18n.changeLanguage(navigator.language);
}

const wrapper = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

hydrate(wrapper, document.getElementById("root"));
