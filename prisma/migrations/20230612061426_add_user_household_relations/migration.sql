-- CreateTable
CREATE TABLE "HouseholdUser" (
    "householdId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HouseholdUser_pkey" PRIMARY KEY ("householdId","userId")
);

-- AddForeignKey
ALTER TABLE "HouseholdUser" ADD CONSTRAINT "HouseholdUser_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "Household"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseholdUser" ADD CONSTRAINT "HouseholdUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
