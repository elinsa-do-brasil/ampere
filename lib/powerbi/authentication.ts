// Power BI Authentication using MSAL with Service Principal
// Based on Microsoft's App Owns Data sample

import { ConfidentialClientApplication } from "@azure/msal-node";
import type { PowerBIConfig } from "./types";

/**
 * Get Power BI configuration from environment variables
 */
export function getConfig(): PowerBIConfig {
  const tenantId = process.env.PANORAMAS_TENANT_ID;
  const clientId = process.env.PANORAMAS_CLIENT_ID;
  const clientSecret = process.env.PANORAMAS_CLIENT_SECRET;
  const workspaceId = process.env.POWERBI_WORKSPACE_ID;

  if (!tenantId || !clientId || !clientSecret || !workspaceId) {
    throw new Error(
      "Missing required Power BI environment variables: PANORAMAS_TENANT_ID, PANORAMAS_CLIENT_ID, PANORAMAS_CLIENT_SECRET, POWERBI_WORKSPACE_ID"
    );
  }

  return {
    tenantId,
    clientId,
    clientSecret,
    workspaceId,
    authorityUrl: "https://login.microsoftonline.com/",
    scopeBase: "https://analysis.windows.net/powerbi/api/.default",
  };
}

/**
 * Get access token for Power BI API using Service Principal authentication
 */
export async function getAccessToken(): Promise<string> {
  const config = getConfig();

  const msalConfig = {
    auth: {
      clientId: config.clientId,
      authority: `${config.authorityUrl}${config.tenantId}`,
      clientSecret: config.clientSecret,
    },
  };

  const clientApplication = new ConfidentialClientApplication(msalConfig);

  const clientCredentialRequest = {
    scopes: [config.scopeBase],
  };

  const response = await clientApplication.acquireTokenByClientCredential(
    clientCredentialRequest
  );

  if (!response || !response.accessToken) {
    throw new Error("Failed to acquire access token from Azure AD");
  }

  return response.accessToken;
}
