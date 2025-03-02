/*
  Warnings:

  - You are about to drop the column `cleck_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerk_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerk_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_cleck_id_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `cleck_id`,
    ADD COLUMN `clerk_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_clerk_id_key` ON `User`(`clerk_id`);
