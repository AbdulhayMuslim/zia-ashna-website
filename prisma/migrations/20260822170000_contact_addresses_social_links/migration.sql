CREATE TABLE "ContactAddress" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(120) NOT NULL,
    "value" VARCHAR(500) NOT NULL,
    "icon" VARCHAR(80) NOT NULL DEFAULT 'MapPin',
    "linkUrl" VARCHAR(1000),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "sectionId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "ContactAddress_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ContactSocialLink" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(100) NOT NULL,
    "icon" VARCHAR(80) NOT NULL DEFAULT 'Globe',
    "url" VARCHAR(1000) NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "sectionId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "ContactSocialLink_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ContactAddress_sectionId_sortOrder_idx" ON "ContactAddress"("sectionId", "sortOrder");
CREATE INDEX "ContactSocialLink_sectionId_sortOrder_idx" ON "ContactSocialLink"("sectionId", "sortOrder");

ALTER TABLE "ContactAddress" ADD CONSTRAINT "ContactAddress_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ContactSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ContactSocialLink" ADD CONSTRAINT "ContactSocialLink_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ContactSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "ContactAddress" ("label", "value", "icon", "linkUrl", "sortOrder", "sectionId")
SELECT values_to_move.label, values_to_move.value, values_to_move.icon, values_to_move.link_url, values_to_move.sort_order, contact."id"
FROM "ContactSection" contact
JOIN "SiteSettings" settings ON settings."id" = 1
CROSS JOIN LATERAL (
  VALUES
    ('Email', settings."contactEmail", 'Mail', CASE WHEN settings."contactEmail" IS NOT NULL AND settings."contactEmail" <> '' THEN 'mailto:' || settings."contactEmail" END, 0),
    ('Phone', settings."phone", 'Phone', CASE WHEN settings."phone" IS NOT NULL AND settings."phone" <> '' THEN 'tel:' || settings."phone" END, 1),
    ('Address', settings."address", 'MapPin', NULL, 2)
) AS values_to_move(label, value, icon, link_url, sort_order)
WHERE contact."id" = 1 AND values_to_move.value IS NOT NULL AND values_to_move.value <> '';

INSERT INTO "ContactSocialLink" ("label", "icon", "url", "sortOrder", "sectionId")
SELECT network.label, network.icon, network.url, network.sort_order, contact."id"
FROM "ContactSection" contact
LEFT JOIN "SiteSettings" settings ON settings."id" = 1
CROSS JOIN LATERAL (
  VALUES
    ('Facebook', 'Facebook', COALESCE(NULLIF(settings."facebook", ''), '#'), 0),
    ('Instagram', 'Instagram', COALESCE(NULLIF(settings."instagram", ''), '#'), 1),
    ('LinkedIn', 'LinkedIn', COALESCE(NULLIF(settings."linkedin", ''), '#'), 2),
    ('WhatsApp', 'WhatsApp', COALESCE(NULLIF(settings."whatsapp", ''), '#'), 3),
    ('X', 'X', NULLIF(settings."twitter", ''), 4),
    ('YouTube', 'YouTube', NULLIF(settings."youtube", ''), 5)
) AS network(label, icon, url, sort_order)
WHERE contact."id" = 1 AND network.url IS NOT NULL;
