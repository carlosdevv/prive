/*
  Warnings:

  - You are about to drop the column `goal_acao` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `goal_crypto` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `goal_fii` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `goal_reit` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `goal_renda_fixa` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `goal_stock` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `goal_acao`,
    DROP COLUMN `goal_crypto`,
    DROP COLUMN `goal_fii`,
    DROP COLUMN `goal_reit`,
    DROP COLUMN `goal_renda_fixa`,
    DROP COLUMN `goal_stock`,
    ADD COLUMN `patrimony` DOUBLE NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Goal` (
    `id` VARCHAR(191) NOT NULL,
    `class` ENUM('RENDA_FIXA', 'ACAO', 'FII', 'CRYPTO', 'STOCK', 'REIT') NOT NULL,
    `value` DOUBLE NULL DEFAULT 16.6666667,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Goal_id_key`(`id`),
    INDEX `Goal_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
