-- AlterTable
ALTER TABLE `Account` MODIFY `username` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE INDEX `Account_username_idx` ON `Account`(`username`);
