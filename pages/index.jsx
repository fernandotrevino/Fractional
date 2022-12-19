import Card from '@/components/Card';
import CommunityCardButton from '@/components/CommunityCardButton';
import Page from '@/components/Page';
import { useQuery, gql } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
const POST_Q = gql`
  query {
    posts {
      id
      text
      name
      profile_photo
    }
  }
`;

const Home = () => {
  const { data } = useQuery(POST_Q, {
    variables: {
      offset: 0,
      limit: 2,
    },
  });
  const posts = data?.posts;
  return (
    <Page>
      <div className='flex'>
        <Card className='flex-1'>
          <h1 className='text-2xl font-bold'>Welcome back! 👋</h1>
          <p>Your newsfeed should be shown in this section.</p>

          {posts &&
            posts.map(({ id, text, created_ts, profile_photo }) => {
              return (
                <Card key={id} className=' bg-gray-50 p-4 m-4 shadow-lg '>
                  <p className=' bg-gray-50 shadow-md rounded-lg p-3'>{text}</p>
                  <img className='h-max w-6 mr-4' src={profile_photo} />
                  <br />
                  <input
                    className=' rounded-md bg-gray-50 shadow-sm text-center p-3'
                    placeholder='Replay..'
                  />
                </Card>
              );
            })}

          {data && (
            <InfiniteScroll
              dataLength={posts.length}
              next={posts.fetchMoree}
              inverse={true} //
              hasMore={true}
              loader={<h4>Loading...</h4>}
              scrollableTarget='scrollableDiv'>
              {posts &&
                posts.map(({ id, text }) => (
                  <div>
                    <Card key={id} className=' bg-gray-50 p-4 m-4 shadow-lg '>
                      <p className=' bg-gray-50 shadow-md rounded-lg p-3'>
                        {text}
                      </p>
                      {/* <p className=' text-xs flex justify-end'>{created_ts}</p> */}
                      <br />
                      <input
                        className=' rounded-md bg-gray-50 shadow-sm text-center p-3'
                        placeholder='Replay..'
                      />
                    </Card>
                  </div>
                ))}
            </InfiniteScroll>
          )}
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
      </div>
    </Page>
  );
};

export default Home;
