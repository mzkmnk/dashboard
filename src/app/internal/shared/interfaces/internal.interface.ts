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
  status: string;
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
 * Statusのカラーコード
 */
export type StatusStyle = {
  [key in Status]: {
    mainColor: string;
    rightColor: string;
    leftColor: string;
  };
};
