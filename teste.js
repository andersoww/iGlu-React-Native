
    return (

      <View style={styles.MainContainer}>
<Picker style={styles.PickerStyleClass}
        selectedValue={this.state.mode}
        onValueChange={(modeValue, modeIndex) => this.setState({mode: modeValue})}>
    {this.state.dataSource.map((item, key)=>(
            <Picker.Item label={item} value={item} key={key} />)
            )}
</Picker>
      </View>
    );
    import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {Api_bloco} from '../../services/API';

export default function () {
  const [dados, setDados] = useState([]);

  async function itemBloco() {
    try {
      const response = await Api_bloco.get();
      const res = response.data;
      setDados(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    itemBloco();
  }, []);

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity
        style={{width: 200, height: 200, backgroundColor: '#0ff'}}
        onPress={() => {
          dados.map(function (item) {
            return console.log(item.material.nome);
          });
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
  },
  headingStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 40,
  },
});

<Picker>
        <Picker.Item label="Escolha uma UF..." value="" />
        {Blocos.map(uf => (
          <Picker.Item key={uf} label={uf.nome} value={uf.nome} />
        ))}
      </Picker>
