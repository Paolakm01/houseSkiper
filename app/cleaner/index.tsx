import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Modal, PanResponder, Dimensions } from 'react-native';
import { router, Stack } from 'expo-router';
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, MoveVertical as MoreVertical, Check, Plus, Minus, Calendar, X } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';

// Import SVG icons
import LivingRoomSvg from '../../assets/icons/booking/livingroom.svg';
import BedroomSvg from '../../assets/icons/booking/bedroom.svg';
import BathroomSvg from '../../assets/icons/booking/bathrooms.svg';
import KitchenSvg from '../../assets/icons/booking/kitchen.svg';
import OfficeSvg from '../../assets/icons/booking/office.svg';

// Screen dimensions
const { width: screenWidth } = Dimensions.get('window');

// Months for calendar
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Generate dates for current month
const generateDatesForMonth = (month, year) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dates = [];
  // Add empty spaces for days before the 1st of the month
  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }
  
  // Add the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(i);
  }
  
  return dates;
};

// Time slots with availability
const timeSlots = [
  { time: '9:00 am', available: true },
  { time: '11:00 am', available: true },
  { time: '1:00 pm', available: false },
  { time: '2:00 pm', available: true },
  { time: '4:00 pm', available: true },
  { time: '6:00 pm', available: false },
  { time: '8:00 pm', available: true }
];

export default function BookingScreen() {
  // Current date for calendar
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [calendarDates, setCalendarDates] = useState(generateDatesForMonth(currentMonth, currentYear));
  
  // States for UI
  const [selectedRooms, setSelectedRooms] = useState({
    livingRoom: true,
    bedrooms: true,
    bathrooms: false,
    kitchen: false,
    office: false,
  });
  
  const [roomCounts, setRoomCounts] = useState({
    livingRoom: 1,
    bedrooms: 3,
    bathrooms: 1,
    kitchen: 1,
    office: 1,
  });
  
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState('2:00 pm');
  const [dirtinessLevel, setDirtinessLevel] = useState(30);
  const [showCalendar, setShowCalendar] = useState(false);
  const [timePageIndex, setTimePageIndex] = useState(0);
  const [visibleTimeSlots, setVisibleTimeSlots] = useState(timeSlots.slice(0, 4));
  
  // Pan responder for slider
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const newPosition = Math.max(0, Math.min(100, (gestureState.moveX / screenWidth) * 100));
        setDirtinessLevel(newPosition);
      },
      onPanResponderRelease: () => {
        // Optional: snap to nearest increment
      },
    })
  ).current;
  
  // Toggle room selection
  const toggleRoom = (room) => {
    setSelectedRooms({
      ...selectedRooms,
      [room]: !selectedRooms[room],
    });
  };
  
  // Increment room count
  const incrementRoom = (room) => {
    setRoomCounts({
      ...roomCounts,
      [room]: roomCounts[room] + 1,
    });
  };
  
  // Decrement room count
  const decrementRoom = (room) => {
    if (roomCounts[room] > 1) {
      setRoomCounts({
        ...roomCounts,
        [room]: roomCounts[room] - 1,
      });
    }
  };
  
  // Change month in calendar
  const changeMonth = (increment) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;
    
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setCalendarDates(generateDatesForMonth(newMonth, newYear));
  };
  
  // Select date from calendar
  const selectDate = (day) => {
    if (day) {
      setSelectedDate(day);
      setShowCalendar(false);
    }
  };
  
  // Navigate time slots
  const navigateTimeSlots = (direction) => {
    const maxPages = Math.ceil(timeSlots.length / 4) - 1;
    let newIndex = timePageIndex + direction;
    
    if (newIndex < 0) {
      newIndex = maxPages;
    } else if (newIndex > maxPages) {
      newIndex = 0;
    }
    
    setTimePageIndex(newIndex);
    setVisibleTimeSlots(timeSlots.slice(newIndex * 4, (newIndex * 4) + 4));
  };
  
  // Prepare selected rooms data for confirmation screen
  const prepareSelectedRoomsData = () => {
    const bedroomsList = selectedRooms.bedrooms 
      ? Array.from({ length: roomCounts.bedrooms }, (_, i) => `Bedroom ${i + 1}`)
      : [];
    
    const bathroomsList = selectedRooms.bathrooms
      ? Array.from({ length: roomCounts.bathrooms }, (_, i) => `Bathroom ${i + 1}`)
      : [];
    
    return {
      livingRoom: selectedRooms.livingRoom ? roomCounts.livingRoom : 0,
      bedrooms: bedroomsList,
      bathrooms: bathroomsList,
      kitchen: selectedRooms.kitchen,
      office: selectedRooms.office
    };
  };
  
  // Handle booking confirmation
  const handleConfirmBooking = () => {
    // Prepare the selected rooms data
    const selectedRoomsData = prepareSelectedRoomsData();
    
    // Navigate to booking confirmation screen with selected rooms data
    router.push({
      pathname: '/booking/confirmation',
      params: {
        selectedRooms: JSON.stringify(selectedRoomsData)
      }
    });
  };
  
  // Initialize visible time slots
  React.useEffect(() => {
    setVisibleTimeSlots(timeSlots.slice(0, 4));
  }, []);
  
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
          
          <Text style={styles.headerTitle}>Services</Text>
          
          <TouchableOpacity style={styles.moreButton}>
            <MoreVertical size={24} color={Colors.light.secondary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Living Room */}
        <TouchableOpacity 
          style={[
            styles.roomItem, 
            selectedRooms.livingRoom && styles.roomItemSelected
          ]}
          onPress={() => toggleRoom('livingRoom')}
        >
          <View style={styles.roomInfo}>
            <LivingRoomSvg width={24} height={24} color={Colors.light.secondary} />
            <Text style={styles.roomText}>Living room</Text>
          </View>
          
          {selectedRooms.livingRoom && (
            <View style={styles.checkContainer}>
              <Check size={20} color={Colors.light.secondary} />
            </View>
          )}
        </TouchableOpacity>
        
        {selectedRooms.livingRoom && (
          <View style={styles.counterContainer}>
            <Text style={styles.counterQuestion}>
              How many living rooms do you have?
            </Text>
            
            <View style={styles.counterControls}>
              <TouchableOpacity 
                style={styles.counterButton}
                onPress={() => decrementRoom('livingRoom')}
              >
                <Minus size={20} color={Colors.light.white} />
              </TouchableOpacity>
              
              <Text style={styles.counterValue}>{roomCounts.livingRoom}</Text>
              
              <TouchableOpacity 
                style={styles.counterButton}
                onPress={() => incrementRoom('livingRoom')}
              >
                <Plus size={20} color={Colors.light.white} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* Bedrooms */}
        <TouchableOpacity 
          style={[
            styles.roomItem, 
            selectedRooms.bedrooms && styles.roomItemSelected
          ]}
          onPress={() => toggleRoom('bedrooms')}
        >
          <View style={styles.roomInfo}>
            <BedroomSvg width={24} height={24} color={Colors.light.secondary} />
            <Text style={styles.roomText}>Bedrooms</Text>
          </View>
          
          {selectedRooms.bedrooms && (
            <View style={styles.checkContainer}>
              <Check size={20} color={Colors.light.secondary} />
            </View>
          )}
        </TouchableOpacity>
        
        {selectedRooms.bedrooms && (
          <View style={styles.counterContainer}>
            <Text style={styles.counterQuestion}>
              How many bedrooms do you have?
            </Text>
            
            <View style={styles.counterControls}>
              <TouchableOpacity 
                style={styles.counterButton}
                onPress={() => decrementRoom('bedrooms')}
              >
                <Minus size={20} color={Colors.light.white} />
              </TouchableOpacity>
              
              <Text style={styles.counterValue}>{roomCounts.bedrooms}</Text>
              
              <TouchableOpacity 
                style={styles.counterButton}
                onPress={() => incrementRoom('bedrooms')}
              >
                <Plus size={20} color={Colors.light.white} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* Bathrooms */}
        <TouchableOpacity 
          style={[
            styles.roomItem, 
            selectedRooms.bathrooms && styles.roomItemSelected
          ]}
          onPress={() => toggleRoom('bathrooms')}
        >
          <View style={styles.roomInfo}>
            <BathroomSvg width={24} height={24} color={Colors.light.secondary} />
            <Text style={styles.roomText}>Bathrooms</Text>
          </View>
          
          {selectedRooms.bathrooms && (
            <View style={styles.checkContainer}>
              <Check size={20} color={Colors.light.secondary} />
            </View>
          )}
        </TouchableOpacity>
        
        {selectedRooms.bathrooms && (
          <View style={styles.counterContainer}>
            <Text style={styles.counterQuestion}>
              How many bathrooms do you have?
            </Text>
            
            <View style={styles.counterControls}>
              <TouchableOpacity 
                style={styles.counterButton}
                onPress={() => decrementRoom('bathrooms')}
              >
                <Minus size={20} color={Colors.light.white} />
              </TouchableOpacity>
              
              <Text style={styles.counterValue}>{roomCounts.bathrooms}</Text>
              
              <TouchableOpacity 
                style={styles.counterButton}
                onPress={() => incrementRoom('bathrooms')}
              >
                <Plus size={20} color={Colors.light.white} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* Kitchen */}
        <TouchableOpacity 
          style={[
            styles.roomItem, 
            selectedRooms.kitchen && styles.roomItemSelected
          ]}
          onPress={() => toggleRoom('kitchen')}
        >
          <View style={styles.roomInfo}>
            <KitchenSvg width={24} height={24} color={Colors.light.secondary} />
            <Text style={styles.roomText}>Kitchen</Text>
          </View>
          
          {selectedRooms.kitchen && (
            <View style={styles.checkContainer}>
              <Check size={20} color={Colors.light.secondary} />
            </View>
          )}
        </TouchableOpacity>
        
        {selectedRooms.kitchen && (
          <View style={styles.counterContainer}>
            <Text style={styles.counterQuestion}>
              How many kitchens do you have?
            </Text>
            
            <View style={styles.counterControls}>
              <TouchableOpacity 
                style={styles.counterButton}
                onPress={() => decrementRoom('kitchen')}
              >
                <Minus size={20} color={Colors.light.white} />
              </TouchableOpacity>
              
              <Text style={styles.counterValue}>{roomCounts.kitchen}</Text>
              
              <TouchableOpacity 
                style={styles.counterButton}
                onPress={() => incrementRoom('kitchen')}
              >
                <Plus size={20} color={Colors.light.white} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* Office */}
        <TouchableOpacity 
          style={[
            styles.roomItem, 
            selectedRooms.office && styles.roomItemSelected
          ]}
          onPress={() => toggleRoom('office')}
        >
          <View style={styles.roomInfo}>
            <OfficeSvg width={24} height={24} color={Colors.light.secondary} />
            <Text style={styles.roomText}>Office</Text>
          </View>
          
          {selectedRooms.office && (
            <View style={styles.checkContainer}>
              <Check size={20} color={Colors.light.secondary} />
            </View>
          )}
        </TouchableOpacity>
        
        {selectedRooms.office && (
          <View style={styles.counterContainer}>
            <Text style={styles.counterQuestion}>
              How many offices do you have?
            </Text>
            
            <View style={styles.counterControls}>
              <TouchableOpacity 
                style={styles.counterButton}
                onPress={() => decrementRoom('office')}
              >
                <Minus size={20} color={Colors.light.white} />
              </TouchableOpacity>
              
              <Text style={styles.counterValue}>{roomCounts.office}</Text>
              
              <TouchableOpacity 
                style={styles.counterButton}
                onPress={() => incrementRoom('office')}
              >
                <Plus size={20} color={Colors.light.white} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        {/* Date Selection */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Date</Text>
            <TouchableOpacity 
              style={styles.monthSelector}
              onPress={() => setShowCalendar(true)}
            >
              <Text style={styles.monthText}>{months[currentMonth]} {currentYear}</Text>
              <ChevronDown size={16} color={Colors.light.secondary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.dateContainer}>
            {Array.from({ length: 7 }, (_, i) => {
              const date = new Date(currentYear, currentMonth, i + 1);
              const day = date.getDate();
              const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
              
              return (
                <TouchableOpacity 
                  key={i}
                  style={[
                    styles.dateItem,
                    selectedDate === day && styles.dateItemSelected
                  ]}
                  onPress={() => selectDate(day)}
                >
                  <Text style={[
                    styles.dayText,
                    selectedDate === day && styles.dateTextSelected
                  ]}>
                    {dayName}
                  </Text>
                  <Text style={[
                    styles.dateText,
                    selectedDate === day && styles.dateTextSelected
                  ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
        {/* Time Selection */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Time</Text>
            <View style={styles.timeNavigation}>
              <TouchableOpacity 
                style={styles.timeNavButton}
                onPress={() => navigateTimeSlots(-1)}
              >
                <ChevronLeft size={20} color={Colors.light.secondary} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.timeNavButton}
                onPress={() => navigateTimeSlots(1)}
              >
                <ChevronRight size={20} color={Colors.light.secondary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.timeContainer}>
            {visibleTimeSlots.map((slot, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.timeItem,
                  selectedTime === slot.time && styles.timeItemSelected,
                  !slot.available && styles.timeItemDisabled
                ]}
                onPress={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
              >
                <Text style={[
                  styles.timeText,
                  selectedTime === slot.time && styles.timeTextSelected,
                  !slot.available && styles.timeTextDisabled
                ]}>
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Dirtiness Level */}
        <View style={styles.dirtinessContainer}>
          <Text style={styles.dirtinessTitle}>Level of dirtiness:</Text>
          
          <View style={styles.sliderContainer}>
            <View 
              style={styles.sliderTrack}
              {...panResponder.panHandlers}
            >
              <View 
                style={[
                  styles.sliderFill, 
                  { width: `${dirtinessLevel}%` }
                ]} 
              />
              <View 
                style={[
                  styles.sliderThumb,
                  { left: `${dirtinessLevel}%` }
                ]}
              />
            </View>
            
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>Normal</Text>
              <Text style={styles.sliderLabelText}>Very dirty</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Confirm booking" 
          onPress={handleConfirmBooking}
        />
      </View>
      
      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>Select Date</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowCalendar(false)}
              >
                <X size={24} color={Colors.light.secondary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.monthNavigation}>
              <TouchableOpacity 
                style={styles.monthNavButton}
                onPress={() => changeMonth(-1)}
              >
                <ChevronLeft size={24} color={Colors.light.secondary} />
              </TouchableOpacity>
              
              <Text style={styles.currentMonthText}>
                {months[currentMonth]} {currentYear}
              </Text>
              
              <TouchableOpacity 
                style={styles.monthNavButton}
                onPress={() => changeMonth(1)}
              >
                <ChevronRight size={24} color={Colors.light.secondary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.weekdaysHeader}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <Text key={index} style={styles.weekdayText}>{day}</Text>
              ))}
            </View>
            
            <View style={styles.calendarGrid}>
              {calendarDates.map((day, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[
                    styles.calendarDay,
                    day === selectedDate && styles.selectedCalendarDay,
                    !day && styles.emptyCalendarDay
                  ]}
                  onPress={() => day && selectDate(day)}
                  disabled={!day}
                >
                  {day && (
                    <Text style={[
                      styles.calendarDayText,
                      day === selectedDate && styles.selectedCalendarDayText
                    ]}>
                      {day}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            
            <Button 
              title="Confirm Date" 
              onPress={() => setShowCalendar(false)}
              style={styles.confirmDateButton}
            />
          </View>
        </View>
      </Modal>
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
  roomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F1F6FF',
    borderRadius: 12,
    marginBottom: 12,
  },
  roomItemSelected: {
    backgroundColor: '#D0ECF6',
  },
  roomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.secondary,
    marginLeft: 12,
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterContainer: {
    backgroundColor: '#D0ECF6',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: -8,
    marginBottom: 12,
  },
  counterQuestion: {
    fontSize: 14,
    color: Colors.light.secondary,
    marginBottom: 12,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#152744',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.secondary,
    marginHorizontal: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F1F6FF',
    borderRadius: 8,
  },
  monthText: {
    fontSize: 14,
    color: Colors.light.secondary,
    marginRight: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateItem: {
    width: 40,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F1F6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateItemSelected: {
    backgroundColor: '#152744',
  },
  dayText: {
    fontSize: 12,
    color: Colors.light.secondary,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  dateTextSelected: {
    color: Colors.light.white,
  },
  timeNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeNavButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeItem: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F1F6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  timeItemSelected: {
    backgroundColor: '#152744',
  },
  timeItemDisabled: {
    backgroundColor: '#F1F6FF',
    opacity: 0.5,
  },
  timeText: {
    fontSize: 14,
    color: Colors.light.secondary,
  },
  timeTextSelected: {
    color: Colors.light.white,
  },
  timeTextDisabled: {
    color: Colors.light.darkGray,
    textDecorationLine: 'line-through',
  },
  dirtinessContainer: {
    marginBottom: 30,
  },
  dirtinessTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.secondary,
    marginBottom: 16,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#F1F6FF',
    borderRadius: 2,
    position: 'relative',
    marginVertical: 10,
  },
  sliderFill: {
    height: 4,
    backgroundColor: '#152744',
    borderRadius: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#152744',
    position: 'absolute',
    top: -8,
    marginLeft: -10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderLabelText: {
    fontSize: 12,
    color: Colors.light.secondary,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.light.gray,
    backgroundColor: Colors.light.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    width: '90%',
    backgroundColor: Colors.light.white,
    borderRadius: 16,
    padding: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.secondary,
  },
  closeButton: {
    padding: 4,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthNavButton: {
    padding: 8,
  },
  currentMonthText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.secondary,
  },
  weekdaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekdayText: {
    fontSize: 12,
    color: Colors.light.darkGray,
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  calendarDay: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedCalendarDay: {
    backgroundColor: '#152744',
    borderRadius: 20,
  },
  emptyCalendarDay: {
    backgroundColor: 'transparent',
  },
  calendarDayText: {
    fontSize: 14,
    color: Colors.light.secondary,
  },
  selectedCalendarDayText: {
    color: Colors.light.white,
  },
  confirmDateButton: {
    marginTop: 16,
  },
});