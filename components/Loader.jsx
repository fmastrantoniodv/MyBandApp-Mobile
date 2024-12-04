import { View, StyleSheet, Modal, ActivityIndicator} from 'react-native';

export const Loader = ({ loading }) => {
 
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={loading}
           >
          <View style={styles.centeredView}>
            <ActivityIndicator size='large'/>
          </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:  'rgba(28, 45, 74, 0.58)'
    }
  });