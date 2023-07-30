-- CreateTable
CREATE TABLE `Goal` (
    `id` VARCHAR(191) NOT NULL,
    `name` ENUM('RENDA_FIXA', 'ACAO', 'FII', 'CRYPTO', 'STOCK', 'REIT') NOT NULL,
    `value` DOUBLE NULL DEFAULT 16.6666667,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Goal_id_key`(`id`),
    UNIQUE INDEX `Goal_userId_key`(`userId`),
    INDEX `Goal_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
