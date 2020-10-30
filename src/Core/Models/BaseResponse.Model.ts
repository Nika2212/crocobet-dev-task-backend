import { ErrorCodes } from '../Enums/ErrorCodes';

export class BaseResponse<T> {
  public IsSuccess: boolean;
  public ErrorCode: ErrorCodes;
  public Data: T;

  public static GetSuccessResponse<T>(data: T = null): BaseResponse<T> {
    const response = new BaseResponse<T>();

    response.IsSuccess = true;
    response.ErrorCode = null;
    response.Data = data;

    return response;
  }

  public static GetErrorResponse(errorCode: ErrorCodes = null): BaseResponse<null> {
    const response = new BaseResponse<null>();

    response.IsSuccess = false;
    response.ErrorCode = errorCode;
    response.Data = null;

    return response;
  }
}
