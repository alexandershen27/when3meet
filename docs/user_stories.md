# User stories & Acceptance criteria

Informal descriptions of application features, written to follow INVEST principles (Independent, Negotiable, Valuable, Estimable, Small, Testable).

## Template

**Title** (author: @joebruin)

As a [user role], I want [to perform an action] so that [I can achieve a goal]. Given [pre-condition], when [action], then [expected outcome].

## User stories

**Close submissions** (author: @alex)

As an event creator, I want to close submissions so that I can finalize a time for the meeting. Given I am logged in as the event creator, when I click "close poll", then attendees will no longer be able to modify their available times.

**Add event to calendar** (author: @alex)

As an event attendee, I want to download the event calendar so that I can add it to my personal calendar. Given I am on an event page after a time has been chosen, when I click the download event button, then a calendar event file will be downloaded with the finalized time.

**Anonymous participation** (author: @eduardo)

As an event attendee, I want to submit my availability without creating an account so that I can participate quickly. Given I am visiting a shared event link, when I enter my name and mark available times, then my availability is saved without requiring a signup.

**Time zone awareness** (author: @eduardo)

As an event creator, I want participants to see times in their local time zone so that they can respond accurately. Given the event has a set time zone, when an attendee opens the event page, then all times are displayed in their local time with a clear time zone label.

**Visual availability feedback** (author: @santiago)

As an event attendee, I want to clearly see which times work best for the group so that I can quickly understand the most popular options.
Given multiple participants have submitted availability, when I view the availability grid, then times with higher availability are visually emphasized compared to less popular times.

**Availability submission confirmation** (author: @santiago)

As an event attendee, I want to receive clear confirmation that my availability was saved so that I know my response was successfully submitted.
Given I have marked my available times, when I submit or update my availability, then a clear visual confirmation is displayed indicating my changes were saved.

**Account creation** (author: @stanleywei)
As a when3meet user, I want to be able to create a persistent account so that I can easily view events I have created or submitted availability for. Given that I previously entered valid credentials on the sign-up page, when I provide these credentials to the login page, when3meet will recognize me as logged-in and let me view a list of events I have created.

**Google Calendar integration** (author: @stanleywei)

As an event attendee, I want to be able to view my Google Calendar events in the when3meet page so that I can state my availability accordingly. Given I am logged into an account and have connected to Google Calendar, when I open an availability page as an attendee, relevant events in my Google Calendar should be displayed on the when3meet page.

**Top meeting time suggestions** (author: @jennifer)

As an event creator, I want to see the top 3 best meeting times so that I can quickly finalize the event time.
Given multiple participants have submitted their availability, when I view the event summary page, then the system displays the top 3 time slots with the highest participant availability, clearly ranked.

**Event reminder notification** (author: @jennifer)

As an event attendee, I want to receive a reminder before the scheduled event so that I don’t forget to attend.
Given an event has a finalized time and I have submitted availability, when the event is within 24 hours of starting, then I receive a reminder notification via email.

**Edit availability after submission** (author: @keelan)

As an event attendee, I want to modify my submitted availability so that I can update my schedule if my plans change. Given I have previously submitted my availability for an event, when I return to the event page and update my available times, then my new availability replaces the old submission with a timestamp showing when it was last updated, and other participants see the most current version of my availability.

**Recurring event scheduling** (author: @keelan)

As an event creator, I want to create recurring availability polls so that I can schedule regular meetings without creating a new poll each time. Given I am creating a new event, when I select "recurring event" and specify the frequency (weekly, biweekly, monthly), then the system generates availability grids for the next specified number of occurrences, allowing participants to submit availability for multiple instances at once.
