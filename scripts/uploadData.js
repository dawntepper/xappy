const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Path to your service account key JSON file
const serviceAccountPath = path.join(__dirname, 'readpress-e334d-firebase-adminsdk-t3271-2a404493c3.json');
const serviceAccount = require(serviceAccountPath);

// Path to your data JSON file
const dataFilePath = path.join(__dirname, 'firestore-import-data.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function uploadData() {
  try {
    // Read the JSON file
    const jsonData = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(jsonData);

    // Upload articles
    for (const [id, article] of Object.entries(data.articles)) {
      await db.collection('articles').doc(id).set(article);
    }
    console.log('Articles uploaded successfully');

    // Upload collections
    for (const [id, collection] of Object.entries(data.collections)) {
      await db.collection('collections').doc(id).set(collection);
    }
    console.log('Collections uploaded successfully');

    console.log('All data uploaded successfully');
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

uploadData().then(() => {
  process.exit(0);
}).catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});