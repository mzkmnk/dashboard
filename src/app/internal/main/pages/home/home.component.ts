import { Component, inject, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { sidebarSignalStore } from '../../../shared/store/sidebar/sidebar.signal-store';
import { Group, StatusStyle } from '../../../data/task.data';
import {
  MainSignalStore,
  ProjectSignalStoreModel,
} from '../../store/main.signal-store';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { SidebarLabelType } from '../../../data/sidebar.data';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    BadgeModule,
    DividerModule,
    MenubarModule,
    TieredMenuModule,
    TagModule,
    ProgressBarModule,
    AvatarModule,
    AvatarGroupModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [MainSignalStore],
})
export class HomeComponent {
  private readonly sidebarSignalStore = inject(sidebarSignalStore);
  private readonly mainSignalStore = inject(MainSignalStore);

  $sidebarItem: Signal<SidebarLabelType> =
    this.sidebarSignalStore.project.label;
  $tasks: Signal<ProjectSignalStoreModel> = this.mainSignalStore.data;

  groups: Group[] = ['TODO', 'PROGRESS', 'COMPLETED'];

  pItems: MenuItem[] = [];

  statusStyle: StatusStyle;

  constructor() {
    this.mainSignalStore.taskDataLoad();
    this.statusStyle = {
      TODO: {
        mainColor: 'var(--indigo-200)',
        rightColor: 'var(--indigo-100)',
        leftColor: 'var(--indigo-300)',
      },
      PROGRESS: {
        mainColor: 'var(--teal-200)',
        rightColor: 'var(--teal-100)',
        leftColor: 'var(--teal-300)',
      },
      COMPLETED: {
        mainColor: 'var(--green-200)',
        rightColor: 'var(--green-100)',
        leftColor: 'var(--green-300)',
      },
    };
    this.pItems = [
      {
        icon: 'pi pi-bars',
        items: [
          {
            label: 'add Item',
            icon: 'pi pi-add',
          },
        ],
      },
    ];
  }
}
