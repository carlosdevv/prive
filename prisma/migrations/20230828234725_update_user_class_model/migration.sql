/*
  Warnings:

  - You are about to drop the `Goal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Goal`;

-- CreateTable
CREATE TABLE `Class` (
    `id` VARCHAR(191) NOT NULL,
    `class` ENUM('RENDA_FIXA', 'ACAO', 'FII', 'CRYPTO', 'STOCK', 'REIT') NOT NULL,
    `value` DOUBLE NULL DEFAULT 0,
    `goal` DOUBLE NULL DEFAULT 16.5,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Class_id_key`(`id`),
    INDEX `Class_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
