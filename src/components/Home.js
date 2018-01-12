
import React from 'react';
import {
View,
Text,
TextInput,
ToucheableOpacity,
TouchableHighlight,
StyleSheet
} from 'react-native';

import {Actions} from 'react-native-router-flux';

class Home extends React.Component{
    state = {
        name: '',
    };

    funcao = () => {
        console.log('Chamou a funcao');
    }

    render(){
        return(
            <View> 
                <Text style={styles.title}>
                     Enter your name:
                 </Text>

                  <TextInput
                     style={styles.nameInput}
                     placeholder='John Snow'
                     onChangeText={(text) => {
                         this.setState({
                             name: text,
                         });
                     }}
                     value={this.state.name}
                 />

                 <TouchableHighlight onPress={() => {Actions.chat({name: this.state.name})}}>
                     <Text style={styles.buttonText}>Next</Text>
                 </TouchableHighlight>


            </View>
            // <View>
            //     <Text style={styles.title}>
            //         Enter your name:
            //     </Text>
            //     <TextInput
            //         style={styles.nameInput}
            //         placeholder='John Snow'
            //         onChangeText={(text) => {
            //             this.setState({
            //                 name: text,
            //             });
            //         }}
            //         value={this.state.name}
            //     />
            //     <ToucheableOpacity onPress={() => {Actions.chat({name: this.state.name})}}>
            //         <Text style={styles.buttonText}>Next</Text>
            //     </ToucheableOpacity>

            // </View>
        );
    }
}

var styles = StyleSheet.create({
    title:{
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
    },
    nameInput:{
        padding: 5,
        height: 40,
        borderWidth: 2,
        borderColor: 'black',
        margin: 20,
    },
    buttonText:{
        marginLeft: 20,
        fontSize: 20,
    }

})


export default Home;