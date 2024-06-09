import { StyleSheet } from 'react-native';

const sharedStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff1ea',
    justifyContent: 'flex-start', // Align items towards the top
    alignItems: 'center',
    paddingTop: 50, // Adjust padding to push content down a bit
  },
  topLogoContainer: {
    marginBottom: 20, // Create space below the logo
    width: 67,
    height: 77,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    color: '#fa8b6c',
    fontSize: 48,
    fontFamily: 'Poppins',
    fontWeight: '800',
    lineHeight: 62,
    textAlign: 'center',
    marginBottom: 20, // Create space below the title
  },
  subtitle: {
    color: '#fa8b6c',
    fontSize: 18,
    fontFamily: 'Quicksand', // Ensure you have the font available in your project
    fontWeight: '600',
    lineHeight: 23,
    textAlign: 'center',
    marginVertical: 16,
  },
  button: {
    width: 166,
    height: 57,
    paddingHorizontal: 8,
    borderWidth: 3,
    borderColor: '#9be3e7',
    borderRadius: 40,
    backgroundColor: '#bde4e6',
    color: '#7f7f7f',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: '500',
    lineHeight: 24,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
});

export default sharedStyles;


