import { SidebarLabelType } from './sidebar.data';

export type TimelineStatus = 'done' | 'progress';

export interface Timeline {
  status: TimelineStatus;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  title: string;
  description: string;
  status: Status;
  sidebarLabel: SidebarLabelType;
  timeline: Timeline[];
  progress: string;
  createdAt: string;
  updatedAt: string;
  startedAt: string;
  endedAt: string;
}

// todo あとでつかう
// export type StatusValue = 'progress' | 'todo' | 'complete';
// export type Status = `status:${StatusValue}`;

export type Status = 'todo' | 'progress' | 'completed';

export type StatusStyle = {
  [key in Status]: {
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
    status: 'todo',
    sidebarLabel: 'travelLog',
    timeline: [],
    progress: '0',
    createdAt: '2024-07-20T09:00:00Z',
    updatedAt: '2024-07-21T14:30:00Z',
    startedAt: '2024-07-20T10:00:00Z',
    endedAt: '',
  },

  {
    title: 'ログイン画面の作成',
    description: 'ログイン画面(UI)を作成する。',
    status: 'todo',
    sidebarLabel: 'travelLog',
    progress: '0',
    timeline: [],
    createdAt: '2024-07-20T09:00:00Z',
    updatedAt: '2024-07-21T14:30:00Z',
    startedAt: '2024-07-20T10:00:00Z',
    endedAt: '',
  },

  {
    title: '予定詳細確認画面の作成',
    description: '予定詳細を確認できる画面(UI)を作成する',
    status: 'progress',
    sidebarLabel: 'travelLog',
    progress: '60',
    timeline: [
      {
        status: 'done',
        comment: 'UIの最終確認',
        createdAt: '2024-07-20T09:00:00Z',
        updatedAt: '2024-07-20T09:00:00Z',
      },
      {
        status: 'progress',
        comment: 'UI作成中',
        createdAt: '2024-07-20T10:00:00Z',
        updatedAt: '2024-07-20T10:00:00Z',
      },
    ],
    createdAt: '2024-07-19T09:00:00Z',
    updatedAt: '2024-07-30T14:30:00Z',
    startedAt: '2024-07-20T10:00:00Z',
    endedAt: '',
  },
  {
    title: '時すでに終わった予定',
    description: 'コンプリート！',
    status: 'completed',
    sidebarLabel: 'dashboard',
    progress: '100',
    timeline: [],
    createdAt: '2024-07-19T09:00:00Z',
    updatedAt: '2024-07-30T14:30:00Z',
    startedAt: '2024-07-20T10:00:00Z',
    endedAt: '2024-07-27T05:00:00Z',
  },
];
