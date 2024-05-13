/*
  Warnings:

  - A unique constraint covering the columns `[personId]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Token_personId_key" ON "Token"("personId");
