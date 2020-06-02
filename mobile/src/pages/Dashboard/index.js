import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, FlatList} from 'react-native';

import api from '../../services/api';

import LogoHeader from '../../assets/LogoHeader.png';
import NOLOGO from '../../assets/NOLOGO.png';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Dashboard(){
    return(
        <View style={styles.container}>
            <View style={styles.Header}>
                <Image source={LogoHeader} />
            </View>
        
            <FlatList 
                style={styles.enterpriseList}
                data={[1, 2, 3, 4, 5 ,6 ,7 ,8 ,9, 10, 11, 12, 13, 14]}
                keyExtractor={enterprises => String(enterprises)}
                renderItem={() => (
                    <View style={styles.enterprise}>
                        <Image source={NOLOGO} />
                        <Text style={styles.name}>AÇAITEIRA MIL GRAU</Text>
                        <Text style={styles.city}>Nova Lima</Text>
                        <Text style={styles.uf}>MG</Text>
                        <TouchableOpacity>
                            <Text style={styles.Textphone}>Whatsapp</Text>
                            <Text style={styles.phone}>(31) 9 12345678</Text>
                            <Feather name="arrow-right" size={16} color='#FF0000' />
                        </TouchableOpacity>
                </View>
                )}
            />
        </View>
    )
}