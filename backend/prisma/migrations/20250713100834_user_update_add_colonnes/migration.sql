-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "isActived" BOOLEAN,
ADD COLUMN     "lastVisit" TIMESTAMP(3),
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "createdAt" DROP NOT NULL;
