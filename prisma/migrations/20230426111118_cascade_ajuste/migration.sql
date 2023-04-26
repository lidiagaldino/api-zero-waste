-- DropForeignKey
ALTER TABLE `tbl_endereco_usuario` DROP FOREIGN KEY `tbl_endereco_usuario_id_endereco_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_endereco_usuario` DROP FOREIGN KEY `tbl_endereco_usuario_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_favoritar_catador` DROP FOREIGN KEY `tbl_favoritar_catador_id_catador_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_favoritar_catador` DROP FOREIGN KEY `tbl_favoritar_catador_id_gerador_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_materiais_catador` DROP FOREIGN KEY `tbl_materiais_catador_id_catador_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_materiais_catador` DROP FOREIGN KEY `tbl_materiais_catador_id_materiais_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_materiais_pedido` DROP FOREIGN KEY `tbl_materiais_pedido_id_material_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_materiais_pedido` DROP FOREIGN KEY `tbl_materiais_pedido_id_pedido_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_pedido` DROP FOREIGN KEY `tbl_pedido_id_endereco_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_pedido` DROP FOREIGN KEY `tbl_pedido_id_gerador_fkey`;

-- AlterTable
ALTER TABLE `tbl_pedido` ADD COLUMN `geradorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `tbl_materiais_catador` ADD CONSTRAINT `tbl_materiais_catador_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `tbl_catador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_materiais_catador` ADD CONSTRAINT `tbl_materiais_catador_id_materiais_fkey` FOREIGN KEY (`id_materiais`) REFERENCES `tbl_materiais`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_endereco_usuario` ADD CONSTRAINT `tbl_endereco_usuario_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_endereco_usuario` ADD CONSTRAINT `tbl_endereco_usuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_favoritar_catador` ADD CONSTRAINT `tbl_favoritar_catador_id_catador_fkey` FOREIGN KEY (`id_catador`) REFERENCES `tbl_catador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_favoritar_catador` ADD CONSTRAINT `tbl_favoritar_catador_id_gerador_fkey` FOREIGN KEY (`id_gerador`) REFERENCES `tbl_gerador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_materiais_pedido` ADD CONSTRAINT `tbl_materiais_pedido_id_material_fkey` FOREIGN KEY (`id_material`) REFERENCES `tbl_materiais`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_materiais_pedido` ADD CONSTRAINT `tbl_materiais_pedido_id_pedido_fkey` FOREIGN KEY (`id_pedido`) REFERENCES `tbl_pedido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pedido` ADD CONSTRAINT `tbl_pedido_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pedido` ADD CONSTRAINT `tbl_pedido_geradorId_fkey` FOREIGN KEY (`geradorId`) REFERENCES `tbl_gerador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
