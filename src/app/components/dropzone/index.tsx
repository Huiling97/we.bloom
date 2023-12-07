import { useDropzone } from 'react-dropzone';
import AlertDismissible from '../alert';

import './style.scss';

const DropZone = () => {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      accept: {
        'image/jpeg': [],
        'image/png': [],
      },
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <div>
      Image added: {file.name} - {file.size} bytes
    </div>
  ));

  const isFileRejected = fileRejections.length !== 0;

  return (
    <section className='container'>
      <AlertDismissible
        text='Only *.jpeg and *.png images will be accepted'
        showAlert={isFileRejected}
      />
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select an image</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      <aside>{acceptedFileItems}</aside>
    </section>
  );
};

export default DropZone;
