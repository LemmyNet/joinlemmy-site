import { hydrate } from "inferno-hydrate";
import { BrowserRouter } from "inferno-router";
import { App } from "../shared/components/app";

const wrapper = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

hydrate(wrapper, document.getElementById("root"));
