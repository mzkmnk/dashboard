import { Component, inject, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SidebarModule } from 'primeng/sidebar';
import { TimelineModule } from 'primeng/timeline';
import { DatePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InternalSignalStore } from '../../../shared/store/internal/internal.signal-store';
import {
  ProjectSignalStoreModel,
  Status,
  statusStyle,
  StatusStyle,
  Task,
} from '../../../shared/interfaces/internal.interface';

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
    ProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly internalSignalStore = inject(InternalSignalStore);

  $sidebar: Signal<string> = this.internalSignalStore.common.clickSidebar;
  $data: Signal<ProjectSignalStoreModel> = this.internalSignalStore.data;
  $isLoading: Signal<boolean> = this.internalSignalStore.common.isLoading;

  /**
   * sidebarで表示させたいtaskとクリックされたかどうかのvisible
   */
  sidebarTask: { task: Task | undefined; visible: boolean } = {
    task: undefined,
    visible: false,
  };

  status: Status[] = Status;

  statusStyle: StatusStyle = statusStyle;

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
