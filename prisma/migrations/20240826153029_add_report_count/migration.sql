-- AlterTable
ALTER TABLE "Pruno" ADD COLUMN     "reportCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "pruneId" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_pruneId_fkey" FOREIGN KEY ("pruneId") REFERENCES "Pruno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
