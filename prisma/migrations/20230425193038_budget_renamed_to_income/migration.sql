/*
  Warnings:

  - You are about to drop the column `budget` on the `MonthData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MonthData" DROP COLUMN "budget",
ADD COLUMN     "income" DOUBLE PRECISION NOT NULL DEFAULT 0;
