/*
  Warnings:

  - You are about to drop the `chartdata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `chartdata`;

-- CreateTable
CREATE TABLE `Chart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
