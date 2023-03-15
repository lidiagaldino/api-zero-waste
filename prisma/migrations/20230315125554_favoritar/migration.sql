-- CreateTable
CREATE TABLE `FavoritarCatador` (
    `id` VARCHAR(191) NOT NULL,
    `id_catador` VARCHAR(191) NOT NULL,
    `id_gerador` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FavoritarCatador` ADD CONSTRAINT `FavoritarCatador_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `Catador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoritarCatador` ADD CONSTRAINT `FavoritarCatador_id_gerador_fkey` FOREIGN KEY (`id_gerador`) REFERENCES `Gerador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
