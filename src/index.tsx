import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";

let container = document.getElementById("app")!;
let root = createRoot(container);
root.render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
