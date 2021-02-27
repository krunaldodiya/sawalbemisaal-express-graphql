-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('Deposit', 'Withdraw');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('Success', 'Failed', 'Pending');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'None');

-- CreateEnum
CREATE TYPE "RankingInput" AS ENUM ('Today', 'ThisMonth', 'AllTime');

-- CreateEnum
CREATE TYPE "PollStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ContestantStatus" AS ENUM ('Eliminated', 'Safe');

-- CreateTable
CREATE TABLE "WalletTransaction" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "type" "TransactionType" NOT NULL DEFAULT E'Deposit',
    "status" "TransactionStatus" NOT NULL DEFAULT E'Pending',
    "meta" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "walletId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contestant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" "ContestantStatus" NOT NULL,
    "tvShowId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "status" "PollStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupMessage" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TvShow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "about" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "airDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tvShowId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ranking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "prize" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,
    "dob" TEXT NOT NULL DEFAULT E'01-01-1990',
    "gender" "Gender" NOT NULL DEFAULT E'None',
    "avatar" TEXT,
    "instagramUsername" TEXT,
    "bio" TEXT,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "influencer" BOOLEAN NOT NULL DEFAULT false,
    "demo" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "fcmToken" TEXT,
    "version" TEXT,
    "referralCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "countryId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContestantToPoll" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserFollows" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_unique" ON "Wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User.mobile_unique" ON "User"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ContestantToPoll_AB_unique" ON "_ContestantToPoll"("A", "B");

-- CreateIndex
CREATE INDEX "_ContestantToPoll_B_index" ON "_ContestantToPoll"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollows_AB_unique" ON "_UserFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollows_B_index" ON "_UserFollows"("B");

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalletTransaction" ADD FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contestant" ADD FOREIGN KEY ("tvShowId") REFERENCES "TvShow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD FOREIGN KEY ("tvShowId") REFERENCES "TvShow"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ranking" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContestantToPoll" ADD FOREIGN KEY ("A") REFERENCES "Contestant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContestantToPoll" ADD FOREIGN KEY ("B") REFERENCES "Poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
