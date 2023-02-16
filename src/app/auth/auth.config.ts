import {AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://keycloak.bluntsoftware.com/auth/realms/bizvest',
  redirectUri: window.location.origin + '/callback',
  clientId: "cf-pkce",
  scope: 'openid profile email roles offline_access',
  responseType: 'code',
  showDebugInformation: false,
  logoutUrl: 'https://keycloak.bluntsoftware.com/auth/realms/bizvest/protocol/openid-connect/logout'
};
