/*
  Warnings:

  - You are about to drop the column `data` on the `PixelData` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PixelData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "event" TEXT NOT NULL,
    "productIds" TEXT,
    "customerFirstName" TEXT,
    "customerLastName" TEXT,
    "customerEmail" TEXT,
    "customerPhone" TEXT,
    "orderCount" INTEGER,
    "cartId" TEXT,
    "cartTotalAmount" REAL,
    "shopName" TEXT,
    "shopCurrencyCode" TEXT,
    "shopCountryCode" TEXT,
    "shopDomain" TEXT,
    "storefrontUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_PixelData" ("createdAt", "event", "id") SELECT "createdAt", "event", "id" FROM "PixelData";
DROP TABLE "PixelData";
ALTER TABLE "new_PixelData" RENAME TO "PixelData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
