import { Component, inject, Signal } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Ripple } from 'primeng/ripple';
import { Button } from 'primeng/button';
import { InternalSignalStore } from '../../../store/internal/internal.signal-store';
import { SidebarModel } from '../../../interfaces/internal.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule, Ripple, Button],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private readonly internalSignalStore = inject(InternalSignalStore);

  $sidebars: Signal<SidebarModel[]> = this.internalSignalStore.selectSidebars;
  $clickSidebar: Signal<string> = this.internalSignalStore.common.clickSidebar;

  constructor() {
    this.internalSignalStore.dataLoad({});
  }

  /**
   * @param {number} idx - クリックされたサイドバーのアイテム
   * @returns {void}
   *
   * @description
   * サイドバーがクリックされた時の処理を行う関数
   */
  onClickSidebarItem = (idx: number): void => {
    this.internalSignalStore.clickSidebar({
      sidebar: this.$sidebars()[idx].name,
    });
  };
}
