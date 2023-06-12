/*
  Warnings:

  - Added the required column `role` to the `HouseholdUser` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HouseholdUserRole" AS ENUM ('OWNER', 'USER');

-- AlterTable
ALTER TABLE "HouseholdUser" ADD COLUMN     "role" "HouseholdUserRole" NOT NULL;
