import { Avatar } from "@mui/material";
import { useUser } from "../../hooks/useUsers";
import Reply from "../../interfaces/reply";
import styles from "./ReplyItem.module.css";
import { auth } from "../../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDeleteReply } from "../../hooks/useReplies";

interface Props {
  reply: Reply;
}

const ReplyItem = ({ reply }: Props) => {
  const { data: user } = useUser(reply.uid);
  const { mutate, isLoading } = useDeleteReply();

  return (
    <li className={styles.reply}>
      <Avatar alt={user?.profile_picture} src={user?.name} />
      <div>
        <h3>{user?.name}</h3>
        <span>{reply.text}</span>
      </div>
      {user?.id == auth.currentUser?.uid && (
        <div className={styles.delete} onClick={() => mutate(reply.id)}>
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
          ) : (
            <FontAwesomeIcon icon={faTrash} />
          )}
        </div>
      )}
    </li>
  );
};

export default ReplyItem;
