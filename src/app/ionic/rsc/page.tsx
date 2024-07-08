import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import Client from "./client";

export default function Page() {
    return <>
        <Client>
            <h1>Can I use Server Components with Ionic? </h1>
            <p>Presently all Ionic components must include &lsquo;use client&rsquo;</p>
            <p>There is are a couple of ongoing discussions to add support for SSR and partial page pre-rendering</p>
            <p>See <a href="https://github.com/ionic-team/stencil/issues/5831">here</a> and <a href="https://github.com/ionic-team/stencil-ds-output-targets/pull/445">here</a></p>
        </Client>
    </>
}