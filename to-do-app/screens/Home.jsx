import { View, Text,StatusBar,Platform, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/Entypo'
import { StyleSheet } from 'react-native'
import { Dialog,Button } from 'react-native-paper'

const Home = ({navigation}) => {

  const task = [{
    title: 'Task 1',description:'Description 1',completed:false,_id:'1',
  },{
    title: 'Task 2',description:'Description 2',completed:true,_id:'2',
  },{
    title: 'Task 3',description:'Description 3',completed:false,_id:'3',
  },{
    title: 'Task 4',description:'Description 4',completed:false,_id:'4',
  }]
    
  return (
   <>
    <View style={{flex:1,paddingTop:Platform.OS=="android"?StatusBar.currentHeight:0}} >
      <SafeAreaView>
      <Text style={{fontSize:20,fontWeight:'bold',margin:10,alignItems:'center'}} onPress={() => navigation.navigate('login')}>Home</Text>
      {task.map((item,index) => <Task key={item._id} title={item.title} description={item.description} status={item.status} taskId={item._id}/>)}
        </SafeAreaView>   

        <TouchableOpacity style={styles.addBtn}>
          <Icon name='add-to-list' size={20} color={'#900'} />
        </TouchableOpacity>
        </View> 
        
        <Dialog visible={true}>
          
        </Dialog>
   </>
  )
}

export default Home


const styles = StyleSheet.create({
  addBtn:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    alignSelf:'center',
    width:150,
    height:60,
    borderRadius:30,
    elevation:5,
  }
})