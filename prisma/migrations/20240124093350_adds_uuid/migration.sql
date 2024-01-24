/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "karma_score" INTEGER NOT NULL
);
INSERT INTO "new_User" ("id", "karma_score") SELECT "id", "karma_score" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_UserEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "event_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    CONSTRAINT "UserEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserEvent" ("event_id", "id", "user_id", "weight") SELECT "event_id", "id", "user_id", "weight" FROM "UserEvent";
DROP TABLE "UserEvent";
ALTER TABLE "new_UserEvent" RENAME TO "UserEvent";
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "origin_endpoint" TEXT NOT NULL,
    "origin_verb" TEXT NOT NULL
);
INSERT INTO "new_Event" ("id", "name", "origin_endpoint", "origin_verb", "weight") SELECT "id", "name", "origin_endpoint", "origin_verb", "weight" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
