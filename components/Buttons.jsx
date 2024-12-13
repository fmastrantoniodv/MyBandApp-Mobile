import { Pressable, View, StyleSheet } from "react-native";
import FavIcon from '../assets/img/favIcon.svg'
import PlayIcon from '../assets/img/playIcon.svg'
import UnfavIcon from '../assets/img/unFavButtonIcon.svg'
import PauseIcon from '../assets/img/pauseIcon.svg'

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

export const FavButton = () => {
    return <IconButton onPressAction={() => console.log('favPressed')}>
        <FavIcon width={25} height={25} />
    </IconButton>
}

export const UnfavButton = () => {
    return <IconButton onPressAction={() => console.log('unfavPressed')}>
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

const styles = StyleSheet.create({
pressedStyle: {
    opacity: 0.7,
    },
disableStyle: {
    opacity: 0.7,
}
})