import * as firebase from 'firebase'
let Name =[]
export const UserService = {
    UserValue : () => {
        return new Promise((resolve, reject)=>{
            var comment = localStorage.getItem('user');
            firebase.database().ref("SignUp/"+comment).on("value", (snapshot) => {
                let data = snapshot.val();
                resolve(data);
                console.log(resolve(data))
            })
    
        })
    },

    setName: (name)=>{
        Name = name;
    },
}