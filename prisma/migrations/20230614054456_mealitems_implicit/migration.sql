/*
  Warnings:

  - You are about to drop the `MealItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MealItem" DROP CONSTRAINT "MealItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "MealItem" DROP CONSTRAINT "MealItem_mealId_fkey";

-- DropTable
DROP TABLE "MealItem";

-- CreateTable
CREATE TABLE "_ItemToMeal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToMeal_AB_unique" ON "_ItemToMeal"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToMeal_B_index" ON "_ItemToMeal"("B");

-- AddForeignKey
ALTER TABLE "_ItemToMeal" ADD CONSTRAINT "_ItemToMeal_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToMeal" ADD CONSTRAINT "_ItemToMeal_B_fkey" FOREIGN KEY ("B") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
