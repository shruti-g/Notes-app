const fs=require('fs')
const chalk=require('chalk')

const addNote=(title,body) => {
  const notes =loadNotes()
  const duplicate=notes.find((note)=> note.title===title)
  if(!duplicate){
    notes.push({
      title:title,
      body:body
    })
    saveNotes(notes)
    console.log(chalk.blue.inverse("Note has been added"))
  }else{
    console.log(chalk.red.inverse("Note title has been taken"))
  }
}

const listNotes=()=>{
  const notes=loadNotes()
  console.log(chalk.inverse.magenta("Your Notes"))
  notes.forEach((note)=>{
    console.log(note.title)
  })
}

const saveNotes=(notes)=>{
  const dataJSON=JSON.stringify(notes)
  fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes=()=>{
  try{
    const dataBuffer=fs.readFileSync('notes.json')
    const dataJSON=dataBuffer.toString()
    return JSON.parse(dataJSON)
  }catch(e){
    return []
  }
}
const removeNote=(title)=>{
  const notes=loadNotes()
  const notesToKeep=notes.filter((note)=>note.title!==title)
  if(notes.length===notesToKeep.length){
    console.log(chalk.red.inverse("Note not found!"))
  }else{
    console.log(chalk.blue.inverse("Note removed!"))
    saveNotes(notesToKeep)
  }

}

const readNote=(title)=>{
  const notes=loadNotes()
  const readnote=notes.find((note) => note.title===title)
  if(readnote){
    console.log(chalk.inverse.magenta(readnote.title))
    console.log(readnote.body)
  }
  else{
    console.log(chalk.inverse.red("No Note found"))
  }
}

module.exports={
  addNote:addNote,
  removeNote:removeNote,
  listNotes:listNotes,
  readNote:readNote
}
