import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { router, Stack } from 'expo-router';
import { Check } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';

export default function PaymentSuccessScreen() {
  // In a real app, this would come from the payment processing response
  const paymentAmount = 105.00;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />
      
      <View style={styles.content}>
        <View style={styles.successIconContainer}>
          <Check size={40} color={Colors.light.white} />
        </View>
        
        <Text style={styles.successTitle}>Total paid</Text>
        
        <Text style={styles.amountText}>$ {paymentAmount.toFixed(2)}</Text>
        
        <Text style={styles.successMessage}>
          Payment successfully completed
        </Text>
      </View>
      
      <View style={styles.footer}>
        <Button 
          title="Done" 
          onPress={() => router.replace('/(tabs)')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.secondary,
    marginBottom: 16,
  },
  amountText: {
    fontSize: 54,
    fontWeight: '700',
    color: Colors.light.secondary,
    marginBottom: 16,
  },
  successMessage: {
    fontSize: 16,
    color: Colors.light.darkGray,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.light.gray,
    backgroundColor: Colors.light.white,
  },
});