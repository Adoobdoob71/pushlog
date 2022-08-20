import { useRef } from "react";
import { SafeAreaView } from "react-native";
import Swiper from "react-native-swiper";
import { styles, theme } from "utils/styles";
import { SearchWorkouts, WeightHeight, WorkoutPlan } from "components/index";
import { useNavigation } from "@react-navigation/native";

const Configuration = () => {
  const swiperRef = useRef(null);
  const navigation = useNavigation();
  // @ts-ignore
  const goNext = () => swiperRef?.current?.scrollBy(1, true);
  // @ts-ignore
  const goBack = () => swiperRef?.current?.scrollBy(-1, true);

  const finishConfig = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.flex}>
      <Swiper
        activeDotColor={theme.colors.primary}
        loop={false}
        ref={swiperRef}
        scrollEnabled={false}
      >
        <SearchWorkouts goNext={goNext} goBack={goBack} />
        <WeightHeight goNext={goNext} goBack={goBack} />
        <WorkoutPlan goNext={finishConfig} goBack={goBack} />
      </Swiper>
    </SafeAreaView>
  );
};

export default Configuration;
