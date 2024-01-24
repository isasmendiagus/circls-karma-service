/*
  Warnings:

  - A unique constraint covering the columns `[origin_endpoint,origin_verb]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `UserEvent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserEvent" ("event_id", "id", "user_id", "weight") SELECT "event_id", "id", "user_id", "weight" FROM "UserEvent";
DROP TABLE "UserEvent";
ALTER TABLE "new_UserEvent" RENAME TO "UserEvent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Event_origin_endpoint_origin_verb_key" ON "Event"("origin_endpoint", "origin_verb");
