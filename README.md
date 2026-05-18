# My Places Map

แอปบันทึกสถานที่โปรดบนแผนที่ สร้างด้วย React Native + Expo

## Features

- ดูสถานที่ที่บันทึกไว้บนแผนที่ Google Maps
- เพิ่มสถานที่ใหม่พร้อมชื่อ, คำอธิบาย และหมวดหมู่ (อาหาร, ท่องเที่ยว, ทำงาน, อื่นๆ)
- แตะ marker เพื่อดูรายละเอียดสถานที่
- บันทึกข้อมูลไว้ในเครื่อง (AsyncStorage)

## Getting Started

```bash
npm install
npm start
```

จากนั้นเปิดแอปด้วย Expo Go หรือรันบน emulator:

```bash
npm run android
npm run ios
```

## Requirements

- Node.js
- Expo CLI
- Google Maps API Key — ใส่ใน `app.json` ที่ `android.config.googleMaps.apiKey`

## Tech Stack

- React Native + Expo
- TypeScript
- React Navigation
- React Native Maps (Google Maps)
- React Native Paper
- AsyncStorage
