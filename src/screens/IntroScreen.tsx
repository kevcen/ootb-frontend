import * as React from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';
import Question from '../components/Question'
// import { Container, Header, Content, Button } from 'native-base';


export default function IntroScreen() {
  return (
    <View style={styles.question}>
      <Question questionText={"Please tell us a bit about more about the receiver"}/>
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