'use client'

import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { MyModal } from "./Modal";

export default function Page() {
    return <>
        <h1>NextJS Ionic Integration</h1>
        <p>This platform correctly integrates NextJS and Ionic to provide a mobile first framework with native components</p>
        <p>Unlike all other solutions on the internet it doesnt involve any hacks, additional depdencies, or workarounds</p>
        <p>At the time of writing the only starters available on the internet use Next only for initial App load and then delegate to the React router</p>
        <h1>Resources</h1>
        <ul>
            <li><a href="https://github.com/UretzkyZvi/nextjs-typescript-tailwind-ionic-starter">this Next ionic starter</a> loads a react-router and overrides Next routing completely</li>
            <li><a href="https://github.com/mlynch/nextjs-tailwind-ionic-capacitor-starter">this one</a> also loads react router and forces client rendering across the entire app</li>
            <li><a href="https://capgo.app/blog/building-a-native-mobile-app-with-nextjs-and-capacitor">this article</a> explains how to use Next and Capacitor and claims that Ionic is hacky, but it works fine</li>
            <li><a href="https://galaxies.dev/nextjs-and-capacitor">this article</a> explains how to use Next (pages folder - not apps), Capacitor and Ionic with the use of third party depdencies and claims the need to turn of SSR</li>
        </ul>
        <MyModal />
    </>
}