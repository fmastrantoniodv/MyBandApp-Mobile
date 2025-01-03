import { Pressable, View, StyleSheet } from "react-native";
import FavIcon from '../assets/img/favIcon.svg'
import PlayIcon from '../assets/img/playIcon.svg'
import UnfavIcon from '../assets/img/unFavButtonIcon.svg'
import PauseIcon from '../assets/img/pauseIcon.svg'
import CloseIcon from '../assets/img/closeIcon.svg'
import FowardIcon from '../assets/img/fowardIcon.svg'
import RewindIcon from '../assets/img/rewindIcon.svg'
import HamburgerMenuIcon from '../assets/img/menuIcon.svg'
import BackArrow from '../assets/img/backArrow.svg'

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
    return <IconButton onPressAction={() => onPressAction()}>
        <HamburgerMenuIcon width={25} />
    </IconButton>
}

export const BackButton = ({ onPressAction }) => {
    return <IconButton onPressAction={() => onPressAction()}>
        <BackArrow width={17} />
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