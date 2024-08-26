/*
  Warnings:

  - You are about to drop the `Station` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Station";

-- CreateTable
CREATE TABLE "station" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ligne" INTEGER NOT NULL,

    CONSTRAINT "station_pkey" PRIMARY KEY ("id")
);
