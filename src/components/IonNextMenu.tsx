import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonListHeader, IonMenuToggle, IonItem } from '@ionic/react';
import Link from 'next/link';

const menuItems = [
  { href: '/', text: 'Home' },
  { href: '/ionic', text: 'Ionic Home' },
  { href: '/3d/space', text: '3d demo' },
  { href: '/ionic/about', text: 'About' },
  { href: '/ionic/contact', text: 'Contact' },
  { href: '/ionic/rsc', text: 'Server Component' }
];

export const IonNextMenu: React.FC = () => {
  const menuRef = useRef<HTMLIonMenuElement>(null);

  const closeMenu = () => {
    console.log("closeMenu");
    if (menuRef.current) {
      menuRef.current.close();
    }
  };

  return <IonMenu type="overlay" side="start" contentId="main-content" ref={menuRef}>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Ionic Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <div className="list">
        <h1>Ionic menu</h1>
        <IonList id="labels-list">
          <IonListHeader>Routes</IonListHeader>
          {menuItems.map((item, index) => <>
            <IonItem>
              <Link key={index} href={item.href} onClick={closeMenu}>{item.text}</Link>
            </IonItem>        </>)}
          <IonItem>
            <IonMenuToggle>
              <IonButton expand="block">Click to close the menu</IonButton>
            </IonMenuToggle>
          </IonItem>
        </IonList>
      </div>
    </IonContent>
  </IonMenu>
};

export default IonNextMenu;
