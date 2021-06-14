import * as React from 'react';
import { FAB, Icon } from 'react-native-elements';
import { View} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FolderScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FAB
          buttonStyle={{ width: 60, height: 60, backgroundColor: '#2699FB' }}
          title={<Icon name="add" type="material" color="#fff" />}
        />
      </View>
      <FAB
        onPress={()=>navigation.navigate("Main")}
        style={{ position: 'absolute', bottom: 50, right: 50 }}
        buttonStyle={{ width: 60, height: 60, backgroundColor: '#2699FB' }}
        title={<Icon name="check" type="material" color="#fff" />}
      />
    </View>
  );
};

export default FolderScreen;
