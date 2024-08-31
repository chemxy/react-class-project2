export class Task {
    title; //string
    description; //string
    status; //TaskStatus
    dueDate; //2025-05-15
    // tags; // string[]
    priority; //TaskPriority
    createdDate; //2025-05-15
    completionDate; //2025-05-15
}

export class TaskStatus {
    static NEW = 'new';
    static IN_PROGRESS = 'in progress';
    static DONE = 'done';
}

export class TaskPriority {
    static HIGH = 'high';
    static MEDIUM = 'medium';
    static LOW = 'low';
}