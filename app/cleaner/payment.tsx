import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { router, Stack } from 'expo-router';
import { ArrowLeft, MoveVertical as MoreVertical, CreditCard, Calendar, User, Check, Plus } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';

// Sample saved payment methods
const savedPaymentMethods = [
  {
    id: '1',
    type: 'Visa',
    lastFour: '1210',
    cardHolder: 'Luisa Maria Millan',
    expiryDate: '05/25',
    isDefault: true,
  },
  {
    id: '2',
    type: 'Mastercard',
    lastFour: '4567',
    cardHolder: 'Luisa Maria Millan',
    expiryDate: '08/26',
    isDefault: false,
  }
];

export default function PaymentMethodScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('1');
  const [showAddNewCard, setShowAddNewCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<{
    cardNumber?: string;
    cardHolder?: string;
    expiryDate?: string;
    cvv?: string;
  }>({});

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format with spaces every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    
    return digits;
  };

  const handleCardNumberChange = (text: string) => {
    setCardNumber(formatCardNumber(text));
  };

  const handleExpiryDateChange = (text: string) => {
    setExpiryDate(formatExpiryDate(text));
  };

  const validateForm = () => {
    if (!showAddNewCard) return true;
    
    const newErrors: {
      cardNumber?: string;
      cardHolder?: string;
      expiryDate?: string;
      cvv?: string;
    } = {};

    // Validate card number
    if (!cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    // Validate card holder
    if (!cardHolder) {
      newErrors.cardHolder = 'Card holder name is required';
    }

    // Validate expiry date
    if (!expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else {
      const [month, year] = expiryDate.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (!month || !year || month.length !== 2 || year.length !== 2) {
        newErrors.expiryDate = 'Invalid expiry date format';
      } else if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiryDate = 'Invalid month';
      } else if (
        parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    // Validate CVV
    if (!cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (cvv.length < 3 || cvv.length > 4) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveCard = () => {
    if (validateForm()) {
      // In a real app, this would save the card to the user's account
      router.back();
    }
  };

  const toggleAddNewCard = () => {
    setShowAddNewCard(!showAddNewCard);
    if (!showAddNewCard) {
      setSelectedPaymentMethod('');
    }
  };

  const selectPaymentMethod = (id: string) => {
    setSelectedPaymentMethod(id);
    setShowAddNewCard(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.light.secondary} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Payment Method</Text>
          
          <TouchableOpacity style={styles.moreButton}>
            <MoreVertical size={24} color={Colors.light.secondary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.savedCardsSection}>
          <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
          
          {savedPaymentMethods.map(method => (
            <TouchableOpacity 
              key={method.id}
              style={[
                styles.savedCardItem,
                selectedPaymentMethod === method.id && styles.selectedCardItem
              ]}
              onPress={() => selectPaymentMethod(method.id)}
            >
              <View style={styles.savedCardContent}>
                <View style={styles.cardTypeContainer}>
                  <CreditCard size={24} color={Colors.light.white} />
                </View>
                <View style={styles.savedCardInfo}>
                  <Text style={styles.savedCardType}>
                    {method.type} •••• {method.lastFour}
                    {method.isDefault && <Text style={styles.defaultTag}> (Default)</Text>}
                  </Text>
                  <Text style={styles.savedCardHolder}>{method.cardHolder}</Text>
                  <Text style={styles.savedCardExpiry}>Expires {method.expiryDate}</Text>
                </View>
              </View>
              
              {selectedPaymentMethod === method.id && (
                <View style={styles.checkmarkContainer}>
                  <Check size={20} color={Colors.light.primary} />
                </View>
              )}
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity 
            style={styles.addNewCardButton}
            onPress={toggleAddNewCard}
          >
            <View style={styles.addIconContainer}>
              <Plus size={20} color={Colors.light.primary} />
            </View>
            <Text style={styles.addNewCardText}>
              {showAddNewCard ? 'Cancel' : 'Add New Payment Method'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {showAddNewCard && (
          <>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardType}>Credit Card</Text>
                  <CreditCard size={24} color={Colors.light.white} />
                </View>
                
                <Text style={styles.cardNumberPreview}>
                  {cardNumber || '•••• •••• •••• ••••'}
                </Text>
                
                <View style={styles.cardFooter}>
                  <View style={styles.cardHolderContainer}>
                    <Text style={styles.cardLabel}>Card Holder</Text>
                    <Text style={styles.cardValue}>
                      {cardHolder || 'Your Name'}
                    </Text>
                  </View>
                  
                  <View style={styles.cardExpiryContainer}>
                    <Text style={styles.cardLabel}>Expires</Text>
                    <Text style={styles.cardValue}>
                      {expiryDate || 'MM/YY'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card Number</Text>
                <View style={[styles.inputContainer, errors.cardNumber && styles.inputError]}>
                  <CreditCard size={20} color={Colors.light.darkGray} />
                  <TextInput
                    style={styles.input}
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChangeText={handleCardNumberChange}
                    keyboardType="numeric"
                    maxLength={19}
                  />
                </View>
                {errors.cardNumber && (
                  <Text style={styles.errorText}>{errors.cardNumber}</Text>
                )}
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Card Holder</Text>
                <View style={[styles.inputContainer, errors.cardHolder && styles.inputError]}>
                  <User size={20} color={Colors.light.darkGray} />
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    value={cardHolder}
                    onChangeText={setCardHolder}
                    autoCapitalize="words"
                  />
                </View>
                {errors.cardHolder && (
                  <Text style={styles.errorText}>{errors.cardHolder}</Text>
                )}
              </View>
              
              <View style={styles.rowInputs}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                  <Text style={styles.inputLabel}>Expiry Date</Text>
                  <View style={[styles.inputContainer, errors.expiryDate && styles.inputError]}>
                    <Calendar size={20} color={Colors.light.darkGray} />
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChangeText={handleExpiryDateChange}
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>
                  {errors.expiryDate && (
                    <Text style={styles.errorText}>{errors.expiryDate}</Text>
                  )}
                </View>
                
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <View style={[styles.inputContainer, errors.cvv && styles.inputError]}>
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      value={cvv}
                      onChangeText={setCvv}
                      keyboardType="numeric"
                      maxLength={4}
                      secureTextEntry
                    />
                  </View>
                  {errors.cvv && (
                    <Text style={styles.errorText}>{errors.cvv}</Text>
                  )}
                </View>
              </View>
              
              <View style={styles.saveContainer}>
                <Text style={styles.saveText}>
                  Your payment information will be stored securely for future bookings.
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title={showAddNewCard ? "Save New Card" : "Use Selected Method"}
          onPress={handleSaveCard}
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
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.white,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.secondary,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.secondary,
    marginBottom: 16,
  },
  savedCardsSection: {
    marginBottom: 24,
  },
  savedCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.gray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedCardItem: {
    backgroundColor: '#E6F7F7',
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  savedCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardTypeContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A87C9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  savedCardInfo: {
    flex: 1,
  },
  savedCardType: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.secondary,
    marginBottom: 4,
  },
  defaultTag: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.light.primary,
  },
  savedCardHolder: {
    fontSize: 14,
    color: Colors.light.darkGray,
    marginBottom: 2,
  },
  savedCardExpiry: {
    fontSize: 12,
    color: Colors.light.darkGray,
  },
  checkmarkContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E6F7F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addNewCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  addIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E6F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  addNewCardText: {
    fontSize: 16,
    color: Colors.light.primary,
    fontWeight: '600',
  },
  cardContainer: {
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#1A87C9',
    borderRadius: 16,
    padding: 20,
    height: 180,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.white,
  },
  cardNumberPreview: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.light.white,
    letterSpacing: 2,
    marginVertical: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHolderContainer: {
    flex: 2,
  },
  cardExpiryContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  cardLabel: {
    fontSize: 12,
    color: Colors.light.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.white,
  },
  formContainer: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.secondary,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.gray,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  inputError: {
    borderWidth: 1,
    borderColor: Colors.light.error,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: Colors.light.secondary,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 12,
    marginTop: 4,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveContainer: {
    marginTop: 10,
  },
  saveText: {
    fontSize: 14,
    color: Colors.light.darkGray,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.light.gray,
    backgroundColor: Colors.light.white,
  },
});