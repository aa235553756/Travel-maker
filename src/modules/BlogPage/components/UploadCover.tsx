import React, { useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export default function UploadCover() {
  const [files, setFiles] = useState([])
  return (
    <div className="App">
      <FilePond
        files={files}
        onupdatefiles={() => {
          setFiles
        }}
        allowMultiple={true}
        maxFiles={2}
        // server="/api"
        name="files"
        labelIdle='<div class="uploadBtn"><div class="uploadIcon"></div><span class="filepond--label-action">上傳封面</span></div>'
      />
    </div>
  )
}
