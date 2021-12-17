import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';

import { SERVER_BASE_URL } from '../../lib/utils/constant';
import storage from '../../lib/utils/storage';

type Props = {
  commentId: string;
};

const DeleteButton: React.FC<Props> = ({ commentId }) => {
  const { data: currentUser } = useSWR('user', storage);
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const handleDelete = async (commentId: string) => {
    await axios.delete(`${SERVER_BASE_URL}/articles/${pid}/comments/${commentId}`, {
      headers: {
        Authorization: `Token ${currentUser?.token}`,
      },
    });

    mutate(`${SERVER_BASE_URL}/articles/${pid}/comments`);
  };

  return (
    <span className="mod-options">
      <i className="ion-trash-a" onClick={() => handleDelete(commentId)} />
    </span>
  );
};

export default DeleteButton;
