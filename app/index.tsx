import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import Colors from '../constants/Colors';
import LogoSvg from '../assets/images/Logo.svg';

export default function SplashScreen() {
  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = false; // Replace with actual auth check
    
    // Navigate to the appropriate screen after a delay
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LogoSvg width="70%" height="70%" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});