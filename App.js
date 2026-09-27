import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios'; // HTTP client for making API requests
import { useState } from 'react';




export default function App() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedGrandPrix, setSelectedGrandPrix] = useState('');
  const [activityType, setActivityType] = useState('');

  const yearsListOpenF1 = [2023, 2024, 2025, 2026, 2027]; // all the years of F1 available on OpenF1 servers
  const grandPrixList = [
  "Austrian Grand Prix",
  "Spanish Grand Prix",
  "Barcelona-Catalunya Grand Prix",
  "Madrid Grand Prix",
  "Belgian Grand Prix",
  "British Grand Prix",
  "Dutch Grand Prix",
  "Emilia Romagna Grand Prix",
  "Hungarian Grand Prix",
  "Italian Grand Prix",
  "Monaco Grand Prix",
  "Canadian Grand Prix",
  "United States Grand Prix",
  "Miami Grand Prix",
  "Las Vegas Grand Prix",
  "Mexico City Grand Prix",
  "São Paulo Grand Prix",
  "Bahrain Grand Prix",
  "Saudi Arabian Grand Prix",
  "Azerbaijan Grand Prix",
  "Chinese Grand Prix",
  "Japanese Grand Prix",
  "Singapore Grand Prix",
  "Qatar Grand Prix",
  "Abu Dhabi Grand Prix",
  "Australian Grand Prix",
];

  const activityTypes = ["Race", "Qualifying", "Free Practice 3", "Free Practice 2", "Free Practice 1", "Sprint"] 
  // Not all races have sprints. If they do have sprints, they swap FP3 with Sprint Quali

  const SESSION_INFO_API = 

  const handleGetInfo = async (activityDetails) => {
    try {
      console.log('');
    } catch (e) {
        return {error, msg};
    }
    
  };
  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Select a race</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Picker // to select the race year
          selectedValue={selectedYear}
          onValueChange={(itemValue) =>
            setSelectedYear(itemValue)
          }> 
          {yearsListOpenF1.map((x) => {
            return(
            <Picker.Item label={x} value={x} />)
          })}          
        </Picker>


        <Picker // To select the race
          selectedValue={selectedGrandPrix}
          onValueChange={(itemValue) =>
            setSelectedGrandPrix(itemValue)
          }> 
          {grandPrixList.map((x) => {
            return(
            <Picker.Item label={x} value={x} />)
          })}          
        </Picker>

        <Picker // To select the activity type
          selectedValue={activityType}
          onValueChange={(itemValue) =>
            setActivityType(itemValue)
          }> 
          {activityTypes.map((x) => {
            return(
            <Picker.Item label={x} value={x} />)
          })}          
        </Picker>
        <Pressable 
        onPress={handleGetInfo}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : 'white'
          },
          styles.genericButton
        ]}>  
          <Text>Get Info</Text>
        </Pressable>
      </View>

      <View></View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'top',
    backgroundColor: '#163db1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerView: {
    flex: 0.8,
    // Removed height: 0.2 as it conflicts with flex
    // Changed '400px' to the unitless number 400
    minHeight: 50, 
    maxHeight: 50, 
    backgroundColor: '#fffcfc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#080808',
    fontSize: 24,
    includeFontPadding: true,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 8,
    marginBottom: 20,
  },
  genericButton: {
    minWidth: 190,
    height: 58,
    paddingHorizontal: 28,
    backgroundColor: '#E10600',
    borderRadius: 5,
    overflow: 'hidden',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  buttonPressed: {
    backgroundColor: '#B80000',
  },
});
