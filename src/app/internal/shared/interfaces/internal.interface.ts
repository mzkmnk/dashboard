/**
 * @description
 * DBにRequestとして送る時につかうモデル。
 */
export interface Sidebar {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @description
 * Taskのモデル
 */
export interface Task {
  id: number;
  title: string;
  description: string | null;
  progress: string;
  createdAt: Date;
  updatedAt: Date;
  startedAt: Date;
  endedAt: Date;
  sidebar: string;
  status: Status;
}

/**
 * @description
 * key: Status<br>
 * value: Task[]
 */
type ProjectSignal = {
  tasks: {
    [key in Status]: Task[];
  };
};

/**
 * @description
 * key:サイドバーの文字列<br>
 * value:ProjectSignal
 */
export type ProjectSignalStoreModel = {
  [key in string]: ProjectSignal;
};

/**
 * @description
 * common:全体で使う状態<br>
 * data:ProjectSignalStoreModel
 */
export interface InternalSignalStoreModel {
  common: {
    isLoading: boolean;
    clickSidebar: string;
  };
  data: ProjectSignalStoreModel;
}

/**
 * @description
 * name:サイドバーの名前<br>
 * cnt:各Statusの配列の総数<br>
 * 基本的に表示する時に使うモデル
 */
export interface SidebarModel {
  name: string;
  cnt: number;
}

/**
 * 現状DBに保存してあるtaskStatus
 */
export type Status = 'todo' | 'progress' | 'completed';

/**
 * Statusの定数
 */
export const Status: Status[] = ['todo', 'progress', 'completed'];

/**
 * Statusのカラーコード
 */
export type StatusStyle = {
  [key in Status]: {
    mainColor: string;
    rightColor: string;
    leftColor: string;
  };
};

/**
 * home画面で使われるStatusのカラーコードの定数
 */
export const statusStyle: StatusStyle = {
  todo: {
    mainColor: 'var(--indigo-400)',
    rightColor: 'var(--indigo-100)',
    leftColor: 'var(--indigo-500)',
  },
  progress: {
    mainColor: 'var(--teal-400)',
    rightColor: 'var(--teal-100)',
    leftColor: 'var(--teal-500)',
  },
  completed: {
    mainColor: 'var(--green-400)',
    rightColor: 'var(--green-100)',
    leftColor: 'var(--green-500)',
  },
};
