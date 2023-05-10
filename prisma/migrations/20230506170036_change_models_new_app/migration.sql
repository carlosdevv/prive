/*
  Warnings:

  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.
  - You are about to drop the `Club` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('FREE', 'SUBSCRIBER') NOT NULL DEFAULT 'FREE';

-- DropTable
DROP TABLE `Club`;

-- DropTable
DROP TABLE `Event`;

-- DropTable
DROP TABLE `Payment`;

-- DropTable
DROP TABLE `_EventToUser`;

-- CreateTable
CREATE TABLE `Asset` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` DOUBLE NULL,
    `amount` DOUBLE NULL,
    `goal` INTEGER NULL,
    `classId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Asset_id_key`(`id`),
    INDEX `Asset_classId_idx`(`classId`),
    INDEX `Asset_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `id` VARCHAR(191) NOT NULL,
    `name` ENUM('RENDA_FIXA', 'ACAO', 'FII', 'CRYPTO', 'STOCK', 'REIT') NOT NULL,
    `value` DOUBLE NOT NULL,
    `goal` INTEGER NOT NULL,
    `currentGoal` INTEGER NOT NULL,

    UNIQUE INDEX `Class_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
