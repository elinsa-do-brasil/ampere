// API Route: Generate Power BI Embed Token
// POST /api/powerbi/embed-token

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/auth/actions/session";
import { getEmbedInfo } from "@/lib/powerbi";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get reportId from request body
    const body = await request.json();
    const { reportId, dashboardId } = body;

    if (!reportId) {
      return NextResponse.json(
        { error: "reportId is required" },
        { status: 400 }
      );
    }

    // If dashboardId is provided, verify user has access
    if (dashboardId) {
      const dashboard = await db.dashboard.findUnique({
        where: { id: dashboardId },
      });

      if (!dashboard) {
        return NextResponse.json(
          { error: "Dashboard not found" },
          { status: 404 }
        );
      }

      // Verify the dashboard belongs to user's active organization
      if (dashboard.organizationId !== session.session?.activeOrganizationId) {
        return NextResponse.json(
          { error: "Access denied to this dashboard" },
          { status: 403 }
        );
      }

      // Verify user has required role
      const member = await db.member.findFirst({
        where: {
          userId: session.user.id,
          organizationId: session.session.activeOrganizationId,
        },
      });

      const roleHierarchy: Record<string, number> = {
        member: 1,
        admin: 2,
        owner: 3,
      };

      const userLevel = roleHierarchy[member?.role || "member"] || 0;
      const requiredLevel = roleHierarchy[dashboard.requiredRole] || 0;

      if (userLevel < requiredLevel) {
        return NextResponse.json(
          { error: "Insufficient permissions" },
          { status: 403 }
        );
      }
    }

    // Get embed info from Power BI
    const embedInfo = await getEmbedInfo(reportId);

    return NextResponse.json({
      accessToken: embedInfo.accessToken,
      embedUrl: embedInfo.embedUrl,
      expiry: embedInfo.expiry,
      reportId: embedInfo.reportId,
    });
  } catch (error) {
    console.error("Error generating embed token:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to generate embed token",
      },
      { status: 500 }
    );
  }
}
