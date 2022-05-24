import dayjs from "dayjs";
import { action, makeObservable, observable, runInAction } from "mobx";

export interface IScheduleData {
  key: number;
  date: string;
  locationID: number;
  place: string;
  duration: number;
  amount: number;
  teacher: string;
  lessonTypesIDs: number[];
  freePlaces: number;
}

export interface ILocation {
  id: number;
  name: string;
  address: string;
  coords: number[];
}

export interface ILessonType {
  _id: number;
  name: string;
}

export const lessonsTypes = [
  {
    _id: 1,
    name: "Contemporary dance",
  },
  {
    _id: 2,
    name: "Breakdance",
  },
  {
    _id: 3,
    name: "Hip-Hop",
  },
  {
    _id: 4,
    name: "Stretching",
  },
  {
    _id: 5,
    name: "Yoga",
  },
];

export const locations = [
  {
    id: 1,
    name: "БЦ Онегин",
    address: "ул. Розы Люксембург, 49",
    coords: [56.829217341536626, 60.614661938580696],
  },
  {
    id: 2,
    name: "БЦ Summit",
    address: "ул. 8 марта, 51",
    coords: [56.823433219881814, 60.60532861497801],
  },
  {
    id: 3,
    name: "БЦ Высоцкий",
    address: "ул. Малышева, 51",
    coords: [56.83604474279329, 60.614316770154794],
  },
];

export const abonementsTypes = [
  {
    type: 1,
    workoutCount: 1,
    amount: 500,
    period: 1,
  },
  {
    type: 1,
    workoutCount: 4,
    amount: 1790,
    period: 1,
  },
  {
    type: 1,
    workoutCount: 8,
    amount: 3490,
    period: 2,
  },
  {
    type: 1,
    workoutCount: 12,
    amount: 4600,
    period: 2,
  },
  {
    type: 1,
    workoutCount: 16,
    amount: 5500,
    period: 4,
  },
  {
    type: 1,
    workoutCount: 24,
    amount: 6999,
    period: 6,
  },
  {
    type: 2,
    workoutCount: 8,
    amount: 6000,
    period: 2,
  },
  {
    type: 2,
    workoutCount: 16,
    amount: 10000,
    period: 4,
  },
];

export const scheduleData: IScheduleData[] = [
  {
    key: 1,
    date: dayjs().format("DD-MM-YY HH:mm"),
    locationID: 1,
    place: "г. Екатеринбург, ул. Счастливая, 8.",
    duration: 1,
    amount: 2000,
    teacher: "TestTeacher",
    lessonTypesIDs: [1, 2],
    freePlaces: 2,
  },
  {
    key: 2,
    date: dayjs().format("DD-MM-YY HH:mm"),
    locationID: 1,
    place: "г. Екатеринбург, ул. Счастливая, 8.",
    duration: 1,
    amount: 2000,
    teacher: "TestTeacher",
    lessonTypesIDs: [3, 2],
    freePlaces: 2,
  },
  {
    key: 3,
    date: dayjs().format("DD-MM-YY HH:mm"),
    locationID: 1,
    place: "г. Екатеринбург, ул. Счастливая, 8.",
    duration: 1,
    amount: 2000,
    teacher: "TestTeacher",
    lessonTypesIDs: [4],
    freePlaces: 2,
  },
  {
    key: 4,
    date: dayjs().format("DD-MM-YY HH:mm"),
    locationID: 1,
    place: "г. Екатеринбург, ул. Счастливая, 8.",
    duration: 1,
    amount: 2000,
    teacher: "TestTeacher",
    lessonTypesIDs: [5],
    freePlaces: 2,
  },
  {
    key: 5,
    date: dayjs().format("DD-MM-YY HH:mm"),
    locationID: 1,
    place: "г. Екатеринбург, ул. Счастливая, 8.",
    duration: 2,
    amount: 2000,
    teacher: "TestTeacher",
    lessonTypesIDs: [4, 5],
    freePlaces: 2,
  },
  {
    key: 6,
    date: dayjs().format("DD-MM-YY HH:mm"),
    locationID: 2,
    place: "г. Екатеринбург, ул. Счастливая, 8.",
    duration: 1,
    amount: 2000,
    teacher: "TestTeacher",
    lessonTypesIDs: [4, 5],
    freePlaces: 2,
  },
  {
    key: 7,
    date: dayjs().format("DD-MM-YY HH:mm"),
    locationID: 2,
    place: "г. Екатеринбург, ул. Счастливая, 8.",
    duration: 2,
    amount: 2000,
    teacher: "TestTeacher",
    lessonTypesIDs: [4, 5],
    freePlaces: 2,
  },
];

export const abonements = [
  {
    _id: "626aae082b7302e0eec8e979",
    userID: "6249b027eea97c5e5d7a0b43",
    purchaseDate: "2022-05-28T20:08:56+05:00",
    expirationDate: "2022-08-28T20:08:56+05:00",
    workoutCount: 3,
    amount: 2390,
  },
  {
    _id: "626aaeb9cce6ff5e0442fd71",
    userID: "6249b027eea97c5e5d7a0b43",
    purchaseDate: "2022-05-13T20:11:53+05:00",
    expirationDate: "2022-06-11T20:11:53+05:00",
    workoutCount: 3,
    amount: 1490,
  },
];

export class OfflineStore {
  abonements: any[] = abonements;
  scheduleData: IScheduleData[] = scheduleData;

  constructor() {
    makeObservable(this, {
      abonements: observable,
      scheduleData: observable,
      setOfflineAbonements: action,
      setOfflineScheduleData: action,
    });
  }

  setOfflineAbonements = (newAbonements: any[]) => {
    runInAction(() => {
      this.abonements = newAbonements;
    });
  };

  setOfflineScheduleData = (newScheduleData: any[]) => {
    runInAction(() => {
      this.scheduleData = newScheduleData;
    });
  };
}
