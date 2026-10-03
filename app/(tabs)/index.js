import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Button, ScrollView, Modal, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios'; // HTTP client for making API requests
import { useState } from 'react';
import { gpNameFromMeeting } from '../../components/gpNames';
import { raceSessionsByYear } from '../../components/raceSessionsByYear.js';
import { Row, Col } from '../../components/RowColumn.js';




export default function Race() {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedGrandPrix, setSelectedGrandPrix] = useState('');
  const [activityType, setActivityType] = useState('');
  const [selectedMeetingKey, setSelectedMeetingKey] = useState('');
  const [selectedSessionKey, setSelectedSessionKey] = useState('');

  // Year -> object of session types, e.g. { 'Race': [...], 'Qualifying': [...] }
  // Falls back to {} so an unknown year can't crash Object.keys below. Claud///..[]\[[e Start
  const sessionsForYear = raceSessionsByYear[selectedYear] || {};

  // The session types available for the chosen year ('Race', 'Sprint', etc.)
  const activityTypes = Object.keys(sessionsForYear);

  // The actual sessions for year + type, with cancelled ones removed.
  // Falls back to [] until a type is picked, since activityType starts as ''.
  const sessionsForActivity = (sessionsForYear[activityType] || [])
    .filter((s) => !s.is_cancelled);

  // Changing the year invalidates the type and session picks below it,
  // so clear both. Otherwise you can end up holding a session_key
  // that doesn't exist in the new year.
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setActivityType('');
    setSelectedSessionKey('');
  };

  // Same idea one level down: a new session type clears the session pick.
  const handleActivityChange = (type) => {
    setActivityType(type);
    setSelectedSessionKey('');
  }; // C.la--- ude End

  const [raceSelectorModalVisible, setRaceSelectorModalVisible] = useState(false)
  
  const launchRaceSelectorModal = async () => {
    setRaceSelectorModalVisible(true) // reverse the current state of the visibility of modal

  }

  const SESSION_INFO_API = "https://api.openf1.org/v1/sessions?";

  const handleGetInfo = async () => {
    try {
          // Without this, the request goes out as ?session_key= and returns junk
      if (!selectedSessionKey) {
        Alert.alert('Pick a session first');
        return null;
      }
      const selected_race_info_response = await axios.get(`${SESSION_INFO_API}session_key=${selectedSessionKey}`); // get the selected race info from the server, and store everything as the request. Not to be confused with the required 'race data' as this variable also stores headers and stuff, whereas the next one doesn't
      console.log(selected_race_info_response.data);
      console.clear();
      const race_info_data = selected_race_info_response.data
      console.log(race_info_data); // This is an array: [{...}]
      
      // Access the first element of the array using [0]
      if (race_info_data && race_info_data.length > 0) {
        console.log(race_info_data[0].location); // Now targets the object inside, outputs: 2026
        return race_info_data[0];            // Returns just the specific race object
      }

      console.log("API response:", race_info_data);
      return(race_info_data);
    } catch (e) { 
      // error parameters to match the caught exception variable 'e'
      console.error("API Error:", e);
      return { error: true, msg: e.message }; 
    }
    
  };
  
  return (
  <ScrollView contentContainerStyle={styles.contentContainer}>
      <StatusBar style="auto" />

      <Modal
          animationType="slide"
          transparent={true}
          visible={raceSelectorModalVisible}
          allowSwipeDismissal={true}
          onRequestClose={() => {
            Alert.alert('Race session selected!');
            setRaceSelectorModalVisible(false);
          }}
          >
        <View style={styles.modalOverlay}>
          <View style={styles.raceSelectorModal}>
              <View style={styles.pickerContainer}>
                {/* Year: Object.keys still works here, the top level is still keyed by year */}
                <Picker selectedValue={selectedYear} onValueChange={handleYearChange}>
                  {Object.keys(raceSessionsByYear).map((y) => (
                    <Picker.Item key={y} label={y} value={y} />
                  ))}
                </Picker>

                {/* Session type: new picker, built from the keys of the selected year */}
                <Picker selectedValue={activityType} onValueChange={handleActivityChange}>
                  {/* Placeholder so '' is a valid selection and the picker doesn't
                      silently show the first real item while state says nothing is picked */}
                  <Picker.Item label="Select session type" value="" />
                  {activityTypes.map((type) => (
                    <Picker.Item key={type} label={type} value={type} />
                  ))}
                </Picker>

                {/* Specific session: same as before, but fed from the flattened list above */}
                <Picker selectedValue={selectedSessionKey} onValueChange={setSelectedSessionKey}>
                  <Picker.Item label="Select Grand Prix" value="" />
                  {sessionsForActivity.map((s) => (
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
              <Pressable onPress={() => setRaceSelectorModalVisible(false)}>
                <Text>Close</Text>
              </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.headerView}>
        <Text style={styles.headerText}> Hey there! Find the recent F1 info here!</Text> 
        {/* placeholder welcome phrase for now */}
      </View>

       <View style={styles.introButtonsView}>
        <Row>
          <Col span={1}>
            <Pressable style={styles.introButton} onPress={launchRaceSelectorModal}>
              <Text style={styles.introButtonText}>Session Info</Text></Pressable></Col>
          
          <Col span={1}>
            <Pressable style={styles.introButton}>
              <Text style={styles.introButtonText}>Race Replay </Text></Pressable></Col>

        </Row>
        <Row>
          <Col span={0.5}>
            <Pressable style={styles.introButton}>
              <Text style={styles.introButtonText}>Championship Info</Text></Pressable></Col>
              
        </Row>
      </View>
      
    <View>
    </View>
  </ScrollView>

  )
}

export const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: '#ded416',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerView: {
    flex: 0.9,
    // Removed height: 0.2 as it conflicts with flex
    // Changed '400px' to the unitless number 400
    minHeight: 50, 
    maxHeight: 50, 
    backgroundColor: '#fffcfc',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  headerText: {
    color: '#080808',
    fontSize: 24,
    includeFontPadding: true,
    
  },
  introButtonsView: {
    flex: 0, // the number of columns you want to devide the screen into {original author's comments kept by me}
    marginHorizontal: "auto",
    height: 50,
    width: `90%`,
    backgroundColor: '#736464`'
  },
  row: {
    flexDirection: "row"
  },
  introButton: {
    color: '#c10000',
    textAlign: 'center',
    height: 50,
    flexWrap: 'wrap',
  },
  introButtonText: {
    color: '#080808',
    fontSize: 24,
    includeFontPadding: true,
    textAlign: 'center',
  },
    "0.5col":  {
    backgroundColor:  "lightblue",
    borderColor:  "#fff",
    borderWidth:  1,
    flex:  0.5
  },
  "1col":  {
    backgroundColor:  "lightblue",
    borderColor:  "#fff",
    borderWidth:  1,
    flex:  1
  },
  "2col":  {
    backgroundColor:  "green",
    borderColor:  "#fff",
    borderWidth:  1,
    flex:  2
  },
  "3col":  {
    backgroundColor:  "orange",
    borderColor:  "#fff",
    borderWidth:  1,
    flex:  3
  },
  "4col":  {
    backgroundColor:  "pink",
    borderColor:  "#fff",
    flex:  4
  },
  raceSelectorModal: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
  },
  raceSelectorModal: {
      width: '90%',
      height: '80%',
      // rest of your existing styles
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
