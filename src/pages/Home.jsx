import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';

class Home extends React.Component {
  componentDidMount() {

  }
  render() {
    return(
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Voice Test</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonButton onClick={this.startListening}>Start</IonButton>
        </IonContent>
      </IonPage>
    )
  }
  startListening = () => {
    SpeechRecognition.requestPermission().then(() => {
      SpeechRecognition.startListening({showPopup: false}).subscribe((result) => {
        TextToSpeech.speak({text: result[0], rate: 0.85}).then(() => {
          this.startListening();
        })
      },
      (error) => {
        this.startListening();
      });
    });
  }
}

export default Home;
