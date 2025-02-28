/*
  Warnings:

  - The values [CANCELLED] on the enum `Booking_Booking_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `Password` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `booking` ALTER COLUMN `Check_in_date` DROP DEFAULT,
    ALTER COLUMN `Check_out_date` DROP DEFAULT,
    MODIFY `Booking_status` ENUM('PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `payment` ALTER COLUMN `Payment_date` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `Password`,
    MODIFY `Role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `BookingOnRoom` (
    `BookingOnRoom_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Booking_id` INTEGER NOT NULL,
    `Room_id` INTEGER NOT NULL,
    `Quantity_room` INTEGER NOT NULL,

    PRIMARY KEY (`BookingOnRoom_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `Room_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Hotel_id` INTEGER NOT NULL,
    `Room_type` VARCHAR(191) NOT NULL,
    `Picture_id` VARCHAR(191) NULL,
    `Description` VARCHAR(191) NULL,
    `Price_per_night` DOUBLE NOT NULL,

    PRIMARY KEY (`Room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookingOnRoom` ADD CONSTRAINT `BookingOnRoom_Booking_id_fkey` FOREIGN KEY (`Booking_id`) REFERENCES `Booking`(`Booking_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingOnRoom` ADD CONSTRAINT `BookingOnRoom_Room_id_fkey` FOREIGN KEY (`Room_id`) REFERENCES `Room`(`Room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
