import styles from "./TestPage.module.css";
import CropInput from "../../components/CropInput/CropInput";

const TestPage = () => {
  return (
    <div className={styles.container}>
      <CropInput onCropComplete={() => {}} />
    </div>
  );
};

export default TestPage;
