
import { Pressable, Text, View, Modal, Alert, ScrollView, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { gpNameFromMeeting } from './gpNames';
import { sessionsByYear } from './sessionsByYear.js';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Row, Col } from './RowColumn';
import { Link, router } from 'expo-router';


// Props come from the parent (App): `visible` controls the modal, `onClose` hides it,
// and `onGetInfo` receives the chosen session_key so the parent can run the API call.
export function SessionSelector({ visible, onClose, onGetInfo }) {
    // The picker selections live here because only this component uses them.


    const [selectedYear, setSelectedYear] = useState('2026');
    const [selectedGrandPrix, setSelectedGrandPrix] = useState('');
    const [activityType, setActivityType] = useState('');
    const [selectedMeetingKey, setSelectedMeetingKey] = useState('');
    const [selectedSessionKey, setSelectedSessionKey] = useState('');

    // Year -> object of session types, e.g. { 'Race': [...], 'Qualifying': [...] }
    // Falls back to {} so an unknown year can't crash Object.keys below. Claud///..[]\[[e Start
    const sessionsForYear = sessionsByYear[selectedYear] || {};

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

    const handleGetInfo = () => {
        onGetInfo(selectedSessionKey);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            allowSwipeDismissal={true}
            onRequestClose={() => {
                Alert.alert('Session selected!');
                setSessionSelectorModalVisible(false);
            }}
            >
            <View style={styles.modalOverlay}>
            <View style={styles.sessionSelectorModal}>
                <View style={styles.pickerContainer}>
                    {/* Year: Object.keys still works here, the top level is still keyed by year */}
                    <Picker selectedValue={selectedYear} onValueChange={handleYearChange}>
                    {Object.keys(sessionsByYear).map((y) => (
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
                    <Picker.Item label="Select Session" value="" />
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
                <Pressable onPress={onClose} >
                    <Text>Close</Text>
                </Pressable>
            </View>
            </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sessionSelectorModal: {
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
});