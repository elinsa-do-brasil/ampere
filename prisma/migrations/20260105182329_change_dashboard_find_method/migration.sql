/*
  Warnings:

  - You are about to drop the column `iframeUrl` on the `dashboard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "dashboard" DROP COLUMN "iframeUrl",
ADD COLUMN     "reportId" TEXT NOT NULL DEFAULT 'teste';
