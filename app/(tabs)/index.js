import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, ScrollView, Modal, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import React, { useState, useEffect } from 'react';
import { gpNameFromMeeting } from '../../components/gpNames';
import { sessionsByYear } from '../../components/sessionsByYear.js';
import { Row, Col } from '../../components/RowColumn.js';
import { Link, router } from 'expo-router';
import { SessionSelector } from '../../components/SessionSelector'





export default function App({navigation}) {
  
  const [sessionSelectorModalVisible, setSessionSelectorModalVisible] = useState(false)
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [destination, setDestination] = useState('/SessionInfo');

  const openSelector = (pathname) => {
    setDestination(pathname);
    setSelectorVisible(true);
  };
    
  return (
  <ScrollView contentContainerStyle={styles.contentContainer}>
      <StatusBar style="auto" />

      <SessionSelector
        visible={selectorVisible}
        destination={destination}
        onClose={() => setSelectorVisible(false)}
      />

      <View style={styles.headerView}>
        <Text style={styles.headerText}> Hey there! Find the recent F1 info here!</Text> 
        {/* placeholder welcome phrase for now */}
      </View>

       <View style={styles.introButtonsView}>
        <Row>
          <Col span={1}>
            <Pressable style={styles.introButton} onPress={() => openSelector('../SessionInfo')}>
              <Text style={styles.introButtonText}>Session Info</Text>
            </Pressable>
          </Col>
          
          <Col span={1}>
            <Pressable style={styles.introButton} onPress={() => openSelector('../SessionReplay')}>
              <Text style={styles.introButtonText}>Session Replay</Text>
            </Pressable>
          </Col>

        </Row>
        <Row>
          <Col span={0.5}>
            <Pressable style={styles.introButton} onPress={() => {router.replace('../ChampionshipInfo')}}>
              <Text style={styles.introButtonText}>Championship Info</Text></Pressable></Col>

          <Col span={0.5}>
            </Col>
              
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
    backgroundColor: '#736464',
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
  buttonPressed: {
    backgroundColor: '#B80000',
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

});