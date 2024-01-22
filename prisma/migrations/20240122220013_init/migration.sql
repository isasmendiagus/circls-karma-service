-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "origin_endpoint" TEXT NOT NULL,
    "origin_verb" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    CONSTRAINT "UserEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserEvent_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "karma_score" INTEGER NOT NULL
);
