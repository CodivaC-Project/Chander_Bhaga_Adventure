-- Add Tour Programme to bookings (rich text / HTML stored as text)
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS "tourProgramme" TEXT;
