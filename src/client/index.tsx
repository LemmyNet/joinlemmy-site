import { hydrate } from "inferno-hydrate";
import { BrowserRouter } from "inferno-router";
import { App } from "../shared/components/app";
import { i18n } from "../shared/i18next";

// Setting the language for js browsers
i18n.changeLanguage(navigator.language);

const wrapper = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

hydrate(wrapper, document.getElementById("root"));
