import { Pressable, View, StyleSheet, Text } from "react-native";
import FavIcon from '../assets/img/favIcon.svg'
import PlayIcon from '../assets/img/playIcon.svg'
import UnfavIcon from '../assets/img/unFavButtonIcon.svg'
import PauseIcon from '../assets/img/pauseIcon.svg'
import CloseIcon from '../assets/img/closeIcon.svg'
import FowardIcon from '../assets/img/fowardIcon.svg'
import RewindIcon from '../assets/img/rewindIcon.svg'
import HamburgerMenuIcon from '../assets/img/menuIcon.svg'
import BackArrow from '../assets/img/backArrow.svg'
import { useNavigation } from "expo-router";

export function IconButton({ onPressAction, disable, children }) {

    return (
        <Pressable className='flex flex-row justify-center' onPress={disable ? null : () => onPressAction()}>
            {({ pressed }) => (
                <View 
                    className='mx-1'
                    style={[
                        pressed && styles.pressedStyle,
                        disable && styles.disableStyle
                        ]}>
                        { children }
                </View>
            )   
            }
        </Pressable>
    )
  }

export const FavButton = ({ onPressAction }) => {
    return <IconButton onPressAction={() => onPressAction()}>
        <FavIcon width={25} height={25} />
    </IconButton>
}

export const UnfavButton = ({ onPressAction }) => {
    return <IconButton onPressAction={() => onPressAction()}>
        <UnfavIcon width={25} height={25} />
    </IconButton>
}

export const PlayButton = ({ onPressAction }) => {
    return <IconButton onPressAction={() => onPressAction()}>
        <PlayIcon width={25} height={25}/>
    </IconButton>
}

export const PauseButton = ({ onPressAction }) => {
    return <IconButton onPressAction={() => onPressAction()}>
        <PauseIcon width={25} height={25} />
    </IconButton>
}

export const CloseButton = ({ onPressAction }) => {
    return <IconButton onPressAction={() => onPressAction()}>
        <CloseIcon width={25} height={25} />
    </IconButton>
}

export const FowardButton = ({ onPressAction }) => {
    return <IconButton onPressAction={() => onPressAction()}>
        <FowardIcon width={35}/>
    </IconButton>
}

export const RewindButton = ({ onPressAction }) => {
    return <IconButton onPressAction={() => onPressAction()}>
        <RewindIcon width={35} />
    </IconButton>
}

export const HamburgerMenuButton = ({ onPressAction }) => {
    return <Pressable className='flex flex-row justify-end items-center w-12 h-12' onPress={() => onPressAction()}>
            {({ pressed }) => (
        <View 
            className='mx-1'
            style={[
                pressed && styles.pressedStyle
                ]}>
                    <HamburgerMenuIcon width={35} />
        </View>
    )}
</Pressable>
        
}

export const BackButton = ({ onPressAction }) => {
    return <Pressable className='flex flex-row justify-start w-10' onPress={() => onPressAction()}>
    {({ pressed }) => (
        <View 
            className='mx-1'
            style={[
                pressed && styles.pressedStyle
                ]}>
                <BackArrow width={18} />
        </View>
    )}
</Pressable>
    
}

export function GoBackButton() {
    const navigation = useNavigation()
    return (
        <Pressable className='flex flex-row justify-center' onPress={() => navigation.goBack()}>
            {({ pressed }) => (
                <View 
                    className="w-11/12 rounded-lg m-2 p-2 flex-row justify-center items-center" 
                    style={[
                        styles.buttonContainerSecondary,
                        pressed && styles.pressedStyle,
                        ]}>
                        <Text 
                            className='text-xl font-medium'
                            style={styles.textSecondary}
                            >
                            Volver
                        </Text>
                </View>
            )   
            }
        </Pressable>
    )
  }
  

const styles = StyleSheet.create({
pressedStyle: {
    opacity: 0.7,
    },
disableStyle: {
    opacity: 0.7
},
buttonContainerSecondary: {
    backgroundColor: '#D9D9D9',
    borderStyle: 'solid',
    borderColor: '#203875',
    borderWidth: 2,
    height: 50
},
textSecondary: {
    color: '#203875',
}
})