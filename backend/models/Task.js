export class Task {
    title; //string
    description; //string
    status; //TaskStatus
    dueDate; //2025-05-15
    tags; // string[]
    priority; //TaskPriority
    createdDate; //2025-05-15
    completionDate; //2025-05-15
}

export class TaskStatus {
    static NEW = 'NEW';
    static IN_PROGRESS = 'IN PROGRESS';
    static DONE = 'DONE';
}

export class TaskPriority {
    static HIGH = 'HIGH';
    static MEDIUM = 'MEDIUM';
    static LOW = 'LOW';
}