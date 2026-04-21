# Consulting Engagement Management - Assessment 

## 1. Project Overview & Assumptions
I built a custom system to manage consulting engagements for Acme Services.
* **Assumptions:** - Every `Engagement__c` record is expected to be linked to an Account and an Opportunity to display financial metrics.
    - Standard Activity configurations are used for tracking engagement history.

## 2. Testing Guide (Items #3–#8)
* **#3 Activities:** Open any Engagement record and check the Activity Timeline to see logged calls, emails, and events.
* **#4 App Builder:** The Engagement record page has been optimized with a Highlights Panel and the custom "Engagement Summary" LWC.
* **#5 List Views:** Use the **"My Open Engagements"** or **"Q Engagements by Account"** list views. The latter includes a Budget donut chart.
* **#6 LWC & Apex:** Use the "Quick Follow-Up Call" button on the Engagement page. It creates a task for tomorrow and refreshes the activity counts.
* **#7 Flow:** Change an Engagement Status to "Completed" to trigger the automated Chatter post.
* **#8 Reporting:** Open the **"Active Engagements by Account"** report to see the summary and bar chart.

## 3. Technical Paths & Metadata Names
* **Apex Class:** `force-app/main/default/classes/EngagementSummaryController.cls`
* **LWC Component:** `force-app/main/default/lwc/engagementSummary`

* **Flow Name:** `Opportunity Stage - Create Engagement Task`
* **Report Name:** Engagement Pipeline
* **List View Names:** "My Open Engagements", "Q Engagements by Account"

## 4. Deliverables (Screenshots)
The following screenshots are included in the `/screenshots` folder:

#### 1. Engagement Record Page + LWC Summary
![Engagement Page](./screenshots/Engagement_Record_LWC.png)

#### 2. Activity Timeline (Calls, Emails, Events)
![Activities](./screenshots/Activity_Loggin.png)

#### 3. Flow Automation (Chatter Post)
![Flow Evidence](./screenshots/Flow_Firing.png)
![Flow Evidence](./screenshots/Flow_Firing2.png)

#### 4. Engagement Pipeline Report
![Report Chart](./screenshots/Report_Chart.png)

#### 5. List View with Donut Chart
![List View](./screenshots/List_View_Chart.png)