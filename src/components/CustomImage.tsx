import { useState } from "react";
import Skeleton from "react-loading-skeleton";

interface Props {
  src?: string;
  width?: number;
}

const CustomImage = ({ src, width = 200 }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <img
        style={{ display: imageLoaded ? "block" : "none" }}
        src={src}
        alt={src}
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && <Skeleton height={width} width={width} />}
    </>
  );
};

export default CustomImage;
