const googleMapsService = require('../services/googleMapsService');
const pharmacyModel = require('../models/pharmacyModel');

exports.findNearbyPharmacies = async (req, res) => {
  const { location, medication, dosage } = req.body;
  try {
    console.log('Calling findNearbyPharmacies with location:', location);
    const pharmacies = await googleMapsService.getUniquePharmaciesWithDetails(location);
    //console.log('Found pharmacies:', pharmacies);

    const result = await this.checkPharmaciesInDatabase(pharmacies, medication, dosage);

    res.json(result);
  } catch (error) {
    console.error('Error in findNearbyPharmacies:', error);
    res.status(500).send('Error fetching nearby pharmacies');
  }
};

//const pharmacyModel = require('../models/pharmacyModel');

exports.checkMedicationAvailability = async (pharmacies, medicationType, medicationDosage) => {
  let allNo = true;
  const pharmacyStatuses = [];
  
  for (const pharmacy of pharmacies) {
    const pharmacyDetails = await pharmacyModel.getMedicationAvailabilityByPharmacyId(pharmacy.place_id, medicationType);
    //console.log(`Pharmacy: ${pharmacy.place_id}, Details: ${JSON.stringify(pharmacyDetails)}`);

    if (pharmacyDetails) {
      const specificMedication = pharmacyDetails.find(
        detail => detail.dosage === medicationDosage
      );
      // console.log(`Specific Medication: ${JSON.stringify(specificMedication)}`);

  
      if (specificMedication) {
        if (specificMedication.available === 'Yes') {
          return { status: 'Medication Available', pharmacy: pharmacy };
        } else if (specificMedication.available === 'No') {
          allNo = allNo && true;
          pharmacyStatuses.push({ pharmacy: pharmacy, medications: pharmacyDetails, status: 'No' });
        } else {
          allNo = false;
          pharmacyStatuses.push({ pharmacy: pharmacy, medications: pharmacyDetails, status: 'Unknown' });
        }
      } else {
        allNo = false;
        pharmacyStatuses.push({ pharmacy: pharmacy, medications: pharmacyDetails, status: 'Unknown' });
      }
    } else {
      allNo = false;
      pharmacyStatuses.push({ pharmacy: pharmacy, medications: pharmacyDetails, status: 'Unknown' });
    }
  }
  
  if (allNo) {
    return { status: 'No Medication Available', pharmacies: pharmacyStatuses };
  } else {
    return { status: 'Unknown', pharmacies: pharmacyStatuses };
  }
};

// // New function for checking pharmacies
// exports.checkPharmaciesInDatabase = async (pharmacies, medication, dosage) => {
//   //console.log('Pharmacies argument:', pharmacies);  // Add this line to log pharmacies

//   let allNo = true;
//   const pharmacyStatuses = [];

//   for (const pharmacy of pharmacies) {
//     const pharmacyDetails = await pharmacyModel.getPharmacyByPlaceId(pharmacy.place_id);

//     if (pharmacyDetails) {
//      // const medicationColumn = `${medication.toLowerCase()}_${dosage.replace(' ', '').toLowerCase()}`;
//       const medicationColumn = `${medication.toLowerCase()}_${dosage.toLowerCase().replace(' ', '_')}`;
//       console.log('Medication column:', medicationColumn);
      
//       if (pharmacyDetails[medicationColumn] === 1) {
//         console.log("found it!")
//         return {pharmacy, status: 'Medication Available' };
//       } else if (pharmacyDetails[medicationColumn] === 0) {
//         allNo = allNo && true;
//         pharmacyStatuses.push({ pharmacy: pharmacy, medications: pharmacyDetails, status: 'No' });
//       } else {
//         allNo = false;
//         pharmacyStatuses.push({ pharmacy: pharmacy, medications: pharmacyDetails, status: 'Unknown' });
//       }
//     } else {
//       allNo = false;
//       pharmacyStatuses.push({ pharmac: pharmacy, medications: pharmacyDetails, status: 'Unknown' });
//     }
//   }

//   if (allNo) {
//     return { status: 'No Medication Available', pharmacies: pharmacyStatuses };
//   } else {
//     console.log('Pharmacy statuses:', pharmacyStatuses);
//     return { status: 'Unknown', pharmacies: pharmacyStatuses };
//   }
// };


