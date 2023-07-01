// =========================================================================================================
// METHOD IMPORTS
import {
    user_cradentials,
    firebase_addItem,
    firebase_getItem,
    firebase_getAllItems,
    firebase_deleteItem,
    firebase_deleteAllItems,
    firebase_registration,
    firebase_autorization,
    firebase_logout,
} from './scripts/firebase';
// FORM ELEMENTS
const mail = document.getElementById('email');
const password = document.getElementById('password');
const name = document.getElementById('name');
// BUTTONS
const registration = document.getElementById('registration');
const sign_In = document.getElementById('signIn');
const sign_Out = document.getElementById('signOut');
const data_set = document.getElementById('data_set');
const data_get = document.getElementById('data_get');
const data_delete = document.getElementById('data_delete');
const data_get_all = document.getElementById('data_get_all');
const data_delete_all = document.getElementById('data_delete_all');
// TEST
const testBookObject = { title: "The Great Gatsby", author: "<NAME>", genre: "fiction", rating: 5 };
// =========================================================================================================
// TRIGERS
// registration
registration.addEventListener('click', () => {
    firebase_registration(mail.value, password.value, name.value)
});
// sign in
sign_In.addEventListener('click', () => {
    firebase_autorization(mail.value, password.value)
});
// sign out
sign_Out.addEventListener('click', () => {
    firebase_logout();
});
// add item to db and local storage
data_set.addEventListener('click', () => {
    firebase_addItem(user_cradentials.displayName, '2', testBookObject)
})
// delete item from db and local storage
data_delete.addEventListener('click', () => {
    firebase_deleteItem(user_cradentials.displayName, '2')
})
// get data from db and local storage
data_get.addEventListener('click', () => {
    firebase_getItem(user_cradentials.displayName, '2')
})
// get all data from db and local storage
data_get_all.addEventListener('click', () => {
    firebase_getAllItems(user_cradentials.displayName)
})
// delete all data from db and local storage
data_delete_all.addEventListener('click', () => {
    firebase_deleteAllItems(user_cradentials.displayName)
})
// =========================================================================================================