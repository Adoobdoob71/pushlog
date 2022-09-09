import { FC } from "react";
import { SafeAreaView } from "react-native";
import { Header } from "components/index";
import { styles } from "utils/styles";

interface Props {
  templateName: string;
}

const WorkoutTemplate: FC<Props> = ({ templateName }) => {
  return (
    <SafeAreaView style={[styles.flex, styles.mainWrapper]}>
      <Header title={templateName} backButton />
    </SafeAreaView>
  );
};

export default WorkoutTemplate;
