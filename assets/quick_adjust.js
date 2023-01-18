const fs = require('fs')
const techs = require("./techs.json");

const newTechs = techs.map((tech) => {
  delete tech.hundred
  delete tech.repository
  delete tech.documentation
  return tech
})

const jsonString = fs.writeFileSync('./techss.json', JSON.stringify(newTechs))
