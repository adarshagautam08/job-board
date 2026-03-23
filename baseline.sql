-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_userId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_seekerId_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Job";

-- DropTable
DROP TABLE "Application";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Status";

