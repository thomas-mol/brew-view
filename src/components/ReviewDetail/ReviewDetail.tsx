import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { replySchema, TReplySchema } from "../../constants/types";
import { useAddReply } from "../../hooks/useReplies";
import Reply from "../../interfaces/reply";
import Review from "../../interfaces/review";
import { timestampToString } from "../../utils/timeStampToString";
import styles from "./ReviewDetail.module.css";
import { auth } from "../../config/firebase";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomImage from "../CustomImage";
import ReplyItem from "../ReplyItem/ReplyItem";

interface Props {
  review: Review;
  replies: Reply[];
}

const ReviewDetail = ({ review, replies }: Props) => {
  const { mutate: addReply, isLoading } = useAddReply();

  const { control, handleSubmit, reset } = useForm<TReplySchema>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (data: TReplySchema) => {
    const reply = {
      text: data.text,
      uid: auth.currentUser?.uid,
      reviewId: review.id,
    } as Reply;

    addReply({ toAdd: reply });
    reset();
  };

  return (
    <>
      {/* CARD */}
      <article className={styles.card}>
        {/* IMAGE */}
        <div className={styles.imageContainer}>
          <CustomImage src={review.photo_url} width={400} />
        </div>

        {/* COMMENT SECTION */}
        <div className={styles.section}>
          <div className={styles.header}>
            <div>
              <h3>{review.title}</h3>
              <p>{timestampToString(review.date)}</p>
            </div>
            {/* USER PROFILE PICTURE */}
            <Avatar src={review.uid} />
          </div>
          <div className={styles.content}>
            <ul className={styles.replyList}>
              {replies.length === 0 && <li>Nobody has replied yet...</li>}
              {replies.map((reply, index) => (
                <ReplyItem reply={reply} key={index} />
              ))}
            </ul>
          </div>
          <form className={styles.input} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="text"
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  placeholder="Leave a reply.."
                  error={!!fieldState?.error}
                  sx={{ flex: 1 }}
                />
              )}
            />
            <Button type="submit" variant="outlined" disabled={isLoading}>
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
              ) : (
                "Reply"
              )}
            </Button>
          </form>
        </div>
      </article>
    </>
  );
};

export default ReviewDetail;
