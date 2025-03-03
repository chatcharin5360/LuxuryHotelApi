/*
  Warnings:

  - You are about to drop the column `clerk_id` on the `user` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `Password` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_User_id_fkey`;

-- DropForeignKey
ALTER TABLE `bookingonroom` DROP FOREIGN KEY `BookingOnRoom_Booking_id_fkey`;

-- DropForeignKey
ALTER TABLE `bookingonroom` DROP FOREIGN KEY `BookingOnRoom_Room_id_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_Booking_id_fkey`;

-- DropIndex
DROP INDEX `User_clerk_id_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `clerk_id`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `Password` VARCHAR(191) NOT NULL;
