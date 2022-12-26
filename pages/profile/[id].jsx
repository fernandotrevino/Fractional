import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import Card from '@/components/Card';
import CommunityCardButton from '@/components/CommunityCardButton';
import Page from '@/components/Page';
import Createpost from '@/components/createpost';

import { InView } from 'react-intersection-observer';
const USER_QUERY = gql`
  query ($id: Int!, $limit: Int, $offset: Int) {
    user(id: $id) {
      id
      name
      profile_photo
      bio
      communities {
        id
        name
        icon
      }
      posts(limit: $limit, offset: $offset) {
        id
        text
        profile_photo
        created_ts
      }
    }
  }
`;

const ProfilePage = () => {
  const { query } = useRouter();

  const { data, loading, fetchMore } = useQuery(USER_QUERY, {
    skip: !query.id,
    variables: {
      id: Number(query.id),
      offset: 0,
      limit: 4,
    },
  });

  const user = data?.user;
  const posts = data?.user.posts;

  if (!user || loading) {
    return null;
  }

  return (
    <Page>
      <div className='flex'>
        <Card className='flex-1'>
          <h1 className='text-2xl font-bold'>{user.name}'s posts</h1>
          <title>{user.name}</title>
          Posts created by the user (the user's timeline) should be shown in
          this section.
          <Createpost source_id={user.id} />
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
          <button className=' bg-blue-800 rounded-lg text-white p-2  mt-4'>
            Follow "{user.name}"
          </button>
        </Card>
        <Card className='ml-4 py-10  flex-none grid justify-items-center gap-2 max-w-xs'>
          <div className='text-2xl rounded-full bg-white w-14 h-14 flex items-center justify-center'>
            <img src={user.profile_photo} />
          </div>
          <h2 className='text-md font-bold'>{user.name}</h2>
          <span className='text-sm text-gray-400'>
            <strong>{user.communities.length}</strong> communities
          </span>
          <p className='text-center text-sm'>{user.bio}</p>
          <ul className='grid gap-4 mt-2'>
            {user.communities.map(({ id, name, icon }) => (
              <li key={id}>
                <CommunityCardButton href={`/community/${id}`} icon={icon}>
                  {name}
                </CommunityCardButton>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
};

export default ProfilePage;
