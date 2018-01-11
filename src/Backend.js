import firebase from 'firebase';

class Backend{
    uid = '';
    messagesRef = null;

    //Initialize Firebase Backend
    constructor(){
        firebase.initializeApp({
            apiKey:'',
            authDomain: '',
            databaseURL: '',
            storageBucket: '',
        });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setUid(user.uid);
            }else{
                firebase.auth().signInAnnonymously().catch((error) => {
                    alert(error.message);
                });
            }
        });
    }

    setUid(value){
        this.uid = value;
    }

    getUid(){
        return this.uid;
    }

    //Retrieve the messages from the Backend
    loadMessages(callback){
        this.messagesRef = firebase.database().ref('messages');
        this.messagesRef.off();
        const onReceive = (data) => {
            const message = data.val();
            callback({
                _id: data.key,
                text: message.text,
                createdAt: new Date(message.createdAt),
                user:{
                    _id: message.user._id,
                    name: message.user.name,
                },
            });
        };
        this.messagesRef.limitToLast(20).on('child_added', onReceive);
    }

    //Send the message to the Backend
    sendMessage(message){
        for (let i=0; i<message.lenght; i++){
            this.messagesRef.push({
                text: message[i].text,
                user: message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            });
        }
    }

    //Close the connection to the Backend
    closeChat(){
        if(this.messagesRef){
            this.messagesRef.off();
        }
    }
}

export default new Backend();