import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Script from "next/script";

import { IonAppProvider } from "@/providers";

import { Provider } from 'react-redux';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import "./globals.scss";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

import '@ionic/react/css/palettes/dark.always.css';
import { Providers } from "@/store/providers";
//  import '@ionic/react/css/palettes/dark.class.css'; 
// import '@ionic/react/css/palettes/dark.system.css';
const inter = Inter({ subsets: ["latin"] });

const url = process.env.NODE_ENV === "development" ? "https://nextcap.syntapse.co.uk" : "https://capacitor.syntapse.co.uk";

export const metadata: Metadata = {
  title: 'Syntapse Maplio 1.0',
  description: 'Syntapse Next 14 powered interactive maps',
  openGraph: {
    type: "website",
    url: url,
    title: "Syntapse Capacitor",
    description: 'Syntapse, Next14 & Capacitor - single codebase development for web, IOS and Android',
    siteName: url,
    images: [{
      url: `${url}/capacitor-seo.png`,
      width: 800,
      height: 600,
      type: 'image/png',
    }],
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialState;

  return (
    <html lang="en">
      <body>
        <Providers initialState={initialState}>
          <IonAppProvider>
            {children}
          </IonAppProvider>
        </Providers>
      </body>
      <Script
        type="module"
        src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.esm.js"
        strategy="lazyOnload"
      />
      <Script
        noModule
        src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.js"
        strategy="lazyOnload"
      />
    </html>
  );
}
