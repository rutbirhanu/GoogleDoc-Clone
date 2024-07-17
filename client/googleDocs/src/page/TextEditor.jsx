import Quill from "quill"
import "quill/dist/quill.snow.css"
import { useCallback, useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useParams } from "react-router"


const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5,6,false] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["image", "blockquote"],
    ["clean"]
]

const SAVE_INTERVAL=3000

function TextEditor() {
    const {id:documentId}= useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()


    useEffect(() => {
        const s = io("http://localhost:5000")
        setSocket(s)
        return () => {
            s.disconnect()
        }
    }, [])

    useEffect(() => {
        if (socket == null || quill == null) return 
        
        const handler = (delta, oldDelta, source) => { 
            if (source !== "user") return 
            socket.emit("emit-changes", delta)
        }

        quill.on("text-change", handler)
        return ()=>{quill.off("text-change" ,handler)}
     },
        [quill, socket])
    

    useEffect(() => {
        if (socket == null || quill == null) return 
        const handler = (delta) => { quill.updateContents(delta) }
        socket.on("recieve-changes", handler)

        return ()=>{socket.off("text-change" ,handler)}
     },
    [quill, socket])
    
    useEffect(() => {
        if (socket == null || quill == null) return 
        socket.once("load-document", document => {
            quill.setContents(document)
            quill.enable()
        })

        socket.emit("get-document", documentId)
    },
        [socket, quill, documentId])
    
    useEffect(() => {
        if (socket == null || quill == null) return 
        const interval = setInterval(() => {
        socket.emit("save-doc", quill.getContents())
        }, SAVE_INTERVAL)

        return () => {
            clearInterval(interval)
        }
        
    }, [socket,quill, documentId])

    const wrapperRef = useCallback((wrapper) => {

        if (wrapper == null) return
        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } })
        q.disable()
        q.setText("Loading .... ")
        setQuill(q)
    },
        [])
    return (
        <div id="container" ref={wrapperRef}> </div>
    )
}

export default TextEditor