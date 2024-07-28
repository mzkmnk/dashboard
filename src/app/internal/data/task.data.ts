import { SidebarLabelType } from './sidebar.data';

export interface Task {
  title: string;
  description: string;
  status: Status;
  group: Group;
  sidebarLabel: SidebarLabelType;
  progress: string;
  createdAt: string;
  updatedAt: string;
  startedAt: string;
  endedAt: string;
}

export type StatusValue = 'progress' | 'todo' | 'complete';

export type Status = `status:${StatusValue}`;

export type Group = 'TODO' | 'PROGRESS' | 'COMPLETED';

export type StatusStyle = {
  [key in Group]: {
    mainColor: string;
    rightColor: string;
    leftColor: string;
  };
};

//created by Claude
export const sampleTasks: Task[] = [
  {
    title: 'カレンダーの作成',
    description: 'カレンダーを作成する',
    status: 'status:todo',
    group: 'TODO',
    sidebarLabel: 'travelLog',
    progress: '0',
    createdAt: '2024-07-20T09:00:00Z',
    updatedAt: '2024-07-21T14:30:00Z',
    startedAt: '2024-07-20T10:00:00Z',
    endedAt: '',
  },
  {
    title: 'ログイン画面の作成',
    description: 'ログイン画面(UI)を作成する。',
    status: 'status:todo',
    group: 'TODO',
    sidebarLabel: 'travelLog',
    progress: '0',
    createdAt: '2024-07-20T09:00:00Z',
    updatedAt: '2024-07-21T14:30:00Z',
    startedAt: '2024-07-20T10:00:00Z',
    endedAt: '',
  },
  {
    title: '予定詳細確認画面の作成',
    description: '予定詳細を確認できる画面(UI)を作成する',
    status: 'status:progress',
    group: 'PROGRESS',
    sidebarLabel: 'travelLog',
    progress: '60',
    createdAt: '2024-07-19T09:00:00Z',
    updatedAt: '2024-07-30T14:30:00Z',
    startedAt: '2024-07-20T10:00:00Z',
    endedAt: '',
  },
  {
    title: '時すでに終わった予定',
    description: 'コンプリート！',
    status: 'status:complete',
    group: 'COMPLETED',
    sidebarLabel: 'dashboard',
    progress: '100',
    createdAt: '2024-07-19T09:00:00Z',
    updatedAt: '2024-07-30T14:30:00Z',
    startedAt: '2024-07-20T10:00:00Z',
    endedAt: '2024-07-27T05:00:00Z',
  },
];
