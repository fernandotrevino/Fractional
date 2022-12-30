import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import Card from '@/components/Card';
import CardButton from '@/components/CardButton';
import Page from '@/components/Page';
import { InView } from 'react-intersection-observer';
import Createpost from '@/components/createpost';
import Follower from '@/components/follower';
const COMMUNITY_QUERY = gql`
  query ($id: Int!, $limit: Int, $offset: Int) {
    community(id: $id) {
      id
      name
      description
      icon
      members {
        id
        name
        profile_photo
      }
      posts(limit: $limit, offset: $offset) {
        id
        text
        created_ts
        profile_photo
      }
    }
  }
`;

const CommunityPage = () => {
  const { query } = useRouter();
  const { data, loading, fetchMore } = useQuery(COMMUNITY_QUERY, {
    skip: !query.id,
    variables: {
      id: Number(query.id),
      offset: 0,
      limit: 4,
    },
  });

  const community = data?.community;
  const posts = data?.community.posts;
  if (!community || loading) {
    return null;
  }

  return (
    <Page>
      <div className='flex'>
        <Card className='flex-1'>
          <title>{community.name}</title>
          <h1 className='text-2xl font-bold'>Welcome to {community.name}</h1>
          <Createpost source_id={community.id} />
          {posts &&
            posts.map(({ id, profile_photo, text, created_ts }) => (
              <div>
                <Card
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

        <Card className='ml-4 py-10  flex-none grid justify-items-center gap-2 max-w-xs'>
          <div className='text-2xl rounded-full bg-white w-14 h-14 flex items-center justify-center'>
            {community.icon}
          </div>
          <h2 className='text-md font-bold'>{community.name}</h2>
          <span className='text-sm text-gray-400'>
            <strong>{community.members.length}</strong> members
          </span>
          <p className='text-center text-sm'>{community.description}</p>
          <ul className='grid gap-4 mt-2'>
            {community.members.map(({ id, name, profile_photo }) => (
              <li>
                <CardButton
                  href={`/profile/${id}`}
                  className='flex items-center'>
                  <img className='h-6 w-6' src={profile_photo} />
                  <span className='ml-2 text-md'>{name}</span>
                </CardButton>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
};

export default CommunityPage;
