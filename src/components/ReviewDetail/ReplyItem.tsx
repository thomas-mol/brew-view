import { Avatar } from "@mui/material";
import { useUser } from "../../hooks/useUsers";
import Reply from "../../interfaces/reply";
import styles from "./ReviewDetail.module.css";

interface Props {
  reply: Reply;
}

const ReplyItem = ({ reply }: Props) => {
  const { data: user } = useUser(reply.uid);

  return (
    <li className={styles.comment}>
      <Avatar alt={user?.profile_picture} src={user?.name} />
      <div>
        <h3>{user?.name}</h3>
        <span>{reply.text}</span>
      </div>
    </li>
  );
};

export default ReplyItem;
