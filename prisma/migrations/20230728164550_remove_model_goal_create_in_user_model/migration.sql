/*
  Warnings:

  - You are about to drop the `Goal` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `goal_acao` DOUBLE NULL DEFAULT 16.6666667,
    ADD COLUMN `goal_crypto` DOUBLE NULL DEFAULT 16.6666667,
    ADD COLUMN `goal_fii` DOUBLE NULL DEFAULT 16.6666667,
    ADD COLUMN `goal_reit` DOUBLE NULL DEFAULT 16.6666667,
    ADD COLUMN `goal_renda_fixa` DOUBLE NULL DEFAULT 16.6666667,
    ADD COLUMN `goal_stock` DOUBLE NULL DEFAULT 16.6666667;

-- DropTable
DROP TABLE `Goal`;
