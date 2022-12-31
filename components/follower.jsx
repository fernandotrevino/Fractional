import { useMutation, gql } from '@apollo/client';
import Card from '@/components/Card';
const ADD_FOLLOWER = gql`
  mutation AddFollower($input: AddFollowerInput!) {
    AddFollower(input: $input) {
      user_id
      follower_id
    }
  }
`;

const Follower = ({ follower_id }) => {
  const [AddFollower] = useMutation(ADD_FOLLOWER);
  return (
    <>
      <title>Create Post</title>
      <Card>
        <button
          className='p-2  bg-green-300 rounded font-bold text-white capitalize '
          onClick={() => {
            AddFollower({
              variables: {
                input: {
                  user_id: '1',
                  follower_id: follower_id,
                },
              },
            });
          }}
          type='submit'>
          follow !
        </button>
      </Card>
    </>
  );
};
export default Follower;
