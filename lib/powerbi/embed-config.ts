// Power BI Embed Configuration Service
// Generates embed tokens and URLs for Power BI reports

import { getAccessToken, getConfig } from "./authentication";
import type { EmbedInfo, PowerBIReportDetails, EmbedToken } from "./types";

/**
 * Get embed info for a specific Power BI report
 */
export async function getEmbedInfo(reportId: string): Promise<EmbedInfo> {
  const config = getConfig();

  // Get report details and embed token
  const embedParams = await getEmbedParamsForReport(
    config.workspaceId,
    reportId
  );

  return {
    accessToken: embedParams.embedToken.token,
    embedUrl: embedParams.reportDetails.embedUrl,
    expiry: embedParams.embedToken.expiration,
    reportId: embedParams.reportDetails.reportId,
  };
}

/**
 * Get embed parameters for a single report
 */
async function getEmbedParamsForReport(
  workspaceId: string,
  reportId: string
): Promise<{
  reportDetails: PowerBIReportDetails;
  embedToken: EmbedToken;
}> {
  const reportInGroupApi = `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}`;
  const headers = await getRequestHeader();

  // Get report info from Power BI API
  const result = await fetch(reportInGroupApi, {
    method: "GET",
    headers,
  });

  if (!result.ok) {
    const errorText = await result.text();
    throw new Error(
      `Failed to get report info: ${result.status} ${result.statusText} - ${errorText}`
    );
  }

  const resultJson = await result.json();

  // Create report details
  const reportDetails: PowerBIReportDetails = {
    reportId: resultJson.id,
    reportName: resultJson.name,
    embedUrl: resultJson.embedUrl,
  };

  // Get embed token
  const embedToken = await getEmbedTokenForReport(
    reportId,
    [resultJson.datasetId],
    workspaceId
  );

  return { reportDetails, embedToken };
}

/**
 * Get embed token for a single report
 */
async function getEmbedTokenForReport(
  reportId: string,
  datasetIds: string[],
  workspaceId: string
): Promise<EmbedToken> {
  // Build request body
  const formData = {
    reports: [{ id: reportId }],
    datasets: datasetIds.map((id) => ({ id })),
    targetWorkspaces: [{ id: workspaceId }],
  };

  const embedTokenApi = "https://api.powerbi.com/v1.0/myorg/GenerateToken";
  const headers = await getRequestHeader();

  // Generate embed token
  const result = await fetch(embedTokenApi, {
    method: "POST",
    headers,
    body: JSON.stringify(formData),
  });

  if (!result.ok) {
    const errorText = await result.text();
    throw new Error(
      `Failed to generate embed token: ${result.status} ${result.statusText} - ${errorText}`
    );
  }

  return result.json();
}

/**
 * Get request headers with Bearer token
 */
async function getRequestHeader(): Promise<Record<string, string>> {
  const accessToken = await getAccessToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
}
