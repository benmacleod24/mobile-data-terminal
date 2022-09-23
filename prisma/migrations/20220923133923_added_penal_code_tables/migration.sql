-- AlterTable
ALTER TABLE `account` ADD COLUMN `deleted_at` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `PenalCode_Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `PenalCode_Category_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PenalCode_Charge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `time` INTEGER NOT NULL DEFAULT 0,
    `fine` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `PenalCode_Charge_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PenalCode_Points` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `charge_id` INTEGER NOT NULL,
    `type` ENUM('DRIVING', 'pilots', 'HUNTING') NOT NULL,
    `amount` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `PenalCode_Points_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PenalCode_Charge` ADD CONSTRAINT `PenalCode_Charge_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `PenalCode_Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PenalCode_Points` ADD CONSTRAINT `PenalCode_Points_charge_id_fkey` FOREIGN KEY (`charge_id`) REFERENCES `PenalCode_Charge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
