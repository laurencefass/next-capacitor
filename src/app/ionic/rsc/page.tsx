import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import Client from "./client";

export default function Page() {
    return <>
        <Client>
            <h1>Can I use Server Components with Ionic? </h1>
            Ionic components wont render on the server because they need context.
            All Ionic components must include 'use client'
        </Client>
    </>
}