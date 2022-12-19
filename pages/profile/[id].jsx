import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import Card from '@/components/Card';
import CommunityCardButton from '@/components/CommunityCardButton';
import Page from '@/components/Page';
import Createpost from '@/components/createpost';

const USER_QUERY = gql`
  query ($id: Int!) {
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
      posts {
        id
        text
        profile_photo
      }
    }
  }
`;

const ProfilePage = () => {
  const { query } = useRouter();

  const { data, loading, error } = useQuery(USER_QUERY, {
    skip: !query.id,
    variables: {
      id: Number(query.id),
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
          <Createpost />
          {posts &&
            posts.map(({ id, text, profile_photo }) => {
              return (
                <div key={id} className=' flex justify-items-center p-1'>
                  {text}
                  <img className='h-max w-6  ml-3' src={profile_photo} />
                </div>
              );
            })}
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
