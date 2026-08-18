/*
  Contact cards are display steps and now contain only a title and icon.
  The legacy value and link URL fields are no longer part of the CMS.
*/
ALTER TABLE "ContactCard"
DROP COLUMN "value",
DROP COLUMN "linkUrl";
