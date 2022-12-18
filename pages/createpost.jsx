import Card from '@/components/Card';
import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { validate } from 'graphql';
import { useMutation, gql } from '@apollo/client';

const ADD_POST = gql`
  mutation addPost($input: addPostI) {
    addPost(input: $input) {
      text
      user_id
    }
  }
`;

const ADD_COMM = gql`
  mutation addPostC($input: addPostCommuI) {
    addPostC(input: $input) {
      text
      comm_id
    }
  }
`;

const Createpost = () => {
  const [enabled, setEnabled] = useState(false);
  const [text, setText] = useState();
  const [user_id, setUserid] = useState();
  const [addPost] = useMutation(ADD_POST);
  const [addComm] = useMutation(ADD_COMM);
  const [comm_id, setCommId] = useState();

  return (
    <>
      <title>Create Post</title>

      <Tab.Group>
        <Tab.List>
          <Tab
            className='rounded-md border border-transparent bg-blue-100 
   px-4 py-2 mb-3 text-sm mr-3 font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 
   focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
            Profile{' '}
          </Tab>

          <Tab
            className='rounded-md border border-transparent bg-blue-100 
   px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 
   focus-visible:ring-blue-500 focus-visible:ring-offset-2  '>
            Community
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className='p-3'>
            <input
              className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 
   px-6 mb-3  py-4 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 
   focus-visible:ring-blue-500 focus-visible:ring-offset-2 '
              onChange={(event) => {
                setUserid(event.target.value);
              }}
              type='number'
              placeholder='userid'
            />

            <input
              className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 
   px-6 py-4 mb-3 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 
   focus-visible:ring-blue-500 focus-visible:ring-offset-2'
              onChange={(event) => {
                setText(event.target.value);
              }}
              type='text'
              placeholder='text'
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                addPost({
                  variables: { input: { text, user_id: parseInt(user_id) } },
                });
                if (validate) {
                  alert('Post Created');
                }
              }}
              type='submit'
              className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 
              px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 
              focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
              Add Post
            </button>
          </Tab.Panel>

          <Tab.Panel className='p-3'>
            <input
              className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 
   px-6 mb-3  py-4 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 
   focus-visible:ring-blue-500 focus-visible:ring-offset-2 '
              onChange={(event) => {
                setCommId(event.target.value);
              }}
              type='number'
              placeholder='Commid'
            />

            <input
              className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 
   px-6 py-4 mb-3 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 
   focus-visible:ring-blue-500 focus-visible:ring-offset-2'
              onChange={(event) => {
                setText(event.target.value);
              }}
              type='text'
              placeholder='text'
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                addComm({
                  variables: { input: { text, comm_id: parseInt(comm_id) } },
                });
              }}
              type='submit'
              className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 
              px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 
              focus-visible:ring-blue-500 focus-visible:ring-offset-2'>
              Add to Community
            </button>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};
export default Createpost;
