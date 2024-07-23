export interface SidebarSignalStoreModel {
  common: {
    isLoading: boolean;
  };
  project: {
    label: string;
  };
}

export const initialState: SidebarSignalStoreModel = {
  common: {
    isLoading: false,
  },
  project: {
    label: '',
  },
};
