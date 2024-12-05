import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export const FormSelector = ({planList, titleSelector, onSelect, selectedValue}) => {
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (selectedValue || isFocus) {
        return (
            <Text style={[styles.label, isFocus && { color: '#203875' }]}>
            {`${titleSelector} selecionado`}
            </Text>
        );
        }
        return null;
    };

    return (
        <View style={styles.container}>
        {renderLabel()}
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: '#203875' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={planList}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? titleSelector : ''}
            value={selectedValue}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                onSelect(item.value);
                setIsFocus(false);
            }}
        />
        </View>
    );
};

const styles = StyleSheet.create({
container: {
    backgroundColor: 'white',
    paddingTop: 16,
    paddingBottom: 5
},
dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
},
icon: {
    marginRight: 5,
},
label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
},
placeholderStyle: {
    fontSize: 16,
},
selectedTextStyle: {
    fontSize: 16,
},
iconStyle: {
    width: 40,
    height: 40,
}
});