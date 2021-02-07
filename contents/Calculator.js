import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';

export default function Calculator({ navigation }) {

    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);

    const [numero1, setNumero1] = useState('');
    const [numero2, setNumero2] = useState('');

    const initialFocus = useRef(null);

    const calculate = operator => {
        const [number1, number2] = [Number(numero1), Number(numero2)];

        if (isNaN(number1) || isNaN(number2)) {
            setResult(0);
        } else {
            let result = 0;
            switch (operator) {

                case '+':
                    result = number1 + number2;
                    break;

                case '-':
                    result = number1 - number2;
                    break;
            }

            setResult(result);

            const text = `${number1} ${operator} ${number2} = ${result}`;
            setHistory([...history, { key: text }]);

        }

        setNumero1('');
        setNumero2('');
        initialFocus.current.focus();
    }

    return (

        <View style={styles.container}>
            <Text style={styles.heading}>Answer is {result}</Text>
            <TextInput 
            style={styles.input} 
            ref={initialFocus}
            keyboardType={`numeric`}
            onChangeText={text => setNumero1(text)}
            value={numero1}
            />

            <TextInput 
            style={styles.input} 
            ref={initialFocus}
            keyboardType={`numeric`}
            onChangeText={text => setNumero2(text)}
            value={numero2}
            />

            <View style={styles.buttons}>
                <Button onPress={() => calculate('+')} title="+" />
                <Button onPress={() => calculate('-')} title="-" />
                <Button onPress={() => navigation.navigate('History', { history })} title="History"> </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9ac1fc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%'
    },
    heading: {
        fontSize: 35
    },
    input: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        margin: 5,
        width: '70%'
    }
});