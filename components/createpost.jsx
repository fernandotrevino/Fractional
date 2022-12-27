import { useState } from 'react';
import { useMutation, gql, refetchQueries } from '@apollo/client';
import { useRouter } from 'next/router';
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
        <Card className=' bg-gray-200 '>
          <input
            required
            className='mr-3 rounded-md p-4  hover:none focus:none'
            placeholder='Enter text'
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <button
            type='submit'
            className='  p-2  bg-red-500 rounded ml-auto inline-block'>
            Add Post
          </button>
        </Card>
      </form>
    </>
  );
};
export default Createpost;
