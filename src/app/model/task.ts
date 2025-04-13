export interface Task {
    title: string;
    description: string;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
}
