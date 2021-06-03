import * as React from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import Question from '../components/Question' ;
import {interests} from "../constants/Interests" ;

export default function InterestScreen() {
  
  var interestButtons : any[] = [];

  interests.forEach(element => {
    interestButtons.push(
      <Button onPress={() => {}} title={element} />
    )
  });
  
  return (
    <View style={styles.question}>
      <Question questionText={"What's their interest"}/>
      {interestButtons}
      <Button onPress={() => {}} title="Let's go" />
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  }
});