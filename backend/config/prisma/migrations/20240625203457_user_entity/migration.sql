/*
  Warnings:

  - You are about to drop the column `createdAt` on the `chartdata` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `chartdata` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `chartdata` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `chartdata` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `chartdata` DROP COLUMN `createdAt`,
    DROP COLUMN `endDate`,
    DROP COLUMN `startDate`,
    DROP COLUMN `type`,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
