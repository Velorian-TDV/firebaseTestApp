var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},d=e.parcelRequired7c6;null==d&&((d=function(e){if(e in t)return t[e].exports;if(e in a){var d=a[e];delete a[e];var n={id:e,exports:{}};return t[e]=n,d.call(n.exports,n,n.exports),n.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){a[e]=t},e.parcelRequired7c6=d);var n=d("fDV48");const l=document.getElementById("email"),i=document.getElementById("password"),r=document.getElementById("name"),s=document.getElementById("registration"),o=document.getElementById("signIn"),c=document.getElementById("signOut"),u=document.getElementById("data_set"),m=document.getElementById("data_get"),g=document.getElementById("data_delete"),f=document.getElementById("data_get_all"),E=document.getElementById("data_delete_all"),_={title:"The Great Gatsby",author:"<NAME>",genre:"fiction",rating:5};s.addEventListener("click",(()=>{(0,n.firebase_registration)(l.value,i.value,r.value)})),o.addEventListener("click",(()=>{(0,n.firebase_autorization)(l.value,i.value)})),c.addEventListener("click",(()=>{(0,n.firebase_logout)()})),u.addEventListener("click",(()=>{(0,n.firebase_addItem)(n.user_cradentials.displayName,"2",_)})),g.addEventListener("click",(()=>{(0,n.firebase_deleteItem)(n.user_cradentials.displayName,"2")})),m.addEventListener("click",(()=>{(0,n.firebase_getItem)(n.user_cradentials.displayName,"2")})),f.addEventListener("click",(()=>{(0,n.firebase_getAllItems)(n.user_cradentials.displayName)})),E.addEventListener("click",(()=>{(0,n.firebase_deleteAllItems)(n.user_cradentials.displayName)}));
//# sourceMappingURL=index.298d6c23.js.map