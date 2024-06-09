/* eslint-env jest */

const db = require('../config/db');
const pharmacyModel = require('../models/pharmacyModel');

jest.mock('../config/db', () => ({
  execute: jest.fn()
}));

describe('pharmacyModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getMedicationAvailabilityByPharmacyId should return medication details for a valid pharmacyId and medication type', async () => {
    const pharmacyId = 'pharmacy-1';
    const medicationType = 'adderall';
    const mockResult = [
      { type: 'adderall', dosage: '10mg', available: 'Yes', last_inquired: new Date() },
      { type: 'adderall', dosage: '20mg', available: 'No', last_inquired: new Date() }
    ];

    db.execute.mockResolvedValue([mockResult]);

    const result = await pharmacyModel.getMedicationAvailabilityByPharmacyId(pharmacyId, medicationType);

    expect(result).toEqual(mockResult);
    expect(db.execute).toHaveBeenCalledWith(expect.stringContaining('SELECT m.type, m.dosage, pm.available, pm.last_inquired'), [pharmacyId, medicationType]);
  });

  test('getMedicationAvailabilityByPharmacyId should return undefined for an invalid pharmacyId or medication type', async () => {
    const pharmacyId = 'invalid-pharmacy';
    const medicationType = 'invalid-medication';
    db.execute.mockResolvedValue([[]]);

    const result = await pharmacyModel.getMedicationAvailabilityByPharmacyId(pharmacyId, medicationType);

    expect(result).toBeUndefined();
    expect(db.execute).toHaveBeenCalledWith(expect.stringContaining('SELECT m.type, m.dosage, pm.available, pm.last_inquired'), [pharmacyId, medicationType]);
  });
});
