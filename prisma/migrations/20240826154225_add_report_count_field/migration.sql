/*
  Warnings:

  - You are about to drop the column `reportCount` on the `Pruno` table. All the data in the column will be lost.
  - You are about to drop the `Station` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pruneId,userId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pruno" DROP COLUMN "reportCount";

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Station";

-- CreateIndex
CREATE UNIQUE INDEX "Report_pruneId_userId_key" ON "Report"("pruneId", "userId");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
