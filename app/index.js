import { LoginContent } from '../components/LoginContent'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Index() {
    const insets = useSafeAreaInsets()
    return (
    <View style={{paddingTop: insets.top}} className="flex-1">
        <LoginContent />
    </View>        
    )
}