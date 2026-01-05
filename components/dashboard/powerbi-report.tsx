"use client";

import { useEffect, useState, useRef } from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models, Report } from "powerbi-client";

interface PowerBIReportProps {
  reportId: string;
  dashboardId?: string;
  className?: string;
}

interface EmbedData {
  accessToken: string;
  embedUrl: string;
  expiry: string;
  reportId: string;
}

export function PowerBIReport({
  reportId,
  dashboardId,
  className = "w-full h-full",
}: PowerBIReportProps) {
  const [embedData, setEmbedData] = useState<EmbedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const reportRef = useRef<Report | null>(null);

  useEffect(() => {
    async function fetchEmbedToken() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/powerbi/embed-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reportId, dashboardId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to get embed token");
        }

        const data = await response.json();
        setEmbedData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchEmbedToken();
  }, [reportId, dashboardId]);

  // Set up token refresh before expiry
  useEffect(() => {
    if (!embedData?.expiry) return;

    const expiryTime = new Date(embedData.expiry).getTime();
    const currentTime = Date.now();
    // Refresh 2 minutes before expiry
    const refreshTime = expiryTime - currentTime - 2 * 60 * 1000;

    if (refreshTime > 0) {
      const timeoutId = setTimeout(async () => {
        try {
          const response = await fetch("/api/powerbi/embed-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reportId, dashboardId }),
          });

          if (response.ok) {
            const newData = await response.json();
            setEmbedData(newData);

            // Update the token in the embedded report
            if (reportRef.current) {
              await reportRef.current.setAccessToken(newData.accessToken);
            }
          }
        } catch (err) {
          console.error("Failed to refresh token:", err);
        }
      }, refreshTime);

      return () => clearTimeout(timeoutId);
    }
  }, [embedData?.expiry, reportId, dashboardId]);

  if (isLoading) {
    return (
      <div className={`${className} flex items-center justify-center bg-muted`}>
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Carregando relatório...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-destructive/10`}>
        <div className="flex flex-col items-center gap-2 p-4 text-center">
          <p className="text-sm font-medium text-destructive">
            Erro ao carregar relatório
          </p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!embedData) {
    return null;
  }

  return (
    <PowerBIEmbed
      embedConfig={{
        type: "report",
        id: embedData.reportId,
        embedUrl: embedData.embedUrl,
        accessToken: embedData.accessToken,
        tokenType: models.TokenType.Embed,
        settings: {
          panes: {
            filters: {
              expanded: false,
              visible: true,
            },
          },
        },
      }}
      eventHandlers={
        new Map([
          [
            "loaded",
            function () {
              console.log("Report loaded");
            },
          ],
          [
            "rendered",
            function () {
              console.log("Report rendered");
            },
          ],
          [
            "error",
            function (event) {
              console.error("Report error:", event?.detail);
            },
          ],
        ])
      }
      cssClassName={className}
      getEmbeddedComponent={(embeddedReport) => {
        reportRef.current = embeddedReport as Report;
      }}
    />
  );
}
