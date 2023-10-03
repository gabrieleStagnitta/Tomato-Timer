import { StyleSheet, Text, View, Image,TouchableOpacity, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import React,{useState, useEffect} from 'react';
import PauseImage from './assets/Images/pause.png';
import PlayImage from './assets/Images/play.png';
import ResetImage from './assets/Images/restart.png';

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = (time) =>{
  const mins = Math.floor(time/60);
  const secs = time - mins * 60;
  return {mins: formatNumber(mins), secs: formatNumber(secs)};
}

const minToSeconds = (min) =>{
  return Math.floor(min*60);
}

export default function App() {
  
  const minToWork = 30;
  const minToRest = 10;
  const numTotRound = 4;

  const [numRound,setNumRound] = useState(0);
  
  const [remainingSecs,setRemainingSecs] = useState(!inWork ? minToSeconds(minToWork) : minToSeconds(minToRest));
  const {mins,secs} = getRemaining(remainingSecs);

  const [inWork, changeState] = useState(true);

  const [isActive, setIsActive] = useState(false);

  toggle = () =>{
    setIsActive(!isActive); 
  }

   reset = () =>{
    setRemainingSecs(minToSeconds(minToWork));
    setIsActive(false);
    changeState(true);
    setNumRound(numRound => 0)
  }

  useEffect(() =>{
    let interval = null;
    if(isActive){
      interval = setInterval(() =>{
        setRemainingSecs(remainingSecs => remainingSecs - 1);
      },1000)
      if(remainingSecs == 0){
        changeState(!inWork);
        setRemainingSecs(!inWork ? minToSeconds(minToWork) : minToSeconds(minToRest));
        setNumRound(numRound => numRound + 0.5)
      }
    }
    else if(!isActive && remainingSecs !== 0){
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  },[isActive,remainingSecs])

  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}>
        <Text style={styles.textRounds}>Rounds</Text>
        <Text style={styles.textNum}>{`${Math.trunc(numRound)}/${numTotRound}`}</Text>
      </View>
      <View style={styles.secondContainer}>
      <Text style={styles.textPhrase}>{inWork? 'Good work!' : 'Good rest!'}</Text>
        <Progress.Bar progress={inWork? remainingSecs/minToSeconds(minToWork) : remainingSecs / minToSeconds(minToRest)} borderRadius={15} width={244} height={30} color={'#4C5A23'} unfilledColor='#B4A12D'/>
      </View>
      <View style={styles.thirdContainer}>
        <Text style={styles.textTimer}>{`${mins}:${secs}`}</Text>
        <View style={styles.imagesContainer}>
        <TouchableOpacity onPress={this.toggle}>
          <Image source={isActive? PauseImage : PlayImage} />
        </TouchableOpacity>
          <TouchableOpacity onPress={reset}>
            <Image source={ResetImage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#600000',    
  },
  firstContainer:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center'
  },
  textRounds:{
    color: '#B4A12D',
    textAlign: 'center',
    fontWeight:'400',
    fontSize:15,
    paddingTop:80
  },
  textNum:{
    color: '#E39533',
    textAlign:'center',
    fontWeight:'400',
    fontSize:45,
  },
  secondContainer:{
    paddingTop: 60,
    justifyContent: 'center',
    alignItems:'center'
  },
  textPhrase:{
    color: '#FF3F3F',
    textAlign: 'center',
    paddingBottom: 80,
    textAlign: 'center',
    fontSize:36,
    fontWeight:'800'
  },
  thirdContainer:{
    paddingTop:60,
    justifyContent: 'center',
    alignItems:'center'
  },
  textTimer:{
    color:'#E39533',
    textAlign:'center',
    fontSize:36,
    fontWeight: '800'
  },
  imagesContainer:{
    paddingTop:20,
    flexDirection: 'column',
    gap:20,
    alignItems:'center'
  }
  
});
