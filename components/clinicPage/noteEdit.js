// Import React modules
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

// Import DB modules
import { client } from '../../api-lib/azure/azureConfig';

const currentdate = new Date();

export default function NoteEdit(props) {
  const [hover, setHover] = useState(false)
  const [note, setNote] = useState({
    title: "",
    note: ""
  })

  async function updateInfo() {
    const database = client.database("uc-ctct");
    const container = database.container(props.type);
    const { resource: data } = await container.item(props.id, props.id).read();
    let noteInfo = data.notes
    console.log(note)
    noteInfo.unshift(note)
    const replaceOperation =
      [{
        op: "replace",
        path: "/notes",
        value: noteInfo
      }];
    const { resource: patchRes } = await container.item(props.id, props.id).patch(replaceOperation)
    props.reload()
  }

  // Allow the user to use 'Enter' to submit changes, on top of clicking 'Save'
  useEffect(() => {
    document.addEventListener("keydown", e => {
      if (e.key === 'Enter') {
        updateInfo()
        props.setOpen(false)
        return
      }
    })
  })

  return (
    <React.Fragment>
      <div className="backDrop" onClick={() => props.setOpen(false)}></div>
      <div className="editScreen">
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
          <p className="editTitle">Add Additional Clinical Notes</p>
          <IoClose color={hover ? "#CD0000" : "#C4C4C4"} size={hover ? 38 : 35} style={{transition: '0.2s linear', cursor: 'pointer'}} 
                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => props.setOpen(false)} />
        </div>
        <div style={{ height: 'auto', width: '90%' }}>
          <p><strong>Title:</strong><input placeholder="Add Title Here" onChange={(x) => {
            let newValue = { ...note }
            newValue.title = x.target.value + ` | Added: ${currentdate.getMonth()}/${currentdate.getDate()}/${currentdate.getFullYear()}`
            setNote(newValue)
            return
          }} /></p>
          <div style={{ display: 'flex' }}>
            <strong>Note:</strong>
            <textarea placeholder="Add Notes Here" onChange={(x) => {
              let newValue = { ...note }
              newValue.note = x.target.value
              setNote(newValue)
              return
            }}></textarea>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
          <div className="saveBtn" onClick={() => {
            updateInfo()
            props.setOpen(false)
            return
          }}>Add Note</div>
        </div>
      </div>
      <style jsx>
        {
          `
                .backDrop {
                    height: 100vh;
                    width: 100vw;
                    background-color: rgba(0, 0, 0, 0.2);
                    position: absolute;
                    z-index: 900;
                }
                
                .editTitle {
                    font-size: 1.3rem;
                    font-weight: bold;
                }
                
                .editScreen {
                    position: absolute;
                    height: 65vh;
                    width: 50vw;
                    background-color: #fff;
                    opacity: 100%;
                    top: 15vh;
                    left: 25vw;
                    z-index: 901;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    border-radius: 1rem;
                    padding: 2rem;
                    overflow-y: scroll;
                }
                
                .editScreen input, .editScreen textarea {
                    margin-left: 0.4rem;
                    border-radius: 0.5rem;
                    border: solid 1px #c4c4c4;
                    padding: 0.5rem;
                    width: 50%;
                }

                .editScreen textarea {
                    width: 80%;
                    height: 20rem;
                }
                
                .saveBtn {
                    background-color: #1AACFE;
                    height: 3rem;
                    width: 8rem;
                    border-radius: 1rem;
                    color: #fff;
                    font-size: 1rem;
                    font-weight: bold;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
                `
        }
      </style>
    </React.Fragment>
  )
}