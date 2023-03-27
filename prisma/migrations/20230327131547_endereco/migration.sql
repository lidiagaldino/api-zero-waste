/*
  Warnings:

  - Added the required column `apelido` to the `Endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foto` to the `tbl_usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `endereco` ADD COLUMN `apelido` VARCHAR(191) NOT NULL,
    ADD COLUMN `latitude` VARCHAR(191) NOT NULL,
    ADD COLUMN `longitude` VARCHAR(191) NOT NULL,
    ADD COLUMN `numero` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tbl_usuario` ADD COLUMN `biografia` VARCHAR(191) NULL,
    ADD COLUMN `foto` VARCHAR(191) NOT NULL;
