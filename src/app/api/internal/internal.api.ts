import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env/environment';
import { Observable } from 'rxjs';
import { SuccessCode } from '../../shared/interfaces/messages.interface';
import {
  Sidebar,
  Task,
} from '../../internal/shared/interfaces/internal.interface';

export interface PostGetSidebarsResponse {
  code: SuccessCode;
  sidebarLabels: Sidebar[];
}

export interface PostGetTasksRequest {
  sidebarLabel: string;
}

export interface PostGetTasksResponse {
  code: SuccessCode;
  tasks: Task[];
}

@Injectable({
  providedIn: 'root',
})
export class InternalAPI {
  private readonly http = inject(HttpClient);

  /**
   * サイドバーを取得する
   */
  postGetSidebars = (): Observable<PostGetSidebarsResponse> => {
    return this.http.post<PostGetSidebarsResponse>(
      `${environment.API.base}/internal/getSidebars`,
      {},
    );
  };

  /**
   * サイドバーに紐づくアイテムを取得する
   * @param request
   */
  postGetTasks = (
    request: PostGetTasksRequest,
  ): Observable<PostGetTasksResponse> => {
    console.log('postgetTaskAPI');
    return this.http.post<PostGetTasksResponse>(
      `${environment.API.base}/internal/getTasks`,
      request,
    );
  };
}
