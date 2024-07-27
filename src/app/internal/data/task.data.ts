export interface Task {
  title: string;
  description: string;
  status: Status;
  group: Group;
  createdAt: string;
  updatedAt: string;
  startedAt: string;
  endedAt: string;
  grid: GridModel;
}

export interface GridModel {
  cols: number;
  rows: number;
  x: number;
  y: number;
}

export type StatusValue = 'progress' | 'hold' | 'complete';

export type Status = `status:${StatusValue}`;

export type Group = 'TODO' | 'IN PROGRESS' | 'COMPLETED';

//created by Claude
export const sampleTasks: Task[] = [
  {
    title: 'データベース設計の完了',
    description:
      '新しいCRMシステムのデータベーススキーマを設計し、ERダイアグラムを作成する',
    status: 'status:progress',
    group: 'TODO',
    createdAt: '2024-07-20T09:00:00Z',
    updatedAt: '2024-07-21T14:30:00Z',
    startedAt: '2024-07-20T10:00:00Z',
    endedAt: '',
    grid: { cols: 5, rows: 10, y: 0, x: 0 },
  },
];
