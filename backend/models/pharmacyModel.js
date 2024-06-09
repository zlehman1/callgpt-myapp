const db = require('../config/db');

exports.getMedicationAvailabilityByPharmacyId = async (placeId, medicationType) => {
  const [rows] = await db.execute(`
    SELECT m.type, m.dosage, pm.available, pm.last_inquired
    FROM pharmacy_medications pm
    JOIN medications m ON pm.medication_id = m.id
    WHERE pm.pharmacy_id = ? AND m.type = ?
  `, [placeId, medicationType]);

  return rows.length ? rows : undefined;
};


exports.insertOrUpdatePharmacy = async (details) => {
  console.log('Inserting or updating pharmacy details:', details); // Log the details
  await db.execute(`
    INSERT INTO pharmacies (place_id, name, address, phone_number)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      address = VALUES(address),
      phone_number = VALUES(phone_number)
  `, [details.place_id, details.name, details.formatted_address, details.formatted_phone_number]);
};
