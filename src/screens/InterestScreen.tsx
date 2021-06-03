import * as React from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import Question from '../components/Question' ;
import {interests} from "../constants/Interests" ;

export default function InterestScreen({navigation} : {navigation : any}) {
  
  var interestButtons : any[] = [];

  var gifteeInterests = [];

  interests.forEach(element => {
    const [showButton, setShowButton] = React.useState(true);

    interestButtons.push(
      (showButton ? (<Button onPress={() => {
        gifteeInterests.push({element})
        setShowButton(!showButton)
      }} title={element} />
    ) : null))
  });
  
  return (
    <View style={styles.question}>
      <Question questionText={"What's their interest"}/>
      {interestButtons}
      <Button onPress={() => {
        // send post request to backend server
        navigation.navigate('Interest')
      }} title="Let's go" />
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