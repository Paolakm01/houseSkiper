import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '../../constants/Colors';

// Import SVG files directly
import HomeNormal from '../../assets/icons/tabbar/home_normal.svg';
import HomePressed from '../../assets/icons/tabbar/home_pressed.svg';
import ReservationNormal from '../../assets/icons/tabbar/reservation_normal.svg';
import ReservationPressed from '../../assets/icons/tabbar/reservation_pressed.svg';
import NotificationNormal from '../../assets/icons/tabbar/notification_normal.svg';
import NotificationPressed from '../../assets/icons/tabbar/notification_pressed.svg';
import ProfileNormal from '../../assets/icons/tabbar/profile_normal.svg';
import ProfilePressed from '../../assets/icons/tabbar/profile_pressed.svg';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.darkGray,
        tabBarStyle: {
          height: 74,
          paddingBottom: 8,
          paddingTop: 5,
          position: 'absolute',
          bottom: 5,
          left: 0,
          right: 0,
          elevation: 12,
          borderTopWidth: 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            focused ? 
            <HomePressed width={24} height={24} /> : 
            <HomeNormal width={24} height={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ focused }) => (
            focused ? 
            <ReservationPressed width={24} height={24} /> : 
            <ReservationNormal width={24} height={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) => (
            focused ? 
            <NotificationPressed width={24} height={24} /> : 
            <NotificationNormal width={24} height={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            focused ? 
            <ProfilePressed width={24} height={24} /> : 
            <ProfileNormal width={24} height={24} />
          ),
        }}
      />
    </Tabs>
  );
}