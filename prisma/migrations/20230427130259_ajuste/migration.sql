/*
  Warnings:

  - You are about to drop the column `status` on the `tbl_catador` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `tbl_pedido` table. All the data in the column will be lost.
  - Added the required column `id_status_catador` to the `tbl_catador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_status` to the `tbl_pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_catador` DROP COLUMN `status`,
    ADD COLUMN `id_status_catador` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tbl_pedido` DROP COLUMN `status`,
    ADD COLUMN `id_status` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `tbl_fila_pedido_catador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `distancia` INTEGER NOT NULL,
    `id_pedido` INTEGER NOT NULL,
    `id_catador` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_fila_pedido_catador_id_key`(`id`),
    INDEX `tbl_fila_pedido_catador_id_catador_fkey`(`id_catador`),
    INDEX `tbl_fila_pedido_catador_id_pedido_fkey`(`id_pedido`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tbl_status_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_status_catador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tbl_status_catador_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `tbl_catador_id_status_catador_fkey` ON `tbl_catador`(`id_status_catador`);

-- CreateIndex
CREATE INDEX `tbl_pedido_id_status_fkey` ON `tbl_pedido`(`id_status`);

-- AddForeignKey
ALTER TABLE `tbl_catador` ADD CONSTRAINT `tbl_catador_id_status_catador_fkey` FOREIGN KEY (`id_status_catador`) REFERENCES `tbl_status_catador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pedido` ADD CONSTRAINT `tbl_pedido_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `tbl_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_fila_pedido_catador` ADD CONSTRAINT `tbl_fila_pedido_catador_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `tbl_catador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_fila_pedido_catador` ADD CONSTRAINT `tbl_fila_pedido_catador_id_pedido_fkey` FOREIGN KEY (`id_pedido`) REFERENCES `tbl_pedido`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
