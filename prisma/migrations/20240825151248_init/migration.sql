/*
  Warnings:

  - You are about to drop the `station` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "station";

-- CreateTable
CREATE TABLE "Station" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "line" INTEGER NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);
