import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Theme } from "@radix-ui/themes"
import "@radix-ui/themes/styles.css"
import App from './App.tsx'
import Layout from "@/app/layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
	  <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
		 <div className="bg-gray-600">
	  <Layout>
		  <App />
	  </Layout>
		 </div>
    </Theme>
  </StrictMode>
);
