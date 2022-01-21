import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { QUERY_EVENTS } from '../../utils/queries';
import { UPLOAD_FILE } from '../../utils/mutations';

const baseStyle = {
  display: 'flex',
  flexdirection: 'column',
  justifycontent:'center',
  padding: '20px',
  borderwidth: 1,
  borderradius: 1,
  bordercolor: '#eeeeee',
  borderstyle: 'dashed',
  backgroundcolor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
};

const activeStyle = {
  bordercolor: '#2196f3'
};

const acceptStyle = {
  bordercolor: '#00e676'
};

const rejectStyle = {
  bordercolor: '#ff1744'
};

const ThoughtForm = () => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    const file = acceptedFiles[0];

    uploadFile({
      variables: { file },
      onCompleted: () => {},
    })
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const { 
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png'
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
  const [uploadFile] = useMutation(UPLOAD_FILE)
  const [eventText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addEvent, { error }] = useMutation(ADD_EVENT, {
    update(cache, { data: { addEvent } }) {
      try {
        // could potentially not exist yet, so wrap in a try...catch
        const { events } = cache.readQuery({ query: QUERY_EVENTS });
        cache.writeQuery({
          query: QUERY_EVENTS,
          data: { events: [addEvent, ...events] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache, appending new event to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, events: [...me.events, addEvent] } },
      });
    },
  });

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add event to database
      await addEvent({
        variables: { eventText },
      });

      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  const thumbs = files.map(file => (
    <div key={file.name}>
      <img
       src={file.preview}
       alt={file.name}
       />
    </div>
  ));

  //cleanup
  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/280
        {error && <span className='ml-2'>Something went wrong...</span>}
      </p>
      <form
        className='flex-row justify-center justify-space-between-md align-stretch'
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Create an Event and Tell People What's Happenin'..."
          value={eventText}
          className='form-input col-12 col-md-9'
          onChange={handleChange}
        ></textarea>
        <section>
        <div
        {...getRootProps(style)}
        className={`dropzone ${isDragActive && 'isActive'}`}
      >
          <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
        <aside>
          {thumbs}
        </aside>
        </section>
        <button className='btn col-12 col-md-3' type='submit'>
          Submit
          <span className='icon'>
            <i className='fas fa-check'></i>
          </span>
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;
