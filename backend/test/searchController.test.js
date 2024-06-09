/* eslint-env jest */

const { checkMedicationAvailability } = require('../controllers/searchController');

const  pharmacyModel  = require('../models/pharmacyModel');

jest.mock('../models/pharmacyModel');

const dummyPharmacies = [
  { place_id: '1', name: 'Pharmacy One', address: 'Address One', phone_number: '1234567890' },
  { place_id: '2', name: 'Pharmacy Two', address: 'Address Two', phone_number: '0987654321' },
  { place_id: '3', name: 'Pharmacy Three', address: 'Address Three', phone_number: '1122334455' }
];

const mixedDetails = {
  '1': [
    { type: 'adderall', dosage: '10mg ir', available: 'Yes', last_inquired: new Date() },
    { type: 'adderall', dosage: '20mg ir', available: 'No', last_inquired: new Date() }
  ],
  '2': [
    { type: 'adderall', dosage: '10mg ir', available: 'No', last_inquired: new Date() },
    { type: 'adderall', dosage: '20mg ir', available: 'Unknown', last_inquired: new Date() }
  ],
  '3': [
    { type: 'adderall', dosage: '10mg ir', available: 'No', last_inquired: new Date() },
    { type: 'adderall', dosage: '20mg ir', available: 'No', last_inquired: new Date() }
  ]
};

const mixedNoAndNullDetails = {
  '1': [
    { type: 'adderall', dosage: '10mg ir', available: 'No', last_inquired: new Date() },
    { type: 'adderall', dosage: '20mg ir', available: 'No', last_inquired: new Date() }
  ],
  '2': [
    { type: 'adderall', dosage: '10mg ir', available: 'Unknown', last_inquired: new Date() },
    { type: 'adderall', dosage: '20mg ir', available: 'No', last_inquired: new Date() }
  ],
  '3': [
    { type: 'adderall', dosage: '10mg ir', available: 'No', last_inquired: new Date() },
    { type: 'adderall', dosage: '20mg ir', available: 'Unknown', last_inquired: new Date() }
  ]
};

const noMedicationDetails = [
  { type: 'adderall', dosage: '10mg ir', available: 'No', last_inquired: new Date() },
  { type: 'adderall', dosage: '20mg ir', available: 'No', last_inquired: new Date() }
];

beforeEach(() => {
  jest.resetAllMocks();
});

test('should return Medication Available when a pharmacy has the medication', async () => {
  pharmacyModel.getMedicationAvailabilityByPharmacyId.mockImplementation((pharmacyId, medicationType) => {
    return Promise.resolve(mixedDetails[pharmacyId]);
  });

  const result = await checkMedicationAvailability(dummyPharmacies, 'adderall', '10mg ir');
  expect(result.status).toBe('Medication Available');
  expect(result.pharmacy.place_id).toEqual('1');
});

test('should return Unknown when there are no yeses but mixed nos and unknowns', async () => {
  pharmacyModel.getMedicationAvailabilityByPharmacyId.mockImplementation((pharmacyId, medicationType) => {
    return Promise.resolve(mixedNoAndNullDetails[pharmacyId]);
  });

  const result = await checkMedicationAvailability(dummyPharmacies, 'adderall', '10mg ir');
  expect(result.status).toBe('Unknown');
  expect(result.pharmacies).toEqual([
    { pharmacy: dummyPharmacies[0], medications: mixedNoAndNullDetails['1'], status: 'No' },
    { pharmacy: dummyPharmacies[1], medications: mixedNoAndNullDetails['2'], status: 'Unknown' },
    { pharmacy: dummyPharmacies[2], medications: mixedNoAndNullDetails['3'], status: 'No' }
  ]);
});

test('should return No Medication Available when all pharmacies have no medication', async () => {
  pharmacyModel.getMedicationAvailabilityByPharmacyId.mockResolvedValue(noMedicationDetails);

  const result = await checkMedicationAvailability(dummyPharmacies, 'adderall', '10mg ir');
  expect(result.status).toBe('No Medication Available');
  expect(result.pharmacies).toEqual([
    { pharmacy: dummyPharmacies[0], medications: noMedicationDetails, status: 'No' },
    { pharmacy: dummyPharmacies[1], medications: noMedicationDetails, status: 'No' },
    { pharmacy: dummyPharmacies[2], medications: noMedicationDetails, status: 'No' }
  ]);
});




  