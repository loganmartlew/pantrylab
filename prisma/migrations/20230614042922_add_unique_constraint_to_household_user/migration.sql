/*
  Warnings:

  - A unique constraint covering the columns `[householdId,userId]` on the table `HouseholdUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HouseholdUser_householdId_userId_key" ON "HouseholdUser"("householdId", "userId");
