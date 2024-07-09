import Quill from "quill"
import "quill/dist/quill.snow.css"
import { useCallback, } from "react"

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5,6,false] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["image", "blockquote"],
    ["clean"]
]

function TextEditor() {

    const wrapperRef = useCallback((wrapper) => {

        if (wrapper == null) return
        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        new Quill(editor, { theme: "snow", modules: {toolbar:TOOLBAR_OPTIONS} })
    },
        [])
    return (
        <div id="container" ref={wrapperRef}> </div>
    )
}

export default TextEditor