import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_POST = gql`
  mutation addPost($input: AddPostInput!) {
    addPost(input: $input) {
      text
      user_id
      source_id
    }
  }
`;

const Createpost = ({ source_id }) => {
  const [addPost] = useMutation(ADD_POST);

  const [text, setText] = useState('');

  return (
    <>
      <title>Create Post</title>

      <input
        placeholder='Enter text'
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          addPost({
            variables: {
              input: {
                text: text,
                user_id: '1',
                source_id: source_id,
              },
            },
          });
        }}
        type='submit'
        style={{ backgroundColor: 'lightblue', marginLeft: '100px' }}
        className='flex items-center p-2 rounded ml-auto'>
        Add Post
      </button>
    </>
  );
};
export default Createpost;
