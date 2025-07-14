const admin = require('firebase-admin');
const serviceAccount = require('./config/firebaseAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


const db = admin.firestore();
const serverTimestamp = admin.firestore.FieldValue.serverTimestamp;

export { db, serverTimestamp };