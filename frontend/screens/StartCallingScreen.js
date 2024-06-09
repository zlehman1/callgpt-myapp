import React from 'react';
import { View, StyleSheet } from 'react-native';
import Title from '../components/Title';
import Screen from '../components/Screen';
import TopLogo from '../components/TopLogo';
import Subtitle from '../components/Subtitle';
import Text from '../components/Text'; // Update import statement

import CustomButton from '../components/CustomButton';

const StartCallingScreen = ({ route, navigation }) => {
  const { pharmacies, medication } = route.params;

  const handleStartCall = async () => {
    if (pharmacies && pharmacies.length > 0) {
      try {
        const pharmacy = pharmacies[0];
        const response = await fetch('http://192.168.86.32:3000/call/initiate-call', { // Replace with your server address
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ phoneNumber: pharmacy.pharmac.formatted_phone_number }),
        });

        const data = await response.json();

        if (data.success) {
          Alert.alert('Call Initiated', `Calling ${pharmacy.pharmac.name}`);
        } else {
          Alert.alert('Error', 'Failed to initiate call');
        }
      } catch (error) {
        console.error('Error initiating call:', error);
        Alert.alert('Error', 'Failed to initiate call');
      }
    } else {
      Alert.alert('No Pharmacies', 'No pharmacies to call');
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <TopLogo />
        <Text text={`We found some pharmacies in your area that might have ${medication}.`} /> 
        <Subtitle text="We'll call them one by one and ask about the availability of your medication. This may take a while....feel free to close out of the app! You'll get a notification when we're done." style={styles.subtitle} />
        <View style={styles.buttonContainer}>
          <CustomButton label="Start calling!" onPress={handleStartCall} />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  subtitle: {
    textAlign: 'center',
    marginVertical: 30, // Adjust spacing between subtitles

  },
  buttonContainer: {
    marginTop: 20, // Adjust as needed for spacing
  },
});

export default StartCallingScreen;




// import React from 'react';
// import { View, StyleSheet, Text, Button } from 'react-native';
// import Screen from '../components/Screen';

// const StartCallingScreen = ({ route, navigation }) => {
//   const { medication, dosage, location, pharmacies } = route.params;

//   const handleStartCalling = () => {
//     // Logic to start calling pharmacies
//     alert('Start calling pharmacies!');
//   };

//   return (
//     <Screen>
//       <View style={styles.container}>
//         <Text style={styles.title}>Start Calling Pharmacies</Text>
//         <Text style={styles.subtitle}>Medication: {medication}</Text>
//         <Text style={styles.subtitle}>Dosage: {dosage}</Text>
//         <Text style={styles.subtitle}>Location: {location}</Text>
//         <Button title="Start Calling" onPress={handleStartCalling} />
//       </View>
//     </Screen>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   subtitle: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
// });

// export default StartCallingScreen;
