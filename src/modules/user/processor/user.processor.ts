import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { BullQueueName, BullWorkerName } from 'src/common/bull/bull.enum';


@Processor(BullQueueName.BULL_QUEUE)
export class UserProcessor {

    constructor() {}

    @Process(BullWorkerName.BULL_QUEUE)
    async demoFunction(job: Job) {
        console.log('Bull WORKED IS WORKING');
    }

}