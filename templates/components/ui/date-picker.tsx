import { BottomSheet, useBottomSheet } from '@/components/ui/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';
import { useThemeColor } from '@/hooks/useThemeColor';
import { BORDER_RADIUS, CORNERS, FONT_SIZE, HEIGHT } from '@/theme/globals';
import {
  Calendar,
  CalendarClock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  CalendarRange,
  ArrowRight,
} from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import { TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

// Conditional typing based on mode
interface BaseDatePickerProps {
  label?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  style?: ViewStyle;
  minimumDate?: Date;
  maximumDate?: Date;
  timeFormat?: '12' | '24';
  variant?: 'filled' | 'outline' | 'group';
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

interface DatePickerPropsRange extends BaseDatePickerProps {
  mode: 'range';
  value?: DateRange;
  onChange?: (value: DateRange | undefined) => void;
}

interface DatePickerPropsDate extends BaseDatePickerProps {
  mode?: 'date' | 'time' | 'datetime';
  value?: Date;
  onChange?: (value: Date | undefined) => void;
}

export type DatePickerProps = DatePickerPropsRange | DatePickerPropsDate;

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Generate year range (current year ± 50 years)
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 101 }, (_, i) => currentYear - 50 + i);

// Type guard to check if value is DateRange
const isDateRange = (
  value: Date | DateRange | undefined
): value is DateRange => {
  return (
    value !== undefined &&
    typeof value === 'object' &&
    value !== null &&
    'startDate' in value &&
    'endDate' in value
  );
};

export function DatePicker(props: DatePickerProps) {
  const {
    label,
    error,
    placeholder = 'Select date',
    disabled = false,
    style,
    minimumDate,
    maximumDate,
    timeFormat = '24',
    variant = 'filled',
    labelStyle,
    errorStyle,
  } = props;

  const mode = props.mode || 'date';
  const value = props.value;
  const onChange = props.onChange;

  const { isVisible, open, close } = useBottomSheet();

  // Get the current date for navigation, prioritizing single date or range start date
  const getCurrentDate = useCallback(() => {
    if (mode === 'range') {
      const rangeValue = isDateRange(value)
        ? value
        : { startDate: null, endDate: null };
      return rangeValue.startDate || new Date();
    }
    return (value as Date) || new Date();
  }, [value, mode]);

  const [currentDate, setCurrentDate] = useState(() => getCurrentDate());
  const [viewMode, setViewMode] = useState<'date' | 'time' | 'month' | 'year'>(
    'date'
  );
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  // Range selection state for temporary storage during selection
  const [tempRange, setTempRange] = useState<DateRange>(() =>
    mode === 'range' && isDateRange(value)
      ? value
      : { startDate: null, endDate: null }
  );

  // Theme colors
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');
  const primaryForegroundColor = useThemeColor({}, 'primaryForeground');
  const mutedColor = useThemeColor({}, 'muted');
  const textMutedColor = useThemeColor({}, 'textMuted');
  const mutedForegroundColor = useThemeColor({}, 'mutedForeground');
  const textColor = useThemeColor({}, 'text');
  const errorColor = useThemeColor({}, 'red');

  const formatDisplayValue = useCallback(() => {
    if (mode === 'range') {
      const rangeValue = isDateRange(value)
        ? value
        : { startDate: null, endDate: null };

      if (!rangeValue.startDate && !rangeValue.endDate) {
        return placeholder;
      }

      const startStr = rangeValue.startDate
        ? rangeValue.startDate.toLocaleDateString()
        : '';
      const endStr = rangeValue.endDate
        ? rangeValue.endDate.toLocaleDateString()
        : '';

      if (startStr && endStr) {
        return `${startStr} - ${endStr}`;
      } else if (startStr) {
        return `${startStr} - Select end date`;
      } else if (endStr) {
        return `Select start date - ${endStr}`;
      }
      return placeholder;
    }

    const dateValue = value as Date;
    if (!dateValue) return placeholder;

    switch (mode) {
      case 'time':
        if (timeFormat === '12') {
          return dateValue.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
        }
        return dateValue.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
      case 'datetime':
        const timeStr =
          timeFormat === '12'
            ? dateValue.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
            : dateValue.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              });
        return `${dateValue.toLocaleDateString()} ${timeStr}`;
      default:
        return dateValue.toLocaleDateString();
    }
  }, [value, mode, placeholder, timeFormat]);

  // Helper function to check if a date is disabled
  const isDateDisabled = useCallback(
    (date: Date) => {
      if (minimumDate && date < minimumDate) return true;
      if (maximumDate && date > maximumDate) return true;
      return false;
    },
    [minimumDate, maximumDate]
  );

  // Helper function to check if a date is in range
  const isDateInRange = useCallback(
    (date: Date) => {
      if (mode !== 'range' || !tempRange.startDate || !tempRange.endDate) {
        return false;
      }

      // Create new date objects to avoid mutation
      const startDate = new Date(tempRange.startDate);
      const endDate = new Date(tempRange.endDate);
      const checkDate = new Date(date);

      // Normalize dates for comparison (remove time)
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      checkDate.setHours(0, 0, 0, 0);

      return checkDate >= startDate && checkDate <= endDate;
    },
    [mode, tempRange]
  );

  // Helper function to check if a date is a range endpoint
  const isRangeEndpoint = useCallback(
    (date: Date) => {
      if (mode !== 'range') {
        return { isStart: false, isEnd: false };
      }

      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);

      const isStart =
        tempRange.startDate &&
        new Date(tempRange.startDate).setHours(0, 0, 0, 0) ===
          normalizedDate.getTime();
      const isEnd =
        tempRange.endDate &&
        new Date(tempRange.endDate).setHours(0, 0, 0, 0) ===
          normalizedDate.getTime();

      return { isStart: !!isStart, isEnd: !!isEnd };
    },
    [mode, tempRange]
  );

  // Memoized calendar calculations
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create calendar grid with proper positioning
    const weeks: (number | null)[][] = [];
    let currentWeek: (number | null)[] = [];

    // Fill empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);

      // If week is complete (7 days) or it's the last day, start a new week
      if (currentWeek.length === 7) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    }

    // Add the last incomplete week if it exists
    if (currentWeek.length > 0) {
      // Fill remaining cells with null
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return { weeks, year, month, daysInMonth };
  }, [currentDate]);

  const handleRangeSelect = (day: number) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    // Check if date is disabled
    if (isDateDisabled(selectedDate)) return;

    // If no start date or both dates are selected, start fresh
    if (!tempRange.startDate || (tempRange.startDate && tempRange.endDate)) {
      setTempRange({
        startDate: selectedDate,
        endDate: null,
      });
    } else {
      // We have a start date but no end date
      const startDate = tempRange.startDate;

      if (selectedDate < startDate) {
        // If selected date is before start date, make it the new start date
        setTempRange({
          startDate: selectedDate,
          endDate: null,
        });
      } else {
        // Selected date is after start date, make it the end date
        setTempRange({
          startDate: startDate,
          endDate: selectedDate,
        });
      }
    }
  };

  const handleDateSelect = (day: number) => {
    if (mode === 'range') {
      handleRangeSelect(day);
      return;
    }

    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    // Check if date is disabled
    if (isDateDisabled(newDate)) return;

    setCurrentDate(newDate);

    if (mode === 'date') {
      (onChange as (value: Date | undefined) => void)?.(newDate);
      close();
    } else if (mode === 'datetime') {
      setViewMode('time');
    }
  };

  const handleTimeChange = (hours: number, minutes: number) => {
    const newDate = new Date(currentDate);
    newDate.setHours(hours, minutes, 0, 0);
    setCurrentDate(newDate);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setShowMonthPicker(false);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setShowYearPicker(false);
  };

  const handleConfirm = () => {
    if (mode === 'range') {
      (onChange as (value: DateRange | undefined) => void)?.(tempRange);
    } else {
      (onChange as (value: Date | undefined) => void)?.(currentDate);
    }
    close();
  };

  const resetToToday = () => {
    const today = new Date();
    setCurrentDate(today);

    if (mode === 'range') {
      setTempRange({ startDate: today, endDate: null });
    } else if (mode === 'date') {
      (onChange as (value: Date | undefined) => void)?.(today);
      close();
    }
  };

  const clearSelection = () => {
    if (mode === 'range') {
      setTempRange({ startDate: null, endDate: null });
      (onChange as (value: DateRange | undefined) => void)?.(undefined);
    } else {
      (onChange as (value: Date | undefined) => void)?.(undefined);
    }
  };

  const renderMonthYearHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 8,
      }}
    >
      <TouchableOpacity
        onPress={() => navigateMonth('prev')}
        style={{
          padding: 10,
          borderRadius: CORNERS,
          backgroundColor: mutedColor,
        }}
      >
        <ChevronLeft size={20} color={textColor} />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          marginHorizontal: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => setShowMonthPicker(true)}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderRadius: CORNERS,
            backgroundColor: mutedColor,
          }}
        >
          <Text variant='subtitle' style={{ marginRight: 4 }}>
            {MONTHS[calendarData.month]}
          </Text>
          <ChevronDown size={16} color={textColor} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowYearPicker(true)}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: CORNERS,
            backgroundColor: mutedColor,
          }}
        >
          <Text variant='subtitle' style={{ marginRight: 4 }}>
            {calendarData.year}
          </Text>
          <ChevronDown size={16} color={textColor} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigateMonth('next')}
        style={{
          padding: 10,
          borderRadius: CORNERS,
          backgroundColor: mutedColor,
        }}
      >
        <ChevronRight size={20} color={textColor} />
      </TouchableOpacity>
    </View>
  );

  const renderCalendar = () => (
    <View>
      {renderMonthYearHeader()}
      {/* Day headers */}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 12,
          paddingHorizontal: 4,
        }}
      >
        {DAYS.map((day) => (
          <View
            key={day}
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <Text variant='caption' style={{ fontSize: 12, fontWeight: '600' }}>
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={{ paddingHorizontal: 4 }}>
        {calendarData.weeks.map((week, weekIndex) => (
          <View
            key={weekIndex}
            style={{
              flexDirection: 'row',
              marginBottom: 4,
            }}
          >
            {week.map((day, dayIndex) => {
              const dayDate = day
                ? new Date(calendarData.year, calendarData.month, day)
                : null;

              const isSelected =
                day &&
                value &&
                !isDateRange(value) &&
                value.getDate() === day &&
                value.getMonth() === calendarData.month &&
                value.getFullYear() === calendarData.year;

              const isToday =
                day &&
                new Date().getDate() === day &&
                new Date().getMonth() === calendarData.month &&
                new Date().getFullYear() === calendarData.year;

              const disabled = dayDate ? isDateDisabled(dayDate) : false;

              // Range-specific styling
              const inRange = dayDate ? isDateInRange(dayDate) : false;
              const rangeEndpoints = dayDate
                ? isRangeEndpoint(dayDate)
                : { isStart: false, isEnd: false };

              return (
                <View
                  key={dayIndex}
                  style={[
                    {
                      flex: 1,
                      alignItems: 'center',
                      backgroundColor:
                        mode === 'range' && inRange
                          ? primaryColor
                          : 'transparent',
                      paddingHorizontal: mode === 'range' && inRange ? 0 : 0,
                    },
                    rangeEndpoints.isStart && {
                      borderTopLeftRadius: CORNERS,
                      borderBottomLeftRadius: CORNERS,
                    },
                    rangeEndpoints.isEnd && {
                      borderTopRightRadius: CORNERS,
                      borderBottomRightRadius: CORNERS,
                    },
                  ]}
                >
                  {day ? (
                    <TouchableOpacity
                      onPress={() => !disabled && handleDateSelect(day)}
                      disabled={disabled}
                      style={[
                        {
                          width: 40,
                          height: 40,
                          borderRadius:
                            rangeEndpoints.isStart || rangeEndpoints.isEnd
                              ? 0
                              : CORNERS,
                          backgroundColor:
                            rangeEndpoints.isStart || rangeEndpoints.isEnd
                              ? primaryColor
                              : inRange
                              ? primaryColor
                              : isSelected
                              ? primaryColor
                              : 'transparent',
                          borderWidth:
                            isToday && !isSelected && !inRange ? 1 : 0,
                          borderColor: primaryColor,
                          justifyContent: 'center',
                          alignItems: 'center',
                          opacity: disabled ? 0.3 : 1,
                        },
                        rangeEndpoints.isStart && {
                          borderTopLeftRadius: CORNERS,
                          borderBottomLeftRadius: CORNERS,
                        },
                        rangeEndpoints.isEnd && {
                          borderTopRightRadius: CORNERS,
                          borderBottomRightRadius: CORNERS,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color:
                            rangeEndpoints.isStart || rangeEndpoints.isEnd
                              ? primaryForegroundColor
                              : inRange
                              ? primaryForegroundColor
                              : isSelected
                              ? primaryForegroundColor
                              : disabled
                              ? mutedForegroundColor
                              : textColor,
                          fontWeight:
                            rangeEndpoints.isStart ||
                            rangeEndpoints.isEnd ||
                            isSelected ||
                            isToday
                              ? '600'
                              : '400',
                          fontSize: FONT_SIZE,
                        }}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={{ width: 40, height: 40 }} />
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>

      {/* Range selection info */}
      {mode === 'range' && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 16,
            padding: 20,
            paddingHorizontal: 36,
            backgroundColor: mutedColor,
            borderRadius: BORDER_RADIUS,
          }}
        >
          <Text variant='subtitle' style={{ flex: 1 }}>
            {tempRange.startDate
              ? `${tempRange.startDate.toLocaleDateString()}`
              : 'Start date'}
          </Text>

          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <ArrowRight color={textColor} strokeWidth={3} />
          </View>

          <Text variant='subtitle' style={{ flex: 1, textAlign: 'right' }}>
            {tempRange.endDate
              ? `${tempRange.endDate.toLocaleDateString()}`
              : 'End date'}
          </Text>
        </View>
      )}
    </View>
  );

  const renderTimePicker = () => {
    const selectedHours = currentDate.getHours();
    const selectedMinutes = currentDate.getMinutes();

    const isPM = selectedHours >= 12;

    return (
      <View style={{ height: 300 }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            gap: 16,
          }}
        >
          {/* Hours */}
          <View style={{ flex: 1 }}>
            <Text
              variant='caption'
              style={{ textAlign: 'center', marginBottom: 12 }}
            >
              Hours
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 20,
              }}
            >
              {Array.from({ length: timeFormat === '12' ? 12 : 24 }, (_, i) =>
                timeFormat === '12' ? (i === 0 ? 12 : i) : i
              ).map((hour) => {
                const actualHour =
                  timeFormat === '12'
                    ? hour === 12
                      ? isPM
                        ? 12
                        : 0
                      : isPM
                      ? hour + 12
                      : hour
                    : hour;

                const isSelected = actualHour === selectedHours;

                return (
                  <TouchableOpacity
                    key={hour}
                    onPress={() =>
                      handleTimeChange(actualHour, selectedMinutes)
                    }
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: CORNERS,
                      backgroundColor: isSelected
                        ? primaryColor
                        : 'transparent',
                      marginVertical: 2,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: isSelected ? primaryForegroundColor : textColor,
                        fontWeight: isSelected ? '600' : '400',
                        fontSize: FONT_SIZE,
                      }}
                    >
                      {hour.toString().padStart(2, '0')}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Minutes */}
          <View style={{ flex: 1 }}>
            <Text
              variant='caption'
              style={{ textAlign: 'center', marginBottom: 12 }}
            >
              Minutes
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 20,
              }}
            >
              {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                <TouchableOpacity
                  key={minute}
                  onPress={() => handleTimeChange(selectedHours, minute)}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: CORNERS,
                    backgroundColor:
                      minute === selectedMinutes ? primaryColor : 'transparent',
                    marginVertical: 2,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color:
                        minute === selectedMinutes
                          ? primaryForegroundColor
                          : textColor,
                      fontWeight: minute === selectedMinutes ? '600' : '400',
                      fontSize: FONT_SIZE,
                    }}
                  >
                    {minute.toString().padStart(2, '0')}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* AM/PM picker for 12-hour format */}
          {timeFormat === '12' && (
            <View style={{ flex: 0.5 }}>
              <Text
                variant='caption'
                style={{ textAlign: 'center', marginBottom: 12 }}
              >
                Period
              </Text>
              <View
                style={{
                  paddingVertical: 20,
                  gap: 8,
                }}
              >
                {['AM', 'PM'].map((period) => {
                  const isAM = period === 'AM';
                  const isSelected = isAM ? !isPM : isPM;

                  return (
                    <TouchableOpacity
                      key={period}
                      onPress={() => {
                        const newHours = isAM
                          ? selectedHours >= 12
                            ? selectedHours - 12
                            : selectedHours
                          : selectedHours < 12
                          ? selectedHours + 12
                          : selectedHours;
                        handleTimeChange(newHours, selectedMinutes);
                      }}
                      style={{
                        paddingVertical: 12,
                        paddingHorizontal: 16,
                        borderRadius: CORNERS,
                        backgroundColor: isSelected
                          ? primaryColor
                          : 'transparent',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color: isSelected
                            ? primaryForegroundColor
                            : textColor,
                          fontWeight: isSelected ? '600' : '400',
                          fontSize: FONT_SIZE,
                        }}
                      >
                        {period}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderMonthPicker = () => (
    <View style={{ height: 300 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 20,
        }}
      >
        {MONTHS.map((month, index) => (
          <TouchableOpacity
            key={month}
            onPress={() => handleMonthSelect(index)}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 20,
              borderRadius: CORNERS,
              backgroundColor:
                index === calendarData.month ? primaryColor : 'transparent',
              marginVertical: 2,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color:
                  index === calendarData.month
                    ? primaryForegroundColor
                    : textColor,
                fontWeight: index === calendarData.month ? '600' : '400',
                fontSize: FONT_SIZE,
              }}
            >
              {month}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderYearPicker = () => (
    <View style={{ height: 300 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 20,
        }}
      >
        {YEARS.map((year) => (
          <TouchableOpacity
            key={year}
            onPress={() => handleYearSelect(year)}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 20,
              borderRadius: CORNERS,
              backgroundColor:
                year === calendarData.year ? primaryColor : 'transparent',
              marginVertical: 2,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color:
                  year === calendarData.year
                    ? primaryForegroundColor
                    : textColor,
                fontWeight: year === calendarData.year ? '600' : '400',
                fontSize: FONT_SIZE,
              }}
            >
              {year}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const getBottomSheetContent = () => {
    if (showMonthPicker) return renderMonthPicker();
    if (showYearPicker) return renderYearPicker();

    if (mode === 'datetime') {
      return viewMode === 'date' ? renderCalendar() : renderTimePicker();
    }

    if (mode === 'time') return renderTimePicker();
    return renderCalendar();
  };

  const getBottomSheetTitle = () => {
    if (showMonthPicker) return 'Select Month';
    if (showYearPicker) return 'Select Year';

    if (mode === 'datetime') {
      return viewMode === 'date' ? 'Select Date' : 'Select Time';
    }

    if (mode === 'time') return 'Select Time';

    if (mode === 'range') return 'Select Range';

    return 'Select Date';
  };

  const handleOpenPicker = () => {
    setCurrentDate(new Date());
    setViewMode('date');
    setShowMonthPicker(false);
    setShowYearPicker(false);
    open();
  };

  const triggerStyle: ViewStyle = {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: variant === 'group' ? 0 : 16,
    borderWidth: variant === 'group' ? 0 : 1,
    borderColor: variant === 'outline' ? borderColor : cardColor,
    borderRadius: CORNERS,
    backgroundColor: variant === 'filled' ? cardColor : 'transparent',
    minHeight: variant === 'group' ? 'auto' : HEIGHT,
  };

  return (
    <>
      <TouchableOpacity
        style={[triggerStyle, disabled && { opacity: 0.5 }, style]}
        onPress={handleOpenPicker}
        disabled={disabled}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <View
            style={{
              width: label ? 120 : 'auto',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {mode === 'time' ? (
              <Icon name={Clock} size={20} strokeWidth={1} />
            ) : mode === 'datetime' ? (
              <Icon name={CalendarClock} size={20} strokeWidth={1} />
            ) : mode === 'range' ? (
              <Icon name={CalendarRange} size={20} strokeWidth={1} />
            ) : (
              <Icon name={Calendar} size={20} strokeWidth={1} />
            )}

            {/* Label takes 1/3 of available width when present */}
            {label && (
              <View style={{ flex: 1 }}>
                <Text
                  variant='caption'
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  style={[
                    {
                      color: error ? errorColor : textMutedColor,
                    },
                    labelStyle,
                  ]}
                >
                  {label}
                </Text>
              </View>
            )}
          </View>

          {/* Text takes 2/3 of available width when label is present, or full width when no label */}
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={{
                color: value ? textColor : textMutedColor,
                fontSize: FONT_SIZE,
              }}
            >
              {formatDisplayValue()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <BottomSheet
        isVisible={isVisible}
        onClose={() => {
          close();
          setShowMonthPicker(false);
          setShowYearPicker(false);
        }}
        title={getBottomSheetTitle()}
        snapPoints={[0.7]}
      >
        <View style={{ flex: 1 }}>
          {getBottomSheetContent()}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 20,
              gap: 12,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 8,
              }}
            >
              <Button variant='outline' onPress={resetToToday}>
                Today
              </Button>

              <Button
                variant='outline'
                onPress={() => {
                  close();
                  setShowMonthPicker(false);
                  setShowYearPicker(false);
                  clearSelection();
                }}
              >
                {mode === 'range' ? 'Clear' : 'Cancel'}
              </Button>
            </View>

            {mode === 'datetime' && viewMode === 'date' ? (
              <Button onPress={() => setViewMode('time')} style={{ flex: 1 }}>
                Next
              </Button>
            ) : (
              <Button onPress={handleConfirm} style={{ flex: 1 }}>
                Done
              </Button>
            )}
          </View>
        </View>
      </BottomSheet>
    </>
  );
}
