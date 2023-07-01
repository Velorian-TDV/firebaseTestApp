// IMPORTS
import { initializeApp } from "firebase/app";
// DATABASE
import {
    doc,
    getFirestore,
    collection,
    setDoc,
    getDoc,
    getDocs,
    deleteDoc,
} from "firebase/firestore";
// AUTHENTICATION
import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged
} from 'firebase/auth';
// APP CRADENTIALS
const firebaseConfig = {
    apiKey: "AIzaSyB4nDHn4MwFdhmCP-XbrhPgo0UbVXx6PFA",
    authDomain: "fir-app-34ddb.firebaseapp.com",
    projectId: "fir-app-34ddb",
    storageBucket: "fir-app-34ddb.appspot.com",
    messagingSenderId: "944304437800",
    appId: "1:944304437800:web:d7592842e137fa1f93931d"
};
export let user_cradentials = { id: '', email: '', displayName: '' };
// INITIALIZETION
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// ======================================================================
// CHECK USER STATUS [DONE]
// ======================================================================
onAuthStateChanged(auth, (data) => {
    if (data === null) {
        console.log('Пользователь не авторизован')
    } else {
        const { email, uid, displayName } = data;
        user_cradentials = {
            id: uid,
            email: email,
            displayName: displayName,
        }
    }
})
// ======================================================================
// FORM METHODS [DONE]
// ======================================================================
// REGISTRATION [DONE]
export function firebase_registration(user_email, user_password, user_nickname) {
    createUserWithEmailAndPassword(auth, user_email, user_password)
        .then(data => {
            updateProfile(data.user, {
                displayName: user_nickname
            })
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('Этот Email уже используется.')
            } else {
                console.log(error)
            }
        })
}
// AUTORIZATION [DONE]
export function firebase_autorization(user_email, user_password) {
    signInWithEmailAndPassword(auth, user_email, user_password)
        .then(() => {
            firebase_getAllItems(user_cradentials.displayName);
        })
        .catch(error => {
            switch (error.code) {
                case ('auth/user-not-found'):
                    console.log('Пользователь с таким Email не найден')
                    break;
                case ('auth/wrong-password'):
                    console.log('Не верный пароль')
                    break;
                case ('auth/invalid-email'):
                    console.log('email и пароль')
                    break;
            }
        })
}
// LOGOUT [DONE]
export function firebase_logout() {
    signOut(auth)
        .then(() => {
            localStorage.clear();
            console.log('Пользователь вышел из системы');
        })
        .catch(error => console.log(error))
}
// ======================================================================
// DB METHODS [DONE]
// ======================================================================
// SET ITEM TO DB [DONE]
export function firebase_addItem(userName, bookID, bookData) {

    const saveData = () => {

        const userCollection = collection(db, userName);
        const docRef = doc(userCollection, bookID);

        setDoc(docRef, bookData)
            .then(() => {
                localStorage.setItem(bookID, JSON.stringify(bookData))
                console.log("Документ успешно сохранен. ID документа:", bookID);
            })
            .catch((error) => {
                console.error("Ошибка при сохранении документа:", error);
            });
    };

    saveData();
}
// DELETE ITEM FROM DB [DONE]
export function firebase_deleteItem(userName, bookID) {
    const deleteData = () => {
        const userCollection = collection(db, userName);
        const docRef = doc(userCollection, bookID);

        deleteDoc(docRef)
            .then(() => {
                localStorage.removeItem(bookID);
                console.log("Документ успешно удален. ID документа:", bookID);
            })
            .catch((error) => {
                console.error("Ошибка при удалении документа:", error);
            });
    };

    deleteData();
}
// GET ITEM FROM DB [DONE]
export function firebase_getItem(userName, bookID) {
    const getData = async () => {
        try {
            const userCollection = collection(db, userName);
            const docRef = doc(userCollection, bookID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const bookData = docSnap.data();
                localStorage.setItem(bookID, JSON.stringify(bookData));
                console.log('Документ успешно получен и сохранен в localStorage:', bookData);
            } else {
                console.log('Документ не найден');
            }
        } catch (error) {
            console.error('Ошибка при получении документа:', error);
        }
    };

    getData();
}
// GET ALL ITEMS FROM DB [DONE]
export function firebase_getAllItems(userName) {
    const getData = () => {
        const userCollection = collection(db, userName);

        getDocs(userCollection)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const item = {
                        id: doc.id,
                        data: doc.data()
                    };
                    localStorage.setItem(item.id, JSON.stringify(item.data));
                });
                console.log("Все элементы успешно сохранены в localStorage");
            })
            .catch((error) => {
                console.error("Ошибка при получении элементов:", error);
            });
    };

    getData();
}
// DELETE ALL ITEMS FROM DB [DONE]
export function firebase_deleteAllItems(userName) {
    const deleteData = () => {
        const userCollection = collection(db, userName);

        getDocs(userCollection)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    deleteDoc(doc.ref);
                    localStorage.removeItem(doc.id);
                });
                console.log("Все элементы успешно удалены из Firestore и localStorage");
            })
            .catch((error) => {
                console.error("Ошибка при удалении элементов:", error);
            });
    };

    deleteData();
}
// ======================================================================