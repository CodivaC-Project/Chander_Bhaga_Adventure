-- Add receivedAmount to bookings for tracking partial/full payments
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS "receivedAmount" DOUBLE PRECISION DEFAULT 0;

-- Backfill: treat existing paid bookings as fully received
UPDATE bookings
SET "receivedAmount" = COALESCE("finalAmount", "totalAmount", 0)
WHERE "paymentStatus" = 'paid'
  AND (COALESCE("receivedAmount", 0) = 0);
