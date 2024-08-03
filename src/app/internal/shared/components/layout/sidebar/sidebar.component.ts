import { Component, effect, inject } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Ripple } from 'primeng/ripple';
import { Button } from 'primeng/button';
import { InternalSignalStore } from '../../../../../shared/store/internal.signal-store';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule, Ripple, Button],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private readonly internalSignalStore = inject(InternalSignalStore);

  $sidebars = this.internalSignalStore.selectSidebars;
  $clickSidebar = this.internalSignalStore.common.clickSidebar;

  constructor() {
    this.internalSignalStore.sidebarDataLoad({});
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
