-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_User_id_fkey`;

-- DropForeignKey
ALTER TABLE `bookingonroom` DROP FOREIGN KEY `BookingOnRoom_Booking_id_fkey`;

-- DropForeignKey
ALTER TABLE `bookingonroom` DROP FOREIGN KEY `BookingOnRoom_Room_id_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_Booking_id_fkey`;

-- DropIndex
DROP INDEX `Booking_User_id_fkey` ON `booking`;

-- DropIndex
DROP INDEX `BookingOnRoom_Booking_id_fkey` ON `bookingonroom`;

-- DropIndex
DROP INDEX `BookingOnRoom_Room_id_fkey` ON `bookingonroom`;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_User_id_fkey` FOREIGN KEY (`User_id`) REFERENCES `User`(`User_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingOnRoom` ADD CONSTRAINT `BookingOnRoom_Booking_id_fkey` FOREIGN KEY (`Booking_id`) REFERENCES `Booking`(`Booking_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookingOnRoom` ADD CONSTRAINT `BookingOnRoom_Room_id_fkey` FOREIGN KEY (`Room_id`) REFERENCES `Room`(`Room_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_Booking_id_fkey` FOREIGN KEY (`Booking_id`) REFERENCES `Booking`(`Booking_id`) ON DELETE CASCADE ON UPDATE CASCADE;
