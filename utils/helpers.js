import { AsyncStorage } from 'react-native'

 
function generateID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }


export function newDeck (deckTitle) {
    return {
        deckTitle: {
            title: deckTitle,
            questions: [
                
            ]
        }
    }
}





const decks = {
  React: {
    title: 'React',
    questions: [
      { id:generateID(),
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      { id:generateID(),
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      { id:generateID(),
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      },
      { id:generateID(),
        question: 'What JS array method can filter elements?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      },
    ]
  },
  
  Angular: {
    title: 'Angular',
    questions: [
      { id:generateID(),
        question: 'What is Angular?',
        answer: 'A library for managing user interfaces'
      },
      { id:generateID(),
        question: 'Who created Angular?',
        answer: 'Google'
      }
    ]
  },

}

//Async Storage

//Initiate data
AsyncStorage.setItem('decks', JSON.stringify(decks))

export function getDecks() {
    //return all the decks along with their titles
    return  AsyncStorage.getItem('decks').then((decks) => JSON.parse(decks)).then((res) => res)
   
}

export function getDeck () {
 //get a specific deck
}

export  function saveDeckTitle( title, card) {
    // take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 

}

export function addNewCard(deckTitle, newCard) {
  // return AsyncStorage.getItem('decks').then(results => {
  //   const data = JSON.parse(results);

  //   // Add card to existing deck data.
  //   data[deckTitle].questions.concat(newCard) 
     
  //   };

  //   // Save updated deck data back to storage
  //   AsyncStorage.setItem('decks', JSON.stringify(data));
  // });
  

   return AsyncStorage.getItem('decks').then((decks) => JSON.parse(decks))
  .then((decks) => {
    for (let property in decks) {
      if(property === deckTitle) {
         //decks[property].questions.concat(newCard)
        decks[property].questions.push(newCard)
        // console.log(decks[property]) 
        
      }
    }
    return decks
  })
  .then((res) => JSON.stringify(res))
  .then((newCard) => AsyncStorage.mergeItem('decks', newCard) )

  //.then( AsyncStorage.getItem('decks').then((res) =>JSON.parse(res)).then(res => console.log(res) ))
  ///AsyncStorage.setItem('decks', JSON.stringify(res))

  
}


//Notifications
export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification () {
    return {
      id: generateID(),
      title: 'Study time!',
      body: "Want to do a bit of studing today?",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }