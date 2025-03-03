import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MoveVertical as MoreVertical, Check, CreditCard, ChevronRight } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';

// Import SVG icons
import HomeAddressIcon from '../../assets/icons/details/home_address.svg';
import CalendarIcon from '../../assets/icons/details/calendar_icon.svg';
import UserIcon from '../../assets/icons/details/user_icon.svg';
import LivingRoomIcon from '../../assets/icons/booking/livingroom.svg';
import BedroomIcon from '../../assets/icons/booking/bedroom.svg';
import BathroomIcon from '../../assets/icons/booking/bathrooms.svg';
import KitchenIcon from '../../assets/icons/booking/kitchen.svg';
import OfficeIcon from '../../assets/icons/booking/office.svg';

export default function BookingConfirmationScreen() {
  const params = useLocalSearchParams();
  
  // In a real app, this would come from the previous screen or API
  // For now, we'll use a state to simulate dynamic updates
  const [bookingDetails, setBookingDetails] = useState({
    cleaner: {
      id: '3',
      name: 'Olivia Foster',
      specialty: 'Specialist in Office Sanitation',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    service: {
      type: 'House - Basic Cleaning',
      duration: '4 hours',
      timeRange: '2:00 pm a 6:00 pm',
      rooms: {
        livingRoom: [],
        bedrooms: [],
        bathrooms: [],
        kitchen: false,
        office: false
      }
    },
    dateTime: {
      day: 'Wednesday',
      date: 'Oct 24',
      startTime: '2:00 pm',
      endTime: '6:00 pm'
    },
    address: {
      name: 'My home',
      street: '789 Boulevard Gourmet Ciudad Gastronómica',
      region: 'Región Inventada'
    },
    payment: {
      method: 'Debit *1210',
      cardHolder: 'Luisa Maria Millan',
      subtotal: 100,
      serviceFee: 5,
      total: 105
    }
  });

  // Simulate fetching updated booking details
  useEffect(() => {
    // In a real app, this would be fetched from an API or passed via params
    // For this example, we'll simulate dynamic updates based on URL params
    
    if (params.selectedRooms) {
      try {
        // Parse the selected rooms from URL params
        const selectedRooms = JSON.parse(params.selectedRooms as string);
        
        // Update the booking details with the selected rooms
        // Using a functional update to avoid dependency on bookingDetails
        setBookingDetails(prev => ({
          ...prev,
          service: {
            ...prev.service,
            rooms: selectedRooms
          }
        }));
      } catch (error) {
        console.error('Error parsing selected rooms:', error);
      }
    }
    // Only run this effect when params.selectedRooms changes
  }, [params.selectedRooms]);

  const handleProcessPayment = () => {
    // In a real app, this would process the payment and navigate to a confirmation screen
    router.push('/booking/success');
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
          
          <Text style={styles.headerTitle}>Checkout</Text>
          
          <TouchableOpacity style={styles.moreButton}>
            <MoreVertical size={24} color={Colors.light.secondary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Cleaner Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cleaner:</Text>
          <View style={styles.cleanerContainer}>
            <View style={styles.iconCircle}>
              <UserIcon width={24} height={24} color={Colors.light.secondary} />
            </View>
            <View style={styles.cleanerInfo}>
              <Text style={styles.cleanerName}>{bookingDetails.cleaner.name}</Text>
              <Text style={styles.cleanerSpecialty}>{bookingDetails.cleaner.specialty}</Text>
            </View>
          </View>
        </View>
        
        {/* Service Type Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type of service</Text>
          <View style={styles.serviceContainer}>
            <View style={styles.iconCircle}>
              <HomeAddressIcon width={24} height={24} color={Colors.light.secondary} />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceType}>{bookingDetails.service.type}</Text>
              <Text style={styles.serviceTime}>{bookingDetails.service.timeRange} ({bookingDetails.service.duration})</Text>
            </View>
          </View>
          
          {/* Rooms List */}
          <View style={styles.roomsContainer}>
            {/* Living Room */}
            {bookingDetails.service.rooms.livingRoom > 0 && (
              <>
                <View style={styles.roomItem}>
                  <LivingRoomIcon width={24} height={24} color={Colors.light.secondary} />
                  <Text style={styles.roomText}>
                    Living room {bookingDetails.service.rooms.livingRoom > 1 ? `(${bookingDetails.service.rooms.livingRoom})` : ''}
                  </Text>
                </View>
                <View style={styles.roomDivider} />
              </>
            )}
            
            {/* Bedrooms */}
            {bookingDetails.service.rooms.bedrooms && bookingDetails.service.rooms.bedrooms.length > 0 && (
              <>
                <View style={styles.roomItem}>
                  <BedroomIcon width={24} height={24} color={Colors.light.secondary} />
                  <View style={styles.bedroomsContainer}>
                    <Text style={styles.roomText}>Bedrooms</Text>
                    <Check size={20} color={Colors.light.primary} />
                  </View>
                </View>
                
                {/* Bedroom List */}
                {bookingDetails.service.rooms.bedrooms.map((bedroom, index) => (
                  <View key={index} style={styles.bedroomItem}>
                    <Text style={styles.bedroomText}>{bedroom}</Text>
                  </View>
                ))}
                <View style={styles.roomDivider} />
              </>
            )}
            
            {/* Bathrooms */}
            {bookingDetails.service.rooms.bathrooms && bookingDetails.service.rooms.bathrooms.length > 0 && (
              <>
                <View style={styles.roomItem}>
                  <BathroomIcon width={24} height={24} color={Colors.light.secondary} />
                  <Text style={styles.roomText}>
                    Bathrooms {bookingDetails.service.rooms.bathrooms.length > 1 ? `(${bookingDetails.service.rooms.bathrooms.length})` : ''}
                  </Text>
                </View>
                <View style={styles.roomDivider} />
              </>
            )}
            
            {/* Kitchen */}
            {bookingDetails.service.rooms.kitchen && (
              <>
                <View style={styles.roomItem}>
                  <KitchenIcon width={24} height={24} color={Colors.light.secondary} />
                  <Text style={styles.roomText}>Kitchen</Text>
                </View>
                <View style={styles.roomDivider} />
              </>
            )}
            
            {/* Office */}
            {bookingDetails.service.rooms.office && (
              <>
                <View style={styles.roomItem}>
                  <OfficeIcon width={24} height={24} color={Colors.light.secondary} />
                  <Text style={styles.roomText}>Office</Text>
                </View>
                <View style={styles.roomDivider} />
              </>
            )}
          </View>
        </View>
        
        {/* Date and Time Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date and Time:</Text>
          <View style={styles.dateTimeContainer}>
            <View style={styles.iconCircle}>
              <CalendarIcon width={24} height={24} color={Colors.light.secondary} />
            </View>
            <View style={styles.dateTimeInfo}>
              <Text style={styles.dateText}>
                {bookingDetails.dateTime.day}
              </Text>
              <Text style={styles.dateSubtext}>
                {bookingDetails.dateTime.date}
              </Text>
            </View>
            <View style={styles.timeInfo}>
              <Text style={styles.timeText}>{bookingDetails.dateTime.startTime}</Text>
              <Text style={styles.timeText}>{bookingDetails.dateTime.endTime}</Text>
            </View>
          </View>
        </View>
        
        {/* Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <View style={styles.addressContainer}>
            <View style={styles.iconCircle}>
              <HomeAddressIcon width={24} height={24} color={Colors.light.secondary} />
            </View>
            <View style={styles.addressInfo}>
              <Text style={styles.addressName}>{bookingDetails.address.name}</Text>
              <Text style={styles.addressText}>
                {bookingDetails.address.street}, {bookingDetails.address.region}
              </Text>
            </View>
          </View>
        </View>
        
        {/* Payment Method Section */}
        <View style={styles.section}>
          <View style={styles.paymentMethodHeader}>
            <Text style={styles.sectionTitle}>Payment method</Text>
            <TouchableOpacity onPress={() => router.push('/booking/payment')}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentMethodContainer}>
            <View style={styles.cardIconContainer}>
              <CreditCard size={24} color="#fff" />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentMethod}>{bookingDetails.payment.method}</Text>
              <Text style={styles.cardHolder}>{bookingDetails.payment.cardHolder}</Text>
            </View>
          </View>
        </View>
        
        {/* Payment Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment summary</Text>
          <View style={styles.paymentSummaryContainer}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Subtotal</Text>
              <Text style={styles.paymentValue}>${bookingDetails.payment.subtotal}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Service</Text>
              <Text style={styles.paymentValue}>${bookingDetails.payment.serviceFee}</Text>
            </View>
            <View style={styles.paymentDivider} />
            <View style={styles.paymentRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${bookingDetails.payment.total}</Text>
            </View>
          </View>
          
          <Text style={styles.paymentDisclaimer}>
            We will make an initial charge to your payment method. Any adjustments will be made when your order is delivered.
          </Text>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalToPayLabel}>Total to pay</Text>
          <Text style={styles.totalToPayValue}>$ {bookingDetails.payment.total}</Text>
        </View>
        <Button 
          title="Process Payment" 
          onPress={handleProcessPayment}
          style={styles.paymentButton}
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
    paddingTop: 10,
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
  section: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.gray,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.secondary,
    marginBottom: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.blueService,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cleanerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cleanerInfo: {
    marginLeft: 12,
  },
  cleanerName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  cleanerSpecialty: {
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceInfo: {
    marginLeft: 12,
  },
  serviceType: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  serviceTime: {
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  roomsContainer: {
    marginLeft: 8,
  },
  roomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  roomDivider: {
    height: 0,
    backgroundColor: Colors.light.gray,
    marginBottom: 4,
    marginLeft: 36,
  },
  roomText: {
    fontSize: 16,
    color: Colors.light.secondary,
    marginLeft: 18,
  },
  bedroomsContainer: {
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 0,
  },
  bedroomItem: {
    marginLeft: 42,
    marginBottom: 8,
  },
  bedroomText: {
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeInfo: {
    marginLeft: 12,
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  dateSubtext: {
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  timeInfo: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 16,
    color: Colors.light.secondary,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressInfo: {
    marginLeft: 12,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  addressText: {
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  changeText: {
    fontSize: 14,
    color: '#46CDCF',
    fontWeight: '600',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A87C9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentInfo: {
    marginLeft: 12,
  },
  paymentMethod: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  cardHolder: {
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  paymentSummaryContainer: {
    marginBottom: 16,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  paymentValue: {
    fontSize: 14,
    color: Colors.light.secondary,
    fontWeight: '500',
  },
  paymentDivider: {
    height: 1,
    backgroundColor: Colors.light.gray,
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.secondary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.secondary,
  },
  paymentDisclaimer: {
    fontSize: 14,
    color: Colors.light.darkGray,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.light.gray,
    backgroundColor: Colors.light.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalContainer: {
    flex: 1,
  },
  totalToPayLabel: {
    fontSize: 14,
    color: Colors.light.darkGray,
  },
  totalToPayValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.secondary,
  },
  paymentButton: {
    flex: 1,
    marginLeft: 16,
  },
});