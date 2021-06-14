import React, {useRef, useState} from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Question from "../../../components/Question";
import MultipleOptionQuestion from "../../../components/Quiz/MultipleOptionQuestion";
import QuizNavigator from "../../../components/Quiz/QuizNavigator";
import SingleOptionQuestion from "../../../components/Quiz/SingleOptionQuestion";
import Instruments from "../../../constants/Instruments";
import Genres from "../../../constants/Genres";
import yesNo from "../../../constants/YesNo";
import { styles } from "../../../styles/quiz";
import AddNewButton from "../../../components/Quiz/AddNewButton";
import TagData from "../../../interfaces/TagData";

export default function RecipientContextScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  var chosenInstruments = useRef(new Set());
  var chosenGenres = useRef(new Set());
  var [instruments, setInstruments] = useState(Instruments);
  var [genres, setGenres] = useState(Genres);

  return (
    <View style={styles.viewCentered}>
      <ScrollView
        style={styles.scrollable}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Question questionText={"What instruments do you play?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={instruments}
          onTagPress={(instrument) => {
            if (chosenInstruments.current.has(instrument)) {
              chosenInstruments.current.delete(instrument);
            } else {
              chosenInstruments.current.add(instrument);
            }
          }}
        />
        <View style={styles.space} />
        <AddNewButton
          setCats={(instr: TagData) => {
            setInstruments(instruments.concat(instr));
          }}
        />
        <View style={styles.space} />
        <Question questionText={"What genres of music do you like?"} />
        <View style={styles.space} />
        <MultipleOptionQuestion
          tagdata={genres}
          onTagPress={(genre) => {
            if (chosenGenres.current.has(genre)) {
              chosenGenres.current.delete(genre);
            } else {
              chosenGenres.current.add(genre);
            }
          }}
        />
        <View style={styles.space} />
        <AddNewButton
          setCats={(gen: TagData) => {
            setGenres(genres.concat(gen));
          }}
        />
        <View style={styles.space} />
      </ScrollView>
      <QuizNavigator
        currentpage={{
          pagename: "Music",
          params: { ...route.params },
        }}
        navigation={navigation}
        prev={{
          pagename: route.params.nextpages[route.params.nextpageindex - 2] || "RecipientCategories",
          params: {
            nextpageindex: route.params.nextpageindex - 1,
          },
        }}
        next={{
          pagename:
            route.params.nextpages[route.params.nextpageindex] ||
            "RecipientRecommendations",
          params: {
            nextpageindex: route.params.nextpageindex + 1,
            chosenGenres,
            chosenInstruments,
          },
        }}
        pagenum={route.params.pagenum}
        totalpages={route.params.totalpages}
      />
    </View>
  );
}
