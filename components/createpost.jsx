import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Card from '@/components/Card';
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
      <form
        onSubmit={() => {
          addPost({
            variables: {
              input: {
                text: text,
                user_id: '1',
                source_id: source_id,
              },
            },
          });
        }}>
        <Card>
          <input
            required
            className='mr-3 rounded-md p-4 '
            placeholder='Enter text'
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <button
            type='submit'
            className='  p-2  bg-green-300 text-white capitalize font-bold rounded mt-3 inline-block'>
            Add Post !
          </button>
        </Card>
        <hr />
      </form>
    </>
  );
};
export default Createpost;
