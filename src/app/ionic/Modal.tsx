import React, { useState, useRef } from 'react';
import {
    IonButtons,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonItem,
    IonInput,
} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';

import "./styles.css"

export function MyModal() {
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

    const [message, setMessage] = useState(
        'This modal example uses triggers to automatically open a modal when the button is clicked.'
    );

    function confirm() {
        modal.current?.dismiss(input.current?.value, 'confirm');
    }

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            setMessage(`Hello, ${ev.detail.data}!`);
        }
    }

    return (
        <IonContent className="ion-padding">
            <div className="bordered">
                <h1>Test Modal Dialog</h1>
                Testing modals work... Tap the button in the toolbar to open the menu.
                <p>{message}</p>
                <IonButton id="open-modal">
                    Open Modal Dialog
                </IonButton>
                <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                            </IonButtons>
                            <IonTitle>Welcome</IonTitle>
                            <IonButtons slot="end">
                                <IonButton strong={true} onClick={() => confirm()}>
                                    Confirm
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <IonItem>
                            <IonInput
                                label="Enter your name"
                                labelPlacement="stacked"
                                ref={input}
                                type="text"
                                placeholder="Your name"
                            />
                        </IonItem>
                    </IonContent>
                </IonModal>
            </div>
        </IonContent>
    );
}