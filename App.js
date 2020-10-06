import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Picker, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import{Audio} from 'expo-av';

export default class App extends React.Component{

  constructor(props){
    super(props);

    this.state ={

      selecionado : false,
      timeOut: null,
      contagem: 0

    }

    console.disableYellowBox = true;


  }
  
  async tocarAlarme(){
    this.soundObject = new Audio.Sound();
    try{
      await this.soundObject.loadAsync(require('./assets/Sounds/alarme.mp3'));
      await this.soundObject.playAsync();

    }catch(error){

    }
  }
  pressionado = () =>{
    var intervalo = setInterval(()=>{
      this.setState({contagem: this.state.contagem-1});

      if(this.state.contagem==0){
        clearInterval(intervalo);
        this.setState({
          selecionado : false,
          timeOut: null,
          contagem: 0

        })

        this.tocarAlarme();
        alert('Acabou');
      }
    },1000);
  }
displayTimer =() =>{
  var contadores = [];
  for(var i=1; i<= 60; i++){
    contadores.push(<Picker.Item label={i.toString()} value={i.toString()}></Picker.Item>);
  }

  if(this.state.selecionado == false){

    return(
      <View style={styles.boxTimerSelect}>
        <Text> Selecione o tempo</Text>
        <Picker style={{width:200,height:30}} onValueChange={(value,index) => this.setState({selecionado:true,contagem:value})}>
          <Picker.Item label="Selecione o tempo" value="Selecione o tempo" />
          {contadores}
        </Picker>
      </View>
    )
  }else{

    return(
     <View>
      <Text>Contagem: {"\n\n"} {this.state.contagem}</Text>
     <TouchableOpacity onPress={()=> this.pressionado()}><Text>Começar</Text></TouchableOpacity>
     </View>
    )

  }

}
  render(){
    return(
    <View>{this.displayTimer()}</View>
    )
  }
}

const styles = StyleSheet.create({

  boxTimerSelect:{
    display: 'flex',
    backgroundColor: '#ec6a10',
    height: '100%',
    alignItems:'center'
  },

  btn:{
    backgroundColor:'#0615ba',
    padding: 10,
    borderRadius: 20
  }
  
});
