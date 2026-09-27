import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Button } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios'; // HTTP client for making API requests
import { useState } from 'react';
import { gpNameFromMeeting } from '../../components/gpNames';
import { raceSessionsByYear } from '../../components/raceSessionsByYear.js';




export default function Race() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedGrandPrix, setSelectedGrandPrix] = useState('');
  const [activityType, setActivityType] = useState('');
  const [selectedMeetingKey, setSelectedMeetingKey] = useState('');
  const [selectedSessionKey, setSelectedSessionKey] = useState('');



  const activityTypes = ["Race", "Qualifying", "Free Practice 3", "Free Practice 2", "Free Practice 1", "Sprint"] 
  // Not all races have sprints. If they do have sprints, they swap FP3 with Sprint Quali

  const SESSION_INFO_API = "https://api.openf1.org/v1/sessions?";

  const handleGetInfo = async () => {
    try {
      console.log(selectedYear, selectedSessionKey);

      const selected_race_info_response = await axios.get(`${SESSION_INFO_API}session_key=${selectedSessionKey}`); // get the selected race info from the server, and store everything as the request. Not to be confused with the required 'race data' as this variable also stores headers and stuff, whereas the next one doesn't
      console.clear();
      const race_info_data = selected_race_info_response.data
      console.log(race_info_data); // This is an array: [{...}]
      
      // Access the first element of the array using [0]
      if (race_info_data && race_info_data.length > 0) {
        console.log(race_info_data[0].location); // Now targets the object inside, outputs: 2026
        return race_info_data[0];            // Returns just the specific race object
      }

      return(race_info_data);
    } catch (e) { 
      // error parameters to match the caught exception variable 'e'
      console.error("API Error:", e);
      return { error: true, msg: e.message }; 
    }
    
  };
  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Select a race</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Picker selectedValue={selectedYear} onValueChange={setSelectedYear}>
          {Object.keys(raceSessionsByYear).map((y) => (
            <Picker.Item key={y} label={y} value={y} />
          ))}
        </Picker>

        <Picker selectedValue={selectedSessionKey} onValueChange={setSelectedSessionKey}>
          {(raceSessionsByYear[selectedYear] || [])
          .filter(s => !s.is_cancelled)
          .map((s) => (
            <Picker.Item
              key={s.session_key}
              label={gpNameFromMeeting(s)}
              value={s.session_key}
            />
          ))}
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
