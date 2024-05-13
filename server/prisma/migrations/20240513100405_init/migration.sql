-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "middlename" TEXT,
    "password_hash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "isactivated" BOOLEAN NOT NULL,
    "activationlink" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "refreshToken" TEXT,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_email_key" ON "Person"("email");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
