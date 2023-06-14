/*
  Warnings:

  - A unique constraint covering the columns `[householdId,userId]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invite_householdId_userId_key" ON "Invite"("householdId", "userId");
