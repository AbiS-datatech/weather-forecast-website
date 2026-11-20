# 🌦️ Weather Forecast Website
### Real-Time Weather Monitoring & Five-Day Forecast Application

**Get live weather updates. Explore forecasts. Stay ahead of the weather.**

A modern, responsive web application that provides real-time weather information for cities worldwide using free public APIs. Designed with a clean interface, dynamic day and night themes, and an intuitive user experience across desktop and mobile devices.

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/API-Open--Meteo-4CAF50?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Completed-success?style=flat-square" />
  <img src="https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" />
  <img src="https://img.shields.io/badge/Made%20With-❤️%20in%20India-orange?style=flat-square" />
</p>

**Project:** Weather Forecast Website  
**Organization:** Auspify Technologies  
**Internship:** Web Development Internship  
**Task:** Task 3  
**Developer:** Abi S.

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Project Objectives](#-project-objectives)
- [Core Features](#-core-features)
- [Application Workflow](#-application-workflow)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Live Deployment](#-live-deployment)
- [API Integration](#-api-integration)
- [Installation](#-installation)
- [Development Workflow](#-development-workflow)
- [Future Enhancements](#-future-enhancements)
- [Learning Outcomes](#-learning-outcomes)
- [Internship Details](#-internship-details)
- [Author](#-author)

---

## 📖 About the Project

The Weather Forecast Website is a web-based weather application developed to provide users with real-time weather information and upcoming weather predictions for different cities.

The application integrates the Open-Meteo Geocoding API to identify the geographical coordinates of searched cities and the Open-Meteo Weather API to retrieve current weather conditions and forecast information.

Unlike static weather displays, this application dynamically updates its content based on user searches and provides essential weather information through an interactive and responsive interface.

The project focuses on API integration, asynchronous JavaScript operations, dynamic user interface rendering, responsive web design, and practical error handling.

## 🎯 Project Objectives

- Develop a functional weather application using HTML, CSS, and JavaScript.
- Retrieve real-time weather information through public APIs.
- Enable users to search weather conditions by city name.
- Display current weather details and five-day forecasts.
- Implement dynamic day and night interface themes.
- Create a responsive experience for desktop and mobile users.
- Handle loading states, invalid searches, and API errors effectively.

## ✨ Core Features

### 🌍 City-Based Weather Search
- Search weather information using city names.
- Retrieve geographical coordinates through the Geocoding API.
- Fetch weather information for the selected location.
- Dynamically update weather details based on search results.

### 🌡️ Current Weather Dashboard
- Current temperature display.
- Weather condition and description.
- Feels-like temperature.
- Humidity percentage.
- Wind speed information.

### 📅 Five-Day Weather Forecast
- Display upcoming five-day weather information.
- Present forecast details in an organized layout.
- Retrieve forecast data directly from the Open-Meteo API.

### 🌗 Dynamic Day & Night Themes
- Automatically adapt the interface according to the relevant day or night conditions.
- Provide a visually appropriate weather dashboard.

### ⚡ User Experience & Error Handling
- Loading indicators during API requests.
- Invalid city search handling.
- API error feedback.
- Responsive layouts for different screen sizes.
- Smooth and intuitive interactions.

### 📱 Responsive Interface
- Desktop-friendly dashboard.
- Tablet-compatible layouts.
- Mobile-optimized weather cards and search interface.

## 🔄 Application Workflow

The application follows a simple API-driven workflow.

```text
          ┌──────────────────────┐
          │      User Opens      │
          │     Application     │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │  Enters City Name    │
          │   in Search Field    │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │  Geocoding API Call  │
          │  Open-Meteo API      │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ Retrieve Latitude   │
          │ & Longitude          │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ Weather API Request  │
          │ Using Coordinates   │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ Process JSON Data    │
          │ Using JavaScript     │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ Update Weather       │
          │ Dashboard & Forecast │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ Display Results to   │
          │       User           │
          └──────────────────────┘
```

**Error Flow:** Invalid city names, network failures, and unsuccessful API responses are handled through appropriate error messages.

## 🧰 Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Markup | HTML5 | Application structure |
| Styling | CSS3 | Layout, animations, and responsive design |
| Programming | JavaScript | Application logic and dynamic rendering |
| Weather Service | Open-Meteo Weather API | Current weather and forecast data |
| Location Service | Open-Meteo Geocoding API | City search and geographical coordinates |
| Data Format | JSON | API response processing |
| Deployment | Live Hosting Platform | Public website deployment |
| Version Control | Git & GitHub | Source code management |

## 📁 Project Structure

```text
weather-forecast-website/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── screenshots/
│   ├── desktop.png
│   ├── mobile.png
│   └── error.png
│
└── README.md
```

*Note: Folder and file names above represent the documented project organization. Adjust them if your actual repository uses a different structure.*

## 📸 Screenshots

### 🖥️ Desktop Interface

The main dashboard displaying current weather information and upcoming forecasts.

![Desktop View](screenshots/desktop.png)

### 📱 Mobile Interface

Responsive weather dashboard optimized for smaller screens.

![Mobile View](screenshots/mobile.png)

### ⚠️ Error Handling

User-friendly error feedback for invalid city searches.

![Error Handling](screenshots/error.png)

## 🌐 Live Deployment

**Live Website:** [Weather Forecast Website](https://weather-forecast-website-ebon.vercel.app/)

**Deployment Platform:** Vercel

The application is deployed on Vercel and publicly accessible through the live website.


## 🔗 API Integration

The project uses free public weather services from Open-Meteo.

### 1. Geocoding API

**Purpose:** Converts user