import { createDrawerNavigator } from '@react-navigation/drawer'
import 'react-native-gesture-handler'
import Favs from '../app/(screens)/favs'
import Home from '../app/(screens)/home'
import Login from '../app/(screens)/login'

const Menu = createDrawerNavigator()

export const MenuComponent = () => {
    return (
                <Menu.Navigator>
                    <Menu.Screen name="Favs" component={Favs}/>
                    <Menu.Screen name="Home" component={Home}/>
                    <Menu.Screen name="Login" component={Login}/>
                </Menu.Navigator>
    )
}