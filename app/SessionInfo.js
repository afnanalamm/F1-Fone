import { useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View, ScrollView, Modal, Alert, Image} from 'react-native';
import { sessionsByYear } from '../components/sessionsByYear';
import { Row, Col } from '../components/RowColumn.js';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import axios from 'axios';

export default function SessionInfo() {
  const { sessionKey } = useLocalSearchParams();
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let cancelled = false;
    axios
      .get('https://api.openf1.org/v1/sessions', { params: { session_key: sessionKey } })
      .then((res) => {
        if (cancelled) return;
        if (res.data.length) setSession(res.data[0]);
        else setError('Session not found');
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      });
    return () => { cancelled = true; };
  }, [sessionKey]);

  if (error) return <Text>{error}</Text>;
  if (!session) return <Text>Loading...</Text>;

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <SessionCard session={session} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const SessionCard = ({session}) => {
    const session_location = session.location;
    const session_country = session.country_name;
    const session_date_start = session.date_start;
    const session_date_end = session.date_end;
    const session_year = session.year;
    const session_name = session.session_name;


    return(
                <ScrollView>

                    <Row>
                        <Col span={1}><View><Image/></View></Col>
                    </Row>

                    <Row>
                        <Col span={1}><View><Text>Name</Text></View></Col> <Col span={1}><View><Text>{session_name}</Text></View></Col>
                    </Row>
                    <Row>
                        <Col span={1}><View><Text>Location</Text></View></Col> <Col span={1}><View><Text>{session_location}</Text></View></Col>
                    </Row>
                    <Row>
                        <Col span={1}><View><Text>Country</Text></View></Col> <Col span={1}><View><Text>{session_country}</Text></View></Col>
                    </Row>
                    <Row>
                        <Col span={1}><View><Text>Date Started</Text></View></Col> <Col span={1}><View><Text>{session_date_start}</Text></View></Col>
                    </Row>
                    <Row>
                        <Col span={1}><View><Text>Date Ended</Text></View></Col> <Col span={1}><View><Text>{session_date_end}</Text></View></Col>
                    </Row>
                    <Row>
                        <Col span={1}><View><Text>Year</Text></View></Col> <Col span={1}><View><Text>{session_year}</Text></View></Col>
                    </Row>
                    
                    

                </ScrollView>
    );
    
};

const styles = StyleSheet.create({

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
})