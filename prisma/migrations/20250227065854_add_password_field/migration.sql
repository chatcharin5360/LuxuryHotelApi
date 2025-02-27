-- CreateTable
CREATE TABLE `User` (
    `User_id` INTEGER NOT NULL AUTO_INCREMENT,
    `FirstName` VARCHAR(191) NOT NULL,
    `LastName` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Phone` VARCHAR(191) NULL,
    `Role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_Email_key`(`Email`),
    PRIMARY KEY (`User_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `Booking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Check_in_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Check_out_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Total_price` DOUBLE NOT NULL,
    `Booking_status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `User_id` INTEGER NOT NULL,

    PRIMARY KEY (`Booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `Payment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Booking_id` INTEGER NOT NULL,
    `Amount` DOUBLE NOT NULL,
    `Payment_method` VARCHAR(191) NOT NULL,
    `Payment_status` VARCHAR(191) NOT NULL,
    `Payment_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Payment_Booking_id_key`(`Booking_id`),
    PRIMARY KEY (`Payment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_User_id_fkey` FOREIGN KEY (`User_id`) REFERENCES `User`(`User_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_Booking_id_fkey` FOREIGN KEY (`Booking_id`) REFERENCES `Booking`(`Booking_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
