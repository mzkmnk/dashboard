import { Component, inject, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Status, StatusStyle, Task } from '../../../data/task.data';
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
import {
  InternalSignalStore,
  ProjectSignalStoreModel,
} from '../../../../shared/store/internal.signal-store';

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
})
export class HomeComponent {
  private readonly internalSignalStore = inject(InternalSignalStore);

  $sidebar = this.internalSignalStore.common.clickSidebar;
  $data: Signal<ProjectSignalStoreModel> = this.internalSignalStore.data;

  sidebarTask: { task: Task | undefined; visible: boolean } = {
    task: undefined,
    visible: false,
  };

  groups: Status[] = ['todo', 'progress', 'completed'];

  pItems: MenuItem[] = [];

  statusStyle: StatusStyle;

  constructor() {
    this.statusStyle = {
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

  onClickAddTask = (status: Status): void => {
    // this.internalSignalStore.taskAdd({
    //   sidebarLabel: this.$sidebarItem(),
    //   status,
    // });
  };

  onClickTask = (task: Task): void => {
    this.sidebarTask.visible = !this.sidebarTask.visible;
    this.sidebarTask.task = task;
  };

  onClickUpdateProgressBar = (
    event: any,
    status: Status,
    index: number,
  ): void => {
    event.stopPropagation();
    const htmlProgressBar = event.currentTarget;
    const rect = htmlProgressBar.getBoundingClientRect();
    const clickX: number = event.clientX - rect.left;
    const width = rect.width;
    const newProgress: number = Math.round((clickX / width) * 100);
    // this.internalSignalStore.taskDataUpdate({
    //   sidebarLabel: this.$sidebarItem(),
    //   status,
    //   idx: index,
    //   progress: newProgress.toString(),
    // });
  };
}
