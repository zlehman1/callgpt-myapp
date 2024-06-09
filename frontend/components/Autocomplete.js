import React, { useState, useEffect, useTransition } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';
//import { GOOGLE_PLACES_API_KEY } from '../env'; // Make sure you have the `react-native-dotenv` package installed


const Autocomplete = ({ placeholder, onPlaceSelected }) => {
  const [input, setInput] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
   // console.log('Input changed:', input);

    if (input.length > 2) {
      fetchPredictions();
    } else {
      setPredictions([]);
    }
  }, [input]);

  const fetchPredictions = async () => {
    const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyBSK6VDjjCdyeYh4lUwX14wc-Kes9RllA8&types=geocode`;
   // console.log('Fetching predictions from:', endpoint);
    try {
      const response = await axios.get(endpoint);
     // console.log('Predictions:', response.data.predictions);
      setPredictions(response.data.predictions);
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  const handleSelect = (place) => {
  //  console.log('Place selected:', place);
    setInput(place.description);
    setPredictions([]);
    setShowDropdown(false);
    onPlaceSelected(place);
  };

  return (
    <View style={styles.container}>
<TextInput
  style={{ width: 324, height: 53, paddingHorizontal: 8, borderWidth: 4, borderColor: '#c2c2c2', borderRadius: 6, backgroundColor: '#fff', color: '#000', fontSize: 24, fontFamily: 'Poppins', fontWeight: '200', fontStyle: 'italic', lineHeight: 31, marginTop: 20, marginBottom: 20 }}
  placeholder={placeholder}
  value={input}
  onChangeText={(text) => {
   // console.log('Input text changed:', text);
    setInput(text);
  }}
  onFocus={() => {
  //  console.log('Input focused');
    setShowDropdown(true);
  }}
  // Remove the onBlur handler for now
/>
      {showDropdown && predictions.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={predictions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => {
            //  console.log('Rendering item:', item);
              return (
                <TouchableOpacity onPress={() => {
                //  console.log('Item pressed:', item);
                  handleSelect(item);
                }}>
                  <Text style={styles.dropdownItem}>{item.description}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  input: {
    width: 324, // Width of the input box
    height: 53, // Height of the input box
    paddingHorizontal: 8, // Horizontal padding
    borderWidth: 4, // Border width
    borderColor: '#c2c2c2', // Border color
    borderRadius: 6, // Border radius
    backgroundColor: '#fff', // Background color
    color: '#000', // Darker text color
    fontSize: 24, // Font size
    fontFamily: 'Poppins', // Font family
    fontWeight: '200', // Font weight
    fontStyle: 'italic', // Font style
    lineHeight: 31, // Line height
    marginTop: 20, // Margin from top
    marginBottom: 20, // Margin from bottom
  },
  dropdown: {
    position: 'absolute',
    top: 63, // Adjusted to be below the input box
    width: '100%',
    maxHeight: 200,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default Autocomplete;


// import React, { useState, useEffect } from 'react';
// import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import axios from 'axios';
// import { GOOGLE_PLACES_API_KEY } from '@env'; // Make sure you have the `react-native-dotenv` package installed

// const Autocomplete = ({ placeholder, onPlaceSelected }) => {
//   console.log('Input changed:', input);

//   const [input, setInput] = useState('');
//   const [predictions, setPredictions] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     if (input.length > 2) {
//       fetchPredictions();
//     } else {
//       setPredictions([]);
//     }
//   }, [input]);

//   const fetchPredictions = async () => {


//     const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_PLACES_API_KEY}&types=geocode`;
//     console.log('Fetching predictions from:', endpoint);
//     try {
//       const response = await axios.get(endpoint);
//       setPredictions(response.data.predictions);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSelect = (place) => {
//     console.log('Place selected:', place);
//     setInput(place.description);
//     setPredictions([]);
//     setShowDropdown(false);
//     onPlaceSelected(place);
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder={placeholder}
//         value={input}
//         onChangeText={setInput}
//         onFocus={() => setShowDropdown(true)}
//       />
//       {showDropdown && predictions.length > 0 && (
//         <View style={styles.dropdown}>
//           <FlatList
//             data={predictions}
//             keyExtractor={(item) => item.place_id}
//             renderItem={({ item }) => (
//               <TouchableOpacity onPress={() => handleSelect(item)}>
//                 <Text style={styles.dropdownItem}>{item.description}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     position: 'relative',
//   },
//   input: {
//     width: 324, // Width of the input box
//     height: 53, // Height of the input box
//     paddingHorizontal: 8, // Horizontal padding
//     borderWidth: 4, // Border width
//     borderColor: '#c2c2c2', // Border color
//     borderRadius: 6, // Border radius
//     backgroundColor: '#fff', // Background color
//     color: '#000', // Darker text color
//     fontSize: 24, // Font size
//     fontFamily: 'Poppins', // Font family
//     fontWeight: '200', // Font weight
//     fontStyle: 'italic', // Font style
//     lineHeight: 31, // Line height
//     marginTop: 20, // Margin from top
//     marginBottom: 20, // Margin from bottom
//     // outline: 'none', // No outline
//   },
//   dropdown: {
//     position: 'absolute',
//     top: 63, // Adjusted to be below the input box
//     width: '100%',
//     maxHeight: 200,
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     zIndex: 1,
//   },
//   dropdownItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
// });

// export default Autocomplete;
