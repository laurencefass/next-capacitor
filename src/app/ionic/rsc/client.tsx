'use client'

import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";

export default function Content({ children }: { children: React.ReactNode }) {
    return <>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton>Another Button</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            {children}
        </IonContent>
    </>
}