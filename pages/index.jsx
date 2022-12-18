import Card from '@/components/Card';
import CommunityCardButton from '@/components/CommunityCardButton';
import Page from '@/components/Page';
import { useQuery, gql } from '@apollo/client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Createpost from './createpost';
const POST_Q = gql`
  {
    posts {
      id
      text
      created_ts  
    }
    
  }
`;

const Home = () => {
  const { data } = useQuery(POST_Q);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <Page>
      <div className='flex'>
        <Card className='flex-1'>
          <h1 className='text-2xl font-bold'>Welcome back! 👋</h1>
          <p>Your newsfeed should be shown in this section.</p>

          <button
            type='button'
            onClick={openModal}
            className='rounded-md bg-blue-900 bg-opacity-60 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            Post !
          </button>

          {data &&
            data.posts.map(({ id, text, created_ts }) => {
              return (
                <Card key={id} className=' bg-gray-50 p-4 m-4 shadow-lg '>
                  <p className=' bg-gray-50 shadow-md rounded-lg p-3'>
                    {text}
                    
                  </p>
                  <p className=' text-xs flex justify-end'>{created_ts}</p>
                  <br />
                  <input
                    className=' rounded-md bg-gray-50 shadow-sm text-center p-3'
                    placeholder='Replay..'
                  />
                  <br />
                  <button className=' bg-blue-900  text-white p-2 mt-4 rounded-md'>
                    Comment
                  </button>
                </Card>
              );
            })}
        </Card>
        <Card className='ml-4 max-w-xs flex-none'>
          <h2 className='text-md font-bold'>Communities</h2>
          <ul className='grid gap-4 mt-2'>
            <li>
              <CommunityCardButton icon='🤠' href='/community/1'>
                Dallas Fort Worth Investors
              </CommunityCardButton>
            </li>
            <li>
              <CommunityCardButton icon='🔨' href='/community/2'>
                BRRRR Investors
              </CommunityCardButton>
            </li>
          </ul>
        </Card>

        <Transition show={isOpen} as={Fragment}>
          <Dialog as='div' className='relative z-10' onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'>
                  <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900'>
                      Create Post
                    </Dialog.Title>
                    <div className='mt-2'>
                      <div className='text-sm text-gray-500 flex justify-center'>
                        <Createpost />
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </Page>
  );
};

export default Home;
