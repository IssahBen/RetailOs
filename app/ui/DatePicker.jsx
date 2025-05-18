import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
  Animated,
  PanResponder,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, Clock } from "lucide-react-native";
import { formatDate } from "./Utils/dateUtils";
import { requestTransactions } from "./Utils/dateUtils";
const ClockFace = ({
  selectedHour,
  selectedMinute,
  isHourSelection,
  onTimeSelect,
}) => {
  const radius = 120;
  const center = { x: radius, y: radius };
  const numbers = isHourSelection
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 12 }, (_, i) => i * 5);

  const calculatePosition = (index, totalItems) => {
    const angle = (index * (360 / totalItems) - 90) * (Math.PI / 180);
    const x = center.x + (radius - 30) * Math.cos(angle);
    const y = center.y + (radius - 30) * Math.sin(angle);
    return { x, y };
  };

  const calculateAngle = (touch) => {
    const dx = touch.x - center.x;
    const dy = touch.y - center.y;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    return angle;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const touch = {
        x: gestureState.moveX - 20,
        y: gestureState.moveY - 20,
      };
      const angle = calculateAngle(touch);
      const value = isHourSelection
        ? Math.round(angle / 30) % 12 || 12
        : Math.round(angle / 6) % 60;
      onTimeSelect(value);
    },
  });

  return (
    <View
      className="w-[240px] h-[240px] rounded-full border-2 border-gray-200 relative my-5"
      {...panResponder.panHandlers}
    >
      {numbers.map((num) => {
        const pos = calculatePosition(num, 12);
        const isSelected = isHourSelection
          ? num === selectedHour
          : num === selectedMinute;
        return (
          <TouchableOpacity
            key={num}
            className={`absolute w-[30px] h-[30px] items-center justify-center rounded-full ${
              isSelected ? "bg-blue-600" : ""
            }`}
            style={{ left: pos.x - 15, top: pos.y - 15 }}
            onPress={() => onTimeSelect(num)}
          >
            <Text
              className={`text-base ${
                isSelected ? "text-white" : "text-gray-800"
              }`}
            >
              {num.toString().padStart(2, "0")}
            </Text>
          </TouchableOpacity>
        );
      })}

      <View
        className="absolute w-[2px] h-[40%] bg-blue-600 bottom-[50%] left-[50%]"
        style={{
          transform: [
            {
              rotate: `${
                isHourSelection ? (selectedHour % 12) * 30 : selectedMinute * 6
              }deg`,
            },
            { translateX: -1 },
          ],
        }}
      />
      <View className="absolute w-2 h-2 bg-blue-600 rounded-full top-[50%] left-[50%] -ml-1 -mt-1" />
    </View>
  );
};

const DatePicker = ({
  date,
  onChange,
  placeholder = "Select date",
  mode = "date",
  minimumDate,
  maximumDate,
  label,
  setTransactions,
}) => {
  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState(date || new Date());
  const [isHourSelection, setIsHourSelection] = useState(true);
  const [animatedOpacity] = useState(new Animated.Value(0));
  const [animatedTranslateY] = useState(new Animated.Value(100));

  const handleOpen = () => {
    setTempDate(date || new Date());
    setShow(true);
    setIsHourSelection(true);

    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animatedTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(animatedTranslateY, {
        toValue: 100,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => setShow(false));
  };

  const handleConfirm = async () => {
    onChange(tempDate);
    const res = await requestTransactions(setTransactions, tempDate);
    if (res === "success") {
      console.log(tempDate);
    }
    handleClose();
  };

  const handleTimeSelect = (value) => {
    const newDate = new Date(tempDate);
    if (isHourSelection) newDate.setHours(value);
    else newDate.setMinutes(value);
    setTempDate(newDate);
  };

  const handleChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShow(false);
      if (selectedDate) onChange(selectedDate);
    } else {
      setTempDate(selectedDate || tempDate);
    }
  };

  const renderClockPicker = () => (
    <Modal transparent visible={show} onRequestClose={handleClose}>
      <Animated.View
        className="flex-1 justify-center items-center bg-black/50"
        style={{ opacity: animatedOpacity }}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="w-[90%] max-w-[340px]"
          onPress={(e) => e.stopPropagation()}
        >
          <Animated.View
            className="bg-white rounded-2xl overflow-hidden shadow-lg"
            style={{ transform: [{ translateY: animatedTranslateY }] }}
          >
            <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-50">
              <TouchableOpacity onPress={handleClose}>
                <Text className="text-base text-gray-600">Cancel</Text>
              </TouchableOpacity>
              <Text className="text-base font-medium text-gray-800">
                {tempDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </Text>
              <TouchableOpacity onPress={handleConfirm}>
                <Text className="text-base font-semibold text-blue-600">
                  Done
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="flex-row justify-center items-center py-4"
              onPress={() => setIsHourSelection(!isHourSelection)}
            >
              <Text
                className={`text-5xl px-2 ${
                  isHourSelection ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {tempDate.getHours().toString().padStart(2, "0")}
              </Text>
              <Text className="text-5xl text-gray-400">:</Text>
              <Text
                className={`text-5xl px-2 ${
                  !isHourSelection ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {tempDate.getMinutes().toString().padStart(2, "0")}
              </Text>
            </TouchableOpacity>

            <ClockFace
              selectedHour={tempDate.getHours()}
              selectedMinute={tempDate.getMinutes()}
              isHourSelection={isHourSelection}
              onTimeSelect={handleTimeSelect}
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-base font-medium text-gray-700 mb-2">
          {label} : : Show transactions before time
        </Text>
      )}

      <TouchableOpacity
        className="flex-row items-center justify-between border border-gray-300 rounded-lg px-3 py-3 bg-white"
        onPress={handleOpen}
        activeOpacity={0.7}
      >
        <Text
          className={`text-base ${date ? "text-gray-800" : "text-gray-400"}`}
        >
          {date ? formatDate(date, mode) : placeholder}
        </Text>
        {mode === "time" ? (
          <Clock size={20} color="#6B7280" />
        ) : (
          <Calendar size={20} color="#6B7280" />
        )}
      </TouchableOpacity>

      {Platform.OS === "android" ? (
        show && (
          <DateTimePicker
            value={date || new Date()}
            mode={mode}
            display="default"
            onChange={handleChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
        )
      ) : mode === "time" ? (
        renderClockPicker()
      ) : (
        <Modal transparent visible={show} onRequestClose={handleClose}>
          <Animated.View
            className="flex-1 justify-center items-center bg-black/50"
            style={{ opacity: animatedOpacity }}
            onTouchEnd={handleClose}
          >
            <TouchableOpacity
              activeOpacity={1}
              className="w-[90%] max-w-[340px]"
              onPress={(e) => e.stopPropagation()}
            >
              <Animated.View
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
                style={{ transform: [{ translateY: animatedTranslateY }] }}
              >
                <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-50">
                  <TouchableOpacity onPress={handleClose}>
                    <Text className="text-base text-gray-600">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleConfirm}>
                    <Text className="text-base font-semibold text-blue-600">
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={tempDate}
                  mode={mode}
                  display="spinner"
                  onChange={handleChange}
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  style={{ height: 215 }}
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </Modal>
      )}
    </View>
  );
};

export default DatePicker;
