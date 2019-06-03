import React from "react";
import { Text, StyleSheet, View, Button} from "react-native";
import { getDeck } from '../utils/helpers'

class Deck extends React.Component {
  
  state = {
    currentDeck:null,
  }
  componentDidMount() {
    deckTitle = this.props.navigation.state.params.currentDeck.title
     //async
     getDeck(deckTitle).then((res) => { 
      this.setState({currentDeck:res})})
  }

  static navigationOptions = ({navigation}) => {
    const { currentDeck } = navigation.state.params;
     return {
      title:currentDeck.title,
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTitleStyle: {
        textAlign: 'center'      
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
     }
  }   
   startQuiz = () => {
    this.props.navigation.navigate('Quiz', {currentDeck:this.props.navigation.state.params.currentDeck})
   }

   manualUpdateDeck = () => {
    deckTitle = this.props.navigation.state.params.currentDeck.title
    //async
    getDeck(deckTitle).then((res) => { 
     this.setState({currentDeck:res})})
   } 

   handleDeleteDeck = () => {
      
   }

   showDeck = () => {
    const currentDeck = this.state.currentDeck;
     return (
      <View style={[styles.container, { alignItems: "center" }]}>
        <Text style={styles.cardTitle}>{this.state.currentDeck.title}</Text>
        <Text style={styles.cardNumber}>
          {currentDeck.questions.length} cards
        </Text>
        <View style={{ width: "30%", textAlign: "center", marginTop: 300 }}>
          <Button onPress={()=>this.props.navigation.navigate('AddCard', {deckTitle:this.props.navigation.state.params.currentDeck.title ,  manualUpdate:this.props.navigation.state.params.manualUpdate, manualUpdateDeck:this.manualUpdateDeck})} 
           title="Add Card" color="#f4511e" />
        </View>
        <View style={{ width: "30%", textAlign: "center", marginTop: 30 }}>
          <Button
            onPress={this.startQuiz}
            title="Start Quiz"
            color="#000000"
          />
        </View>
        <View style={{ width: "30%", textAlign: "center", marginTop: 30 }}>
         <Text 
           onPress={this.handleDeleteDeck}
           style={styles.deleteText}>
           Delete Deck
          </Text>
        </View>
        </View>    
     )
   }

  render() {
   
    return (
      <View style={[styles.container, { alignItems: "center" }]}>
       { this.state.currentDeck 
        ? this.showDeck()
        : null}
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    cardTitle: {
      fontSize:30,
      fontWeight:'bold',
      textAlign:'center',
      marginTop:50
    },
    cardNumber: {
      textAlign:'center',
      fontSize:20
    },
    deleteText: {
      color:'#f4511e',
      fontSize:22,
      textAlign:'center'
    }
  });

export default Deck;