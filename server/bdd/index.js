// Importer le module mysql2
const mysql = require('mysql2');

// Créer une connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',  // Remplace par ton hôte MySQL
  user: 'alexandre',       // Remplace par ton utilisateur MySQL
  password: 'Rkyl32623!', // Remplace par ton mot de passe MySQL
  database: 'dbvhs'  // Remplace par le nom de ta base de données
});

// Se connecter à la base de données

//connection.connect(error => {
 // if (error) {
   // console.error('Erreur de connexion: ' + error.stack);
    //return;
  //}
  //console.log('Connecté en tant que id ' + connection.threadId);
//});

// Exécuter une requête SQL
// const query = 'SELECT * FROM user_data'; // Remplace par ta requête

// connection.query(query, (error, results, fields) => {
//  if (error) {
//    console.error('Erreur lors de l\'exécution de la requête: ' + error.stack);
//    return;
//  }
//  console.log('Résultats: ', results);
//  console.log('Champs: ', fields);
// });

// Fermer la connexion
// connection.end();
module.exports = {connection};
