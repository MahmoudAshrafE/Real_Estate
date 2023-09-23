import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from '@auth0/auth0-react';
import { UserDetailsProvider } from "./contexts/userDeatilesContext";
import { FilterProvider } from "./contexts/filterContext";
import { api_url, app_url, client_id, domain_auth } from "./config/api";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider 
    domain={domain_auth}
    clientId={client_id}
    authorizationParams={{
    redirect_uri: app_url
    }}
    audience={api_url}
    scope="openid profile email"
    >

    <UserDetailsProvider>
    <FilterProvider>
    <App />
    </FilterProvider>
    </UserDetailsProvider>
    
    </Auth0Provider>
  </React.StrictMode>
);
