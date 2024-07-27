export interface SidebarDataModel {
  label: string;
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
