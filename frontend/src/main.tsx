import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme accentColor="iris" grayColor="mauve" radius="large" scaling="100%">
      <App />
    </Theme>
  </StrictMode>
);
