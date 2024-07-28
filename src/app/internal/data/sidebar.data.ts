export type SidebarLabelType = 'travelLog' | 'dashboard';

export interface SidebarDataModel {
  label: SidebarLabelType;
  clicked: boolean;
}

export const sidebarData: SidebarDataModel[] = [
  {
    label: 'travelLog',
    clicked: true,
  },
  {
    label: 'dashboard',
    clicked: false,
  },
];
