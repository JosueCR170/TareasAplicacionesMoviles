import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  ellipse,
  square,
  triangle,
  exit,
  home,
  key,
  storefront,
  search,
  atCircle,
} from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import Home from "./pages/home";
import Tab4 from "./pages/Tab4";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/high-contrast.system.css";

/* Theme variables */
import "./theme/variables.css";
import Seguridad from "./Router/seguridad";
import { use, useState } from "react";
// import Login from "./pages/login";
import LoginEmailAndPassword from "./components/firebase/loginEmailAndPassword/loginEmailAndPassword";
import HandleGoogleSignIn from "./components/firebase/authenticationGoogle/authenticationGoogle";
import RegisterPage from "./pages/register/register";
import Logout from "./components/firebase/logout";
import AccesoRestringido from "./pages/accesoRestringido";
import { useAuth } from "./context/AuthContext";

setupIonicReact();

const App: React.FC = () => {
  // const [user, setuser] = useState<userData | undefined>();
  const { user, userData } = useAuth();
  const rolPermitido: Array<"ADMIN" | "USER"> = ["ADMIN"];

  // const userLogin = (user: userData) => {
  //   setuser(user);
  // };

  return (
    <IonApp>
      <IonReactRouter>
        {!user || !userData ? (
          <IonRouterOutlet>
            <Route exact path="/login">
              <LoginEmailAndPassword />
            </Route>

            <Route exact path="/register">
              <RegisterPage />
            </Route>

            <Redirect to="/login" />
          </IonRouterOutlet>
        ) : (
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>

              <Route exact path="/tab1">
                <Tab1 />
              </Route>

              <Route exact path="/tab2">
                <Tab2 />
              </Route>

              <Route exact path="/tab3">
                <Tab3 />
              </Route>

              <Route exact path="/tab4">
                <Tab4 />
              </Route>

              <Route exact path="/accesoRestringido">
                <AccesoRestringido />
              </Route>

              <Seguridad
                rolPermitido={rolPermitido}
                // user={user}
                path={"/seguridad"}
                component={Tab3}
              />

              <Redirect to="/home" />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
            {/* Debugging userData */}
            {(() => {
              console.log("userData:", userData);
              console.log(rolPermitido)
              return null;
            })()}
            
              <IonTabButton tab="home" href="/home">
                <IonIcon aria-hidden="true" icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon aria-hidden="true" icon={storefront} />
                <IonLabel>Tab 2</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab4" href="/tab4">
                <IonIcon aria-hidden="true" icon={square} />
                <IonLabel>Tab 4</IonLabel>
              </IonTabButton>

              {rolPermitido.includes(userData.rol) && (
                <IonTabButton tab="seguridad" href="/seguridad">
                  <IonIcon aria-hidden="true" icon={key} />
                  <IonLabel>Seguridad</IonLabel>
                </IonTabButton>
              )}

              {/* <Logout /> */}

              <IonTabButton tab="logout" href="/login">
                <Logout />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      </IonReactRouter>
    </IonApp>
  );
};
export default App;
