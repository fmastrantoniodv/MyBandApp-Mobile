import { Pressable, View, Text, StyleSheet } from "react-native";

export function FormButton({ type, onPressAction, text, disable }) {

    return (
        <Pressable className='flex flex-row justify-center' onPress={disable ? null : () => onPressAction()}>
            {({ pressed }) => (
                <View 
                    className="w-11/12 rounded-lg m-2 p-2 flex-row justify-center bg-red-600" 
                    style={[
                        type === 'primary' ? styles.buttonContainerPrimary : styles.buttonContainerSecondary,
                        pressed && styles.pressedStyle,
                        disable && styles.disableStyle
                        ]}>
                        <Text 
                            className='text-xl font-medium'
                            style={type === 'primary' ? styles.textPrimary : styles.textSecondary}
                            >
                            {text}
                        </Text>
                </View>
            )   
            }
        </Pressable>
    )
  }
  
  const styles = StyleSheet.create({
    buttonContainerPrimary: {
        backgroundColor: '#203875',
    },
    buttonContainerSecondary: {
        backgroundColor: '#D9D9D9',
        borderStyle: 'solid',
        borderColor: '#203875',
        borderWidth: 2
    },
    textPrimary: {
        color: '#fff',
    },
    textSecondary: {
        color: '#203875',
    },
    pressedStyle: {
        opacity: 0.7,
      },
    disableStyle: {
        opacity: 0.7,
    }
  })