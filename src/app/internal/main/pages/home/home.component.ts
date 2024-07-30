import { Component, inject, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { sidebarSignalStore } from '../../../shared/store/sidebar/sidebar.signal-store';
import { Group, StatusStyle, Task } from '../../../data/task.data';
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
import { SidebarModule } from 'primeng/sidebar';
import { TimelineModule } from 'primeng/timeline';
import { DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';

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
    SidebarModule,
    TimelineModule,
    DatePipe,
    CardModule,
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

  sidebarTask: { task: Task | undefined; visible: boolean } = {
    task: undefined,
    visible: false,
  };

  groups: Group[] = ['TODO', 'PROGRESS', 'COMPLETED'];

  pItems: MenuItem[] = [];

  statusStyle: StatusStyle;

  constructor() {
    this.mainSignalStore.taskDataLoad();
    this.statusStyle = {
      TODO: {
        mainColor: 'var(--indigo-400)',
        rightColor: 'var(--indigo-100)',
        leftColor: 'var(--indigo-500)',
      },
      PROGRESS: {
        mainColor: 'var(--teal-400)',
        rightColor: 'var(--teal-100)',
        leftColor: 'var(--teal-500)',
      },
      COMPLETED: {
        mainColor: 'var(--green-400)',
        rightColor: 'var(--green-100)',
        leftColor: 'var(--green-500)',
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

  onClickAddTask = (group: Group): void => {
    this.mainSignalStore.taskAdd({ sidebarLabel: this.$sidebarItem(), group });
  };

  onClickTask = (task: Task): void => {
    this.sidebarTask.visible = !this.sidebarTask.visible;
    this.sidebarTask.task = task;
  };

  onClickUpdateProgressBar = (
    event: any,
    group: Group,
    index: number,
  ): void => {
    event.stopPropagation();
    const htmlProgressBar = event.currentTarget;
    const rect = htmlProgressBar.getBoundingClientRect();
    const clickX: number = event.clientX - rect.left;
    const width = rect.width;
    const newProgress: number = Math.round((clickX / width) * 100);
    this.mainSignalStore.taskDataUpdate({
      sidebarLabel: this.$sidebarItem(),
      group: group,
      idx: index,
      progress: newProgress.toString(),
    });
  };
}
