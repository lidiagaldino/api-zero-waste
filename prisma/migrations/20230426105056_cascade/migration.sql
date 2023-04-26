-- DropForeignKey
ALTER TABLE `tbl_catador` DROP FOREIGN KEY `tbl_catador_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_gerador` DROP FOREIGN KEY `tbl_gerador_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_pessoa_fisica` DROP FOREIGN KEY `tbl_pessoa_fisica_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `tbl_pessoa_juridica` DROP FOREIGN KEY `tbl_pessoa_juridica_id_usuario_fkey`;

-- AddForeignKey
ALTER TABLE `tbl_pessoa_fisica` ADD CONSTRAINT `tbl_pessoa_fisica_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_pessoa_juridica` ADD CONSTRAINT `tbl_pessoa_juridica_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_catador` ADD CONSTRAINT `tbl_catador_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_gerador` ADD CONSTRAINT `tbl_gerador_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `tbl_usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
