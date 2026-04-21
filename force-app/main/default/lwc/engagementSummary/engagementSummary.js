import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import getEngagementData from '@salesforce/apex/EngagementSummaryController.getEngagementData';
import createFollowUpTask from '@salesforce/apex/EngagementSummaryController.createFollowUpTask';

export default class EngagementSummary extends LightningElement {
    @api recordId;

    @track isLoading = false;
    @track message = '';
    @track messageStyle = '';

    // Guardamos la respuesta del wire para poder hacer refresh
    wiredResult;
    opportunityAmount;
    completedTasks = 0;
    upcomingEvents = 0;
    engagementName = '';

    @wire(getEngagementData, { engagementId: '$recordId' })
    wiredData(result) {
        this.wiredResult = result;
        if (result.data) {
            this.opportunityAmount = result.data.opportunityAmount;
            this.completedTasks   = result.data.completedTasks;
            this.upcomingEvents   = result.data.upcomingEvents;
            this.engagementName   = result.data.engagementName;
        }
    }

    get formattedAmount() {
        if (!this.opportunityAmount) return '';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(this.opportunityAmount);
    }

    async handleFollowUp() {
        this.isLoading = true;
        this.message = '';
        try {
            await createFollowUpTask({
                engagementId: this.recordId,
                engagementName: this.engagementName
            });
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: 'Follow-up call task created!',
                variant: 'success'
            }));
            // Refrescar los datos del wire
            await refreshApex(this.wiredResult);
        } catch (error) {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: error.body?.message || 'An error occurred',
                variant: 'error'
            }));
        } finally {
            this.isLoading = false;
        }
    }
}