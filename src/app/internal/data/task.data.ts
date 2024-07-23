export interface task {
  title: string;
  description: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  startedAt: string;
  endedAt: string;
}

export type StatusValue = 'progress' | 'hold' | 'complete';

export type Status = `status:${StatusValue}`;

//created by Claude
export const sampleTasks: task[] = [
  {
    title: 'データベース設計の完了',
    description:
      '新しいCRMシステムのデータベーススキーマを設計し、ERダイアグラムを作成する',
    status: 'status:progress',
    createdAt: '2024-07-20T09:00:00Z',
    updatedAt: '2024-07-21T14:30:00Z',
    startedAt: '2024-07-20T10:00:00Z',
    endedAt: '',
  },
  {
    title: 'ユーザー認証システムの実装',
    description: 'OAuth2.0を使用してユーザー認証システムを実装する',
    status: 'status:hold',
    createdAt: '2024-07-19T11:00:00Z',
    updatedAt: '2024-07-22T09:15:00Z',
    startedAt: '2024-07-19T13:00:00Z',
    endedAt: '',
  },
  {
    title: 'フロントエンドのUI/UXデザイン',
    description: 'ダッシュボード画面のワイヤーフレームとモックアップを作成する',
    status: 'status:complete',
    createdAt: '2024-07-18T10:00:00Z',
    updatedAt: '2024-07-20T16:45:00Z',
    startedAt: '2024-07-18T11:00:00Z',
    endedAt: '2024-07-20T16:45:00Z',
  },
  {
    title: 'APIエンドポイントのドキュメント作成',
    description:
      'RESTful APIの全エンドポイントについて、Swagger/OpenAPIを使用してドキュメントを作成する',
    status: 'status:progress',
    createdAt: '2024-07-21T09:30:00Z',
    updatedAt: '2024-07-22T11:20:00Z',
    startedAt: '2024-07-21T10:00:00Z',
    endedAt: '',
  },
  {
    title: 'パフォーマンステストの実行',
    description:
      '新しいマイクロサービスアーキテクチャの負荷テストとストレステストを実行する',
    status: 'status:hold',
    createdAt: '2024-07-17T14:00:00Z',
    updatedAt: '2024-07-19T10:10:00Z',
    startedAt: '',
    endedAt: '',
  },
  {
    title: 'セキュリティ脆弱性スキャン',
    description:
      '本番環境のインフラストラクチャとアプリケーションコードに対してセキュリティスキャンを実行する',
    status: 'status:progress',
    createdAt: '2024-07-22T08:00:00Z',
    updatedAt: '2024-07-22T15:30:00Z',
    startedAt: '2024-07-22T09:00:00Z',
    endedAt: '',
  },
  {
    title: 'コンテナ化とKubernetes設定',
    description:
      'アプリケーションをDockerコンテナ化し、Kubernetes用のマニフェストファイルを作成する',
    status: 'status:complete',
    createdAt: '2024-07-15T11:00:00Z',
    updatedAt: '2024-07-18T17:00:00Z',
    startedAt: '2024-07-15T13:00:00Z',
    endedAt: '2024-07-18T17:00:00Z',
  },
  {
    title: 'CI/CDパイプラインの構築',
    description:
      'GitLab CIを使用して継続的インテグレーションと継続的デプロイメントのパイプラインを構築する',
    status: 'status:progress',
    createdAt: '2024-07-20T10:00:00Z',
    updatedAt: '2024-07-22T14:45:00Z',
    startedAt: '2024-07-20T11:30:00Z',
    endedAt: '',
  },
  {
    title: 'データ移行スクリプトの作成',
    description:
      '旧システムから新システムへのデータ移行用のPythonスクリプトを作成する',
    status: 'status:hold',
    createdAt: '2024-07-19T09:00:00Z',
    updatedAt: '2024-07-21T11:20:00Z',
    startedAt: '2024-07-19T10:00:00Z',
    endedAt: '',
  },
  {
    title: 'ユーザーマニュアルの作成',
    description:
      '新しいCRMシステムの使用方法を説明するユーザーマニュアルを作成する',
    status: 'status:progress',
    createdAt: '2024-07-21T13:00:00Z',
    updatedAt: '2024-07-22T16:30:00Z',
    startedAt: '2024-07-21T14:00:00Z',
    endedAt: '',
  },
];
