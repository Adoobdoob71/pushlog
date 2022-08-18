import { SearchWorkouts } from "components/index";
import { createRef, useRef } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { styles, theme } from "utils/styles";

const Configuration = () => {
  const swiperRef = useRef(null);

  // @ts-ignore
  const goNext = () => swiperRef?.current?.scrollBy(1, true);
  // @ts-ignore
  const goBack = () => swiperRef?.current?.scrollBy(-1, true);

  return (
    <SafeAreaView style={styles.flex}>
      <Swiper
        activeDotColor={theme.colors.primary}
        loop={false}
        ref={swiperRef}
        scrollEnabled={false}
      >
        <SearchWorkouts goNext={goNext} goBack={goBack} />
        <SearchWorkouts goNext={goNext} goBack={goBack} />
        <SearchWorkouts goNext={goNext} goBack={goBack} />
      </Swiper>
    </SafeAreaView>
  );
};

export default Configuration;
