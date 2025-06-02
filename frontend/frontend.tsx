import { createRoot } from "react-dom/client";
import { App } from "./src/app.tsx";

document.addEventListener("DOMContentLoaded", () => {
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
});