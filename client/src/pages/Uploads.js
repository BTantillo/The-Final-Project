import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql';

export const FileQuery = gql`
{
    files {
        id
        filename
        mimetype
        path
    }
}
;`

export default function Uploads() {
    const { loading, data } = useQuery(
      FileQuery,
    ); /* useQuery returns and object with **loading, 
     data, and error** but we only care about the loading state and the data object.
     */
  
    if (loading) {
      // display loading when files are being loaded
      return <h1>Loading...</h1>;
    } else if (!data) {
      return <h1>No images to show</h1>;
    } else {
      return (
        <>
          <h1 className='text-center'>Recent uploads</h1>
          {data.files.map((file) => {
            console.log(file);
            return (
              file.mimetype.split('/')[0].includes('image') && (
                <div
                  style={{
                    padding: 16,
                    border: '1px solid gray',
                    borderRadius: 5,
                    margin: '16px 0',
                  }}
                  key={file.filename}
                >
                  <img
                    src={'/' + file.path}
                    /* Note the '/'. we added a slash prefix because our file path 
                    comes in this format: images/<filename>.jpg.
                    */ alt={file.filename}
                    style={{ width: '100%' }}
                  />
                  <p>{file.filename}</p>
                </div>
              )
            );
          })}
        </>
      );
    }
  }