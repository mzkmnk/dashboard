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
