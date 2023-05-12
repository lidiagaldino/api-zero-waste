-- CreateTable
CREATE TABLE `tbl_avaliacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nota` DOUBLE NOT NULL,
    `id_gerador` INTEGER NOT NULL,
    `id_catador` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_avaliacao_id_key`(`id`),
    INDEX `tbl_avaliacao_id_catador_fkey`(`id_catador`),
    INDEX `tbl_avaliacao_id_gerador_fkey`(`id_gerador`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_avaliacao` ADD CONSTRAINT `tbl_avaliacao_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `tbl_catador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_avaliacao` ADD CONSTRAINT `tbl_avaliacao_id_gerador_fkey` FOREIGN KEY (`id_gerador`) REFERENCES `tbl_gerador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
