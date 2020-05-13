import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  ScrollView,
  Alert
} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Formulario = ({citas,setCitas, setMostrarForm, guardarCitasStorage}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [formInfo, setFormInfo] = useState({
    paciente: '',
    propietario: '',
    telefono: '',
    sintomas: '',
    fecha: '',
    hora: '',
  });

  const agregarCita=()=>{
    const {paciente,propietario, telefono, sintomas, fecha, hora}=formInfo;
    if(paciente.trim()==='' ||
        propietario.trim()==='' ||
        telefono.trim()==='' ||
        sintomas.trim()==='' ||
        fecha.trim()==='' ||
        hora.trim()===''){
      
      Alert.alert('Error', 'Todos los campos son obligatorios', 
      [{
        text: 'OK'
      }
      ])
    }else{
      const cita={
        id: (citas.length===0 ? 1 : parseInt(citas[citas.length-1].id)+1).toString(),
        ...formInfo
      }

      const nuevasCitas=[...citas,cita];
      setCitas(nuevasCitas);


      console.log(nuevasCitas)
      guardarCitasStorage(JSON.stringify(nuevasCitas))

      console.log(citas)
      Alert.alert('Cita añadida', 'Se añadió la cita satisfactoriamente');
      setMostrarForm(estado=>(!estado))
    }
  }
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = date => {
    const opciones = {year: 'numeric', month: '2-digit', day: '2-digit'};
    setFormInfo({
      ...formInfo,
      fecha: date.toLocaleDateString('es-ES', opciones),
    });
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = time => {
    const opciones = {hour: 'numeric', minute: 'numeric', hour12: false};
    setFormInfo({
      ...formInfo,
      hora: time.toLocaleString('en-US', opciones)
    });
    hideTimePicker();
  };

  return (
    <>
      <ScrollView>
        <View style={styles.formulario}>
          <View>
            <Text style={styles.label}>Paciente:</Text>
            <TextInput
              style={styles.input}
              onChangeText={texto =>
                setFormInfo({
                  ...formInfo,
                  paciente: texto,
                })
              }
            />
          </View>
          <View>
            <Text style={styles.label}>Dueño:</Text>
            <TextInput
              style={styles.input}
              onChangeText={texto =>
                setFormInfo({
                  ...formInfo,
                  propietario: texto,
                })
              }
            />
          </View>
          <View>
            <Text style={styles.label}>Teléfono Contacto:</Text>
            <TextInput
              style={styles.input}
              onChangeText={texto =>
                setFormInfo({
                  ...formInfo,
                  telefono: texto,
                })
              }
              keyboardType="number-pad"
            />
          </View>
          <View>
            <Text style={styles.label}>Fecha: {formInfo.fecha}</Text>
            <Button title="Seleccionar Fecha" onPress={()=>showDatePicker()} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
              locale="es_ES"
              headerTextIOS="Elije la fecha"
            />
          </View>
          <View>
            <Text style={styles.label}>Hora: {formInfo.hora}</Text>
            <Button title="Seleccionar Hora" onPress={()=>showTimePicker()} />
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleConfirmTime}
              onCancel={hideTimePicker}
              headerTextIOS="Elije una hora"
              is24Hour
            />
          </View>
          <View>
            <Text style={styles.label}>Síntomas:</Text>
            <TextInput
              multiline
              style={styles.input}
              onChangeText={texto =>
                setFormInfo({
                  ...formInfo,
                  sintomas: texto,
                })
              }
            />
          </View>
          <View style={styles.btnAgregar}>
            <TouchableHighlight
              onPress={()=>agregarCita()}
            >
              <Text style={styles.btnAgregarText}>Añadir</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    margin: '3%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnAgregar: {
    marginVertical: 10,
    backgroundColor: 'green',
  },
  btnAgregarText: {
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
});

export default Formulario;
