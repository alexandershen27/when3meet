# When3Meet — Design Document

## Overview

When3Meet is a web-based scheduling tool that helps groups find and finalize meeting times by collecting participant availability on a shared time grid.

It is inspired by When2Meet but improves the experience with:

* Mobile-first design
* Clearer availability visualization
* Time-zone-aware scheduling
* Google Calendar integration
* Ranked meeting-time suggestions

The system supports:

* Anonymous participation
* Optional user accounts
* Organizer controls for finalizing events

---

## Context & Scope

### Problem with When2Meet

When2Meet:

* Is desktop-focused
* Has poor mobile usability
* Lacks calendar integration
* Provides minimal help finalizing meetings
* Has limited time-zone support

### Motivation

When3Meet preserves simplicity while improving:

* Usability
* Visualization clarity
* Calendar integration
* Scheduling accuracy

### Target Users

Small–medium groups:

* Students
* Clubs
* Teams
* Project groups

Roles:

* Organizer
* Participant
* Optional authenticated user

---

## In-Scope Features

* Availability polling
* Mobile-responsive UI
* Time-zone awareness
* Ranked meeting suggestions
* Calendar export
* Google Calendar integration
* Organizer controls

## Out-of-Scope (MVP)

* Real-time chat
* AI scheduling
* Weighted preferences
* Calendar providers beyond Google
* Native mobile app

---

## Goals

* Collect participant availability efficiently
* Visualize overlap clearly
* Identify best meeting times
* Handle time zones correctly
* Reduce scheduling friction
* Provide a mobile-first UI

---

## Non-Goals

* Messaging between participants
* Automatic meeting-time selection
* Advanced scheduling algorithms
* Multi-calendar provider support
* Native mobile application

---

## User Stories

### Organizer Features

**Recurring Events**

* Create recurring availability polls
* Generate grids for multiple occurrences

**Close Submissions**

* Organizer can lock poll
* Participants cannot modify availability

**Top Meeting Suggestions**

* Display top 3 ranked time slots

---

### Participant Features

**Anonymous Participation**

* Submit availability without account

**Edit Availability**

* Replace previous submission
* Store timestamp

**Submission Confirmation**

* Visual confirmation after saving

---

### Availability Visualization

**Heat-Map Visualization**

* Higher overlap visually emphasized

**Time-Zone Awareness**

* Display times in participant’s local time
* Show time-zone label

---

### Accounts & Persistence

**Account Creation**

* Login
* View created events
* Persistent access

---

### Calendar Integration

**Google Calendar Integration**

* Display user calendar events

**Calendar Export**

* Download finalized event

**Event Reminder**

* Email reminder within 24 hours

---

## UI & User Flow

The interface follows a **mobile-first design** created in Figma using iPhone-sized layouts.

Main screens:

1. Event creation
2. Event confirmation
3. Participant availability grid
4. My events dashboard

---

### Event Creation

Users:

* Enter event name
* Select date range
* Choose time windows
* View time-zone indicator

---

### Event Confirmation

Displays:

* Event summary
* Shareable link
* Confirmation feedback

---

### Participant Event Page

Features:

* Availability grid (15-minute intervals)
* Click-and-drag selection
* Heat-map overlap visualization
* Optional Google sign-in

---

### My Events Dashboard

Authenticated users can:

* View created events
* See participant counts
* Access event status
* Manage events

---

## System Design

### Core Entities

From the UML class diagram:

* Event
* User
* Participant
* Availability

Relationships:

* Event contains Participants
* Participant has Availability
* User can create Events
* Availability linked to Event + Participant


## Technology Choices

### Frontend Framework

**Remix (Selected)**
Pros:

* Built-in SSR eliminates need for separate backend
* Nested routing matches event/participant structure
* Form handling and data loading built-in
* Fast development
* Simple setup

Cons:

* No SSR out of the box in many alternative frameworks
* Would otherwise require a separate backend

---

### Database

**MongoDB (Selected)**
Pros:

* Flexible schema fits Event/Availability structure
* Easy setup with MongoDB Atlas
* Good for document-based data

Cons:

* Less suited for complex relational queries
* No native joins

---

### Styling

**Tailwind CSS (Selected)**
Pros:

* Utility-first approach speeds up development
* Mobile-first by default
* Works well with Remix

Cons:

* Learning curve for utility classes

---

### Authentication

**Remix `createCookieSessionStorage` (Selected)**
Pros:

* Built-in (no extra dependencies)
* Session data encrypted and server-side
* No client exposure
* Seamless integration with loaders/actions

Cons:

* Cookie size limit (~4KB)