import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Button, ScrollView, Modal, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios'; // HTTP client for making API requests
import { useState } from 'react';
import { gpNameFromMeeting } from '../components/gpNames.js';
import { raceSessionsByYear } from '../components/sessionsByYear.js';
import { Row, Col } from '../components/RowColumn.js';

export default function ChampionshipInfo() {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
            {/* container scrollview */}
                <View style={styles.container}>
                    <Pressable style={styles.backButton}>
                        <Text style={styles.backText}>Back Button</Text>
                        {/* take user back to the Race tab */}
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Driver's championship</Text>
                        {/* redirect to the driver's championship stats page */}
                    </Pressable>

                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Constructor's championship</Text>
                        {/* same as above but for constructors */}
                    </Pressable>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    backButton: {
        paddingVertical: 8,
        marginBottom: 16,
    },
    backText: {
        fontSize: 16,
    },
    button: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
    },
});