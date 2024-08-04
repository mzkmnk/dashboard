/**
 * @description
 * S001:signUp
 * S002:signIn
 * S003:add sidebar label
 * S004:get sidebar label
 * S005:add task label
 * S006:add task
 * S007:get tasks
 */
export type SuccessCode =
  | 'S001'
  | 'S002'
  | 'S003'
  | 'S004'
  | 'S005'
  | 'S006'
  | 'S007';

/**
 *@description
 *E001:
 *E002:
 *E003:
 *E004:
 *E005:
 *E006:add task error
 * E007:get tasks error
 */
export type ErrorCode =
  | 'E001'
  | 'E002'
  | 'E003'
  | 'E004'
  | 'E005'
  | 'E006'
  | 'E007';

export interface BaseSuccessResponse {
  code: SuccessCode;
}

export interface BaseErrorResponse {
  code: ErrorCode;
}
