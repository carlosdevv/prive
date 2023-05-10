/*
  Warnings:

  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `class` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Asset_classId_idx` ON `Asset`;

-- AlterTable
ALTER TABLE `Asset` ADD COLUMN `class` ENUM('RENDA_FIXA', 'ACAO', 'FII', 'CRYPTO', 'STOCK', 'REIT') NOT NULL;

-- DropTable
DROP TABLE `Class`;
