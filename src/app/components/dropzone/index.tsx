import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import AlertDismissible from '../alert';
import { TrashAlt } from 'styled-icons/boxicons-solid';
import './style.scss';
import '../../assets/style/_icon.scss';

type DropZoneProps = {
  onAdd: (img: string) => void;
};

const DropZone = ({ onAdd }: DropZoneProps) => {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      accept: {
        'image/jpeg': [],
        'image/png': [],
      },
    });
  const [files, setFiles] = useState(acceptedFiles);
  const [preview, setPreview] = useState<string | null>(null);

  const deleteHandler = () => {
    setFiles((prevFile) => prevFile.filter((file) => prevFile[0] !== file));
  };

  const acceptedFileItems = acceptedFiles.map((file) => (
    <div key={file.name}>
      <div className='dropzone-file-container'>
        <div>
          Image added:
          <br />
          {file.name} - {file.size} bytes
        </div>
        <div className='icon-container'>
          <TrashAlt size='28' className='trash-icon' onClick={deleteHandler}>
            Delete
          </TrashAlt>
        </div>
      </div>
      <img src={`${preview}`} className='preview-image' />
    </div>
  ));

  const hasFileItems = files?.length !== 0;
  const isFileRejected = fileRejections.length !== 0;

  useEffect(() => {
    setFiles(acceptedFiles);
  }, [acceptedFiles]);

  useEffect(() => {
    if (hasFileItems) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = reader.result as string;
        setPreview(img);
        onAdd(img);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, [files]);

  return (
    <div className='dropzone-container'>
      {!hasFileItems && (
        <section>
          <AlertDismissible
            text='Only *.jpeg and *.png images will be accepted'
            showAlert={isFileRejected}
          />
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop an image here, or click to select an image</p>
            <em>(Only *.jpeg and *.png images will be accepted)</em>
          </div>
        </section>
      )}
      <div>
        <aside>{hasFileItems && acceptedFileItems}</aside>
      </div>
    </div>
  );
};

export default DropZone;
