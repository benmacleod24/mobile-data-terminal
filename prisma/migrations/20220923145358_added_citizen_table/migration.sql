/*
  Warnings:

  - The values [pilots] on the enum `PenalCode_Points_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `penalcode_points` MODIFY `type` ENUM('DRIVING', 'PILOTS', 'HUNTING') NOT NULL;

-- CreateTable
CREATE TABLE `Citizens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mugshot` LONGTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `Citizens_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
