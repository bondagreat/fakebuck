import { STATUS_FRIEND, STATUS_ME } from '../../config/constant';
import FriendAction from './FriendAction';
import MeAction from './MeAction';

export default function ProfileAction({
  statusWithAuthUser,
  updateProfileUser,
  setProfileFriends,
  setStatusWithAuthUser,
}) {
  return (
    <div className="mb-3 align-self-md-end">
      {statusWithAuthUser === STATUS_ME && (
        <MeAction updateProfileUser={updateProfileUser} />
      )}
      {statusWithAuthUser === STATUS_FRIEND && (
        <FriendAction
          setProfileFriends={setProfileFriends}
          setStatusWithAuthUser={setStatusWithAuthUser}
        />
      )}
    </div>
  );
}
