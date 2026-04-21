public with sharing class EngagementSummaryController {

    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getEngagementData(Id engagementId) {
        Map<String, Object> result = new Map<String, Object>();

        // Traer el Engagement con su Opportunity relacionada
        Engagement__c eng = [
            SELECT Id, Name, Related_Opportunity__c,
                   Related_Opportunity__r.Amount
            FROM Engagement__c
            WHERE Id = :engagementId
            LIMIT 1
        ];

        result.put('opportunityAmount', eng.Related_Opportunity__r != null
            ? eng.Related_Opportunity__r.Amount
            : null);
        result.put('engagementName', eng.Name);

        // Count de Tasks completadas
        Integer completedTasks = [
            SELECT COUNT()
            FROM Task
            WHERE WhatId = :engagementId
            AND Status = 'Completed'
        ];
        result.put('completedTasks', completedTasks);

        // Count de Events futuros
        Integer upcomingEvents = [
            SELECT COUNT()
            FROM Event
            WHERE WhatId = :engagementId
            AND StartDateTime >= :System.now()
        ];
        result.put('upcomingEvents', upcomingEvents);

        return result;
    }

    @AuraEnabled
    public static void createFollowUpTask(Id engagementId, String engagementName) {
        Task t = new Task();
        t.Subject    = 'Follow-up on ' + engagementName;
        t.Type       = 'Call';
        t.Status     = 'Not Started';
        t.Priority   = 'Normal';
        t.WhatId     = engagementId;
        t.ActivityDate = Date.today().addDays(1); // mañana
        insert t;
    }
}