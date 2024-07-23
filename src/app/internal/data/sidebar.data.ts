export interface SidebarDataModel {
  label: string;
  clicked: boolean;
}

export const sidebarData: SidebarDataModel[] = [
  {
    label: 'travel log',
    clicked: true,
  },
  {
    label: 'dashboard',
    clicked: false,
  },
];
