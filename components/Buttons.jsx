import { Pressable, View, StyleSheet } from "react-native";
import FavIcon from '../assets/img/favIcon.svg'
import PlayIcon from '../assets/img/playIcon.svg'
import UnfavIcon from '../assets/img/unFavButtonIcon.svg'
import PauseIcon from '../assets/img/pauseIcon.svg'
import CloseIcon from '../assets/img/closeIcon.svg'

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

const styles = StyleSheet.create({
pressedStyle: {
    opacity: 0.7,
    },
disableStyle: {
    opacity: 0.7,
}
})