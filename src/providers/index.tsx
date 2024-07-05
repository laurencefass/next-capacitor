'use client'

import { IonApp, IonButton, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { setupIonicReact } from "@ionic/react";
import { IonNextMenu } from "../components/IonNextMenu";
setupIonicReact({});

import "./providers.css"

export function IonAppProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <>
    {isClient && <IonApp key={Math.random()}>
      <IonNextMenu />
      <IonPage>
        <IonHeader>
          <IonToolbar className="custom-toolbar">
            <IonTitle>Syntapse Next and Ionic integration</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent id="main-content" className="ion-padding">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          {/* <div>Provider is correctly rendering pages</div> */}
          <div className="page">
            {children}
          </div>
          {/* <IonMenuToggle>
            <IonButton>Click to open the menu</IonButton>
          </IonMenuToggle> */}
        </IonContent >
      </IonPage>
    </IonApp>}
  </>
}