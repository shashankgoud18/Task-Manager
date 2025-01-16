import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';;// Ensure the correct icon library is imported
import Task from '../components/Task'; // Ensure the correct path to Task component
import { Dialog } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';


const Home = ({ navigation }) => {
  const task = [
    { title: 'Task 1', description: 'Description 1', completed: false, _id: '1' },
    { title: 'Task 2', description: 'Description 2', completed: true, _id: '2' },
    { title: 'Task 3', description: 'Description 3', completed: false, _id: '3' },
    { title: 'Task 4', description: 'Description 4', completed: false, _id: '4' },
  ];

  const [openDialog, setopenDialog] = useState(false);
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')

  const hideDialog = () => {
    setopenDialog(!openDialog);
  }

  const addHandler = () => {
    console.log('Task Added');
  }



  return (
    <>
    <View  style={styles.container} screenOptions={{headerShown: false}}>
     <ScrollView>
     <Text style={styles.header} onPress={() => navigation.navigate('login')}>
       ALL TASKS
      </Text>
      {task.map((item) => (
        <Task key={item._id} title={item.title} description={item.description} status={item.completed} taskId={item._id} />
      ))}
      <TouchableOpacity style={styles.addBtn} onPress={hideDialog}>
        <Icon name='add-to-list' size={20} color={'#900'} /> {/* Ensure the icon name is valid */}
      </TouchableOpacity>
     </ScrollView>
    </View>


    <Dialog visible={openDialog} onDismiss={hideDialog}>

      <Dialog.Title>
        Add Task
        </Dialog.Title>
      <Dialog.Content>
        <TextInput 
        style={styles.input} 
        label="Title"
        value={title}
        onChangeText={settitle} />
        
        <TextInput 
        style={styles.input}
         label="Description" 
         value={description}
         onChangeText={setdescription}/>

        <View style={{flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity onPress={hideDialog}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <Button
           onPress={addHandler}
          //  disabled={!title || !description || loading}
           >
            Add
            </Button>
        </View>

       
      </Dialog.Content>
    </Dialog>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
    backgroundColor: '#fafafa',
    padding: 10,
  },
  addBtn: {
    width:150,
    height: 50,
    justifyContent: 'center',
    alignSelf:'center',
    marginTop: 24,
    padding: 8,
    backgroundColor: '#fafafa',
    borderRadius: 100,
    alignItems: 'center',
    elevation:6
  },
  input: {
   padding:2,
   margin:10,
   borderColor:'#fafafa',
   borderWidth:1
  }
});

export default Home;