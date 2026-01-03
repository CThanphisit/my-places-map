import { Place } from "../types/place";

export const mockPlaces: Place[] = [
  {
    id: "1",
    title: "ร้านกาแฟมุมตึก",
    description: "ร้านกาแฟเล็ก ๆ บรรยากาศเงียบ",
    category: "food",
    latitude: 14.98612,
    longitude: 102.10495,
    createdAt: Date.now(),
  },
  {
    id: "2",
    title: "สวนสาธารณะชุมชน",
    description: "เหมาะสำหรับเดินเล่นตอนเย็น",
    category: "travel",
    latitude: 14.9849,
    longitude: 102.1061,
    createdAt: Date.now(),
  },
  {
    id: "3",
    title: "ออฟฟิศลูกค้า",
    description: "มาประชุมทุกเดือน",
    category: "work",
    latitude: 14.9852,
    longitude: 102.105,
    createdAt: Date.now(),
  },
  {
    id: "4",
    title: "ร้านอาหารตามสั่ง",
    description: "ข้าวกะเพราเด็ดมาก",
    category: "food",
    latitude: 14.98595,
    longitude: 102.1063,
    createdAt: Date.now(),
  },
];
