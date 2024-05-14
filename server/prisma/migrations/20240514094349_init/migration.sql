/*
  Warnings:

  - A unique constraint covering the columns `[activationlink]` on the table `Person` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Person_activationlink_key" ON "Person"("activationlink");
