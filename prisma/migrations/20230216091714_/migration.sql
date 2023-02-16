-- CreateTable
CREATE TABLE `StockPrice` (
    `code` VARCHAR(191) NOT NULL,
    `exchange` VARCHAR(191) NOT NULL,
    `tradingDate` DATETIME(3) NOT NULL,
    `askPrice1` DOUBLE NOT NULL,
    `askPrice2` DOUBLE NOT NULL,
    `askPrice3` DOUBLE NOT NULL,
    `askVol1` DOUBLE NOT NULL,
    `askVol2` DOUBLE NOT NULL,
    `askVol3` DOUBLE NOT NULL,
    `bidPrice1` DOUBLE NOT NULL,
    `bidPrice2` DOUBLE NOT NULL,
    `bidPrice3` DOUBLE NOT NULL,
    `bidVol1` DOUBLE NOT NULL,
    `bidVol2` DOUBLE NOT NULL,
    `bidVol3` DOUBLE NOT NULL,
    `lastPrice` DOUBLE NOT NULL,
    `totalVol` DOUBLE NOT NULL,
    `refPrice` DOUBLE NOT NULL,
    `unixTime` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `StockPrice_code_key`(`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `id` VARCHAR(191) NOT NULL,
    `log` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
