export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  CreateEntry: undefined;
  ViewLogs: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type LogEntry = {
  ketones: string;
  glucose: string;
  weight: string;
  systolic: string;
  diastolic: string;
  bpm: string;
  note: string;
  datetime: string;
}
