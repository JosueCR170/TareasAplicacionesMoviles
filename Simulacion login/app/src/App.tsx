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
import { ellipse, square, triangle, exit, home,key, storefront, search } from "ionicons/icons";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import Home from "./pages/home";
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
import Login from "./pages/login";
import AccesoRestringido from "./pages/accesoRestringido";
import { useAuth } from "./context/AuthContext";

setupIonicReact();

const App: React.FC = () => {
  // const [user, setuser] = useState<userData | undefined>();
  const { user, logout } = useAuth();

  // const userLogin = (user: userData) => {
  //   setuser(user);
  // };

  return (
    <IonApp>
      <IonReactRouter>
        {!user ? (
          <IonRouterOutlet>
            <Route exact path="/login">
              {/* <Login login={userLogin} /> */}
              <Login></Login>
            </Route>
            <Redirect to="/login" />
          </IonRouterOutlet>
        ) : (
          <IonTabs>
            <IonRouterOutlet>
              <Redirect to="/home" />

              <Route exact path="/home">
                <Home />
              </Route>

              <Route exact path="/accesoRestringido">
                <AccesoRestringido />
              </Route>

              <Route exact path="/tab1">
                <Tab1 />
              </Route>

              <Route exact path="/tab2">
                <Tab2 />
              </Route>
              <Route path="/tab3">
                <Tab3 />
              </Route>

              <Seguridad
                rolPermitido={["admin"]}
                // user={user}
                path={"/seguridad"}
                component={Tab3}
              />
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/home">
                <IonIcon aria-hidden="true" icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>

              <IonTabButton tab="tab2" href="/tab2">
                <IonIcon aria-hidden="true" icon={storefront} />
                <IonLabel>Tab 2</IonLabel>
              </IonTabButton>

              <IonTabButton tab="seguridad" href="/seguridad">
                <IonIcon aria-hidden="true" icon={key} />
                <IonLabel>Seguridad</IonLabel>
              </IonTabButton>

              <IonTabButton tab="logout" onClick={() => logout()}>
                <IonIcon aria-hidden="true" icon={exit} />
                <IonLabel>Logout</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      </IonReactRouter>
    </IonApp>
  );
};
export default App;
