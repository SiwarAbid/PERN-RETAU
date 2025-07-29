/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Dish` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Dish_name_key" ON "Dish"("name");
