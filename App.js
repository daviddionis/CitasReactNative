/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  addons
} from 'react-native';

import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const [citas, setCitas] = useState([]);

  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(()=>{
    const obtenerCitas = async ()=>{
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        if(citasStorage) setCitas(JSON.parse(citasStorage))
      } catch (err) {
        console.error(err)
      }
    }
    obtenerCitas();
  },[]);

  const guardarCitasStorage = async (citasJSON)=>{
    try{
      await AsyncStorage.setItem('citas', citasJSON);
    }catch(err){
      console.error(err);
    }
  }

  const eliminarPaciente = id => {
    const citasFiltradas = citas.filter(cita=>cita.id!==id);
    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas))
  };

  return (
    <>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>
        <View style={styles.btnCrear}>
          <TouchableHighlight onPress={() => setMostrarForm(estado=>(!estado))}>
            <Text style={styles.btnCrearText}>
              {mostrarForm ? 'Ver citas' : 'Crear una cita'}
            </Text>
          </TouchableHighlight>
        </View>
        {mostrarForm 
          ? <Formulario 
              citas={citas}
              setCitas={setCitas}
              setMostrarForm={setMostrarForm}
              guardarCitasStorage={guardarCitasStorage}
            /> 
          : <FlatList
              data={citas}
              renderItem={({item}) => (
                <Cita cita={item} eliminarPaciente={eliminarPaciente} />
              )}
              keyExtractor={cita => cita.id}
            />
          }       
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titulo: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  btnCrear: {
    backgroundColor: 'purple',
  },
  btnCrearText: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
});

export default App;
