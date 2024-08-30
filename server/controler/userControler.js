// eslint-disable-next-line no-undef
const { User } = require("../bdd/userRepository.js");

async function resultat() {
  const teste = await new User().select();

  console.log(teste);
}
resultat();
