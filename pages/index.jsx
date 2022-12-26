import Card from '@/components/Card';
import CommunityCardButton from '@/components/CommunityCardButton';
import Page from '@/components/Page';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import { InView } from 'react-intersection-observer';
const POST_Q = gql`
  query ($offset: Int, $limit: Int) {
    posts(offset: $offset, limit: $limit) {
      id
      text
      profile_photo
    }
  }
`;

const Home = () => {
  const { query } = useRouter();
  const { data, fetchMore } = useQuery(POST_Q, {
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
            posts.map(({ id, profile_photo, text, created_ts }) => (
              <div>
                <Card
                  key={id}
                  className='flex items-center justify-start my-2 '
                  style={{ backgroundColor: 'white' }}>
                  <img className='  mr-5 ' src={profile_photo} />
                  {text}
                </Card>
                <p className=' text-xs flex justify-end'>{created_ts}</p>
              </div>
            ))}
          {data && (
            <InView
              onChange={async (inView) => {
                const currentLength = posts.length;
                if (inView) {
                  await fetchMore({
                    variables: {
                      id: Number(query.id),
                      offset: currentLength,
                      limit: currentLength + 2,
                    },
                  });
                }
              }}
            />
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
