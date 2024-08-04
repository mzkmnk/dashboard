import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../env/environment';
import {
  Sidebar,
  Task,
} from '../../internal/shared/interfaces/internal.interface';
import { SuccessCode } from '../../shared/interfaces/messages.interface';

export interface PostGetSidebarsResponse {
  code: SuccessCode;
  sidebars: Sidebar[];
}

export interface PostGetTasksRequest {
  sidebar: string;
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
