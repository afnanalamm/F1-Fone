import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Button, ScrollView, Modal, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios'; // HTTP client for making API requests
import { useState } from 'react';
import { gpNameFromMeeting } from '../components/gpNames.js';
import { raceSessionsByYear } from '../components/sessionsByYear.js';
import { Row, Col } from '../components/RowColumn.js';
import { SessionSelector} from '../components/SessionSelector.js'


export default function SessionReplay() {
    return(
        <SafeAreaProvider>
            <SafeAreaView>



            </SafeAreaView>
        </SafeAreaProvider>
      );
}